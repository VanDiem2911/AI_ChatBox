const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ts = require('typescript');

const moduleCache = new Map();

function loadTsModule(filePath) {
  const absolutePath = path.resolve(filePath);
  if (moduleCache.has(absolutePath)) {
    return moduleCache.get(absolutePath).exports;
  }

  const source = fs.readFileSync(absolutePath, 'utf8');
  const outputText = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  }).outputText;

  const module = { exports: {} };
  moduleCache.set(absolutePath, module);

  const localRequire = (request) => {
    if (request.startsWith('.')) {
      const resolved = path.resolve(path.dirname(absolutePath), `${request}.ts`);
      return loadTsModule(resolved);
    }
    return require(request);
  };

  vm.runInNewContext(outputText, {
    exports: module.exports,
    module,
    require: localRequire,
    console,
    process,
  }, { filename: absolutePath });

  return module.exports;
}

const { classifyChatIntent } = loadTsModule('src/lib/ai/intent-router.ts');
const { DUDI_KNOWLEDGE_DOCUMENTS } = loadTsModule('src/data/dudi-knowledge.ts');
const { extractProjectsFromKnowledge } = loadTsModule('src/lib/ai/project-parser.ts');
const routeSource = fs.readFileSync('src/app/api/chat/conversations/[id]/messages/route.ts', 'utf8');

const corporateContext = {
  recentMessages: [
    {
      role: 'ASSISTANT',
      content:
        'Day la nhom Website Doanh Nghiep / Gioi thieu thuong hieu. Anh chi muon lam website gioi thieu cong ty hay nang cap trang web hien tai?',
    },
  ],
};

const realEstateProjectContext = {
  recentMessages: [
    {
      role: 'ASSISTANT',
      content:
        'Co a. Day la mot so du an website bat dong san phu hop de anh chi tham khao: Du an Saigon BD Website Website: https://saigonbd.vn/',
    },
  ],
};

async function runChecks() {
  const projectChunks = DUDI_KNOWLEDGE_DOCUMENTS.map((doc) => ({
    content: doc.content,
    category: doc.category,
  }));
  const aestheticProjects = extractProjectsFromKnowledge(projectChunks, 'Xem qua mot so mau web phong kham tham my', 5);
  const loyaltyProjects = extractProjectsFromKnowledge(projectChunks, 'Co mau app loyalty tich diem nao tham khao khong', 5);
  const missingDomainProjects = extractProjectsFromKnowledge(projectChunks, 'Cho xem mau website blockchain gamefi staking nft', 5);

  const checks = [
    {
      name: 'web mau is classified as project examples, not service consultation',
      ok: (await classifyChatIntent('web mau', corporateContext)).type === 'project_examples',
    },
    {
      name: 'correction back to corporate website examples is project examples',
      ok: (await classifyChatIntent('cua web doanh nghiep ma', corporateContext)).type === 'project_examples',
    },
    {
      name: 'plain Website doanh nghiep remains service consultation',
      ok: (await classifyChatIntent('Website doanh nghiep')).type === 'service_consultation',
    },
    {
      name: 'asking for other samples remains project examples',
      ok: (await classifyChatIntent('mau khac co khong', realEstateProjectContext)).type === 'project_examples',
    },
    {
      name: 'complaining repeated samples remains project examples',
      ok: (await classifyChatIntent('co khac gi voi cai o tren dau', realEstateProjectContext)).type === 'project_examples',
    },
    {
      name: 'route uses recent project scope before mixed memory',
      ok: routeSource.includes('const recentProjectScope') && routeSource.includes('directProjectScope || recentProjectScope || memoryProjectScope'),
    },
    {
      name: 'route refuses ambiguous mixed memory project scope',
      ok: routeSource.includes("serviceContext.split(',').length <= 1") && routeSource.includes("intent.type === 'project_examples' && !projectTopicLabel"),
    },
    {
      name: 'route fetches more project candidates for follow-up alternatives',
      ok: routeSource.includes("topK: intent.type === 'project_examples' ? 10 : 5") && routeSource.includes('extractProjectsFromKnowledge(relevantChunks, searchQuery, 15)'),
    },
    {
      name: 'route does not loop back to already shown projects when exhausted',
      ok:
        routeSource.includes('getNoMoreProjectExamplesResponse(projectTopicLabel)') &&
        !routeSource.includes('remainingProjects = projectsList;'),
    },
    {
      name: 'route filters shown projects by both title and url',
      ok: routeSource.includes('normalizeProjectKey(proj.title)') && routeSource.includes('normalizeProjectKey(proj.url)'),
    },
    {
      name: 'aesthetic clinic examples are real beauty/aesthetic projects, not generic lifestyle/blog samples',
      ok:
        aestheticProjects.length > 0 &&
        aestheticProjects.some((project) => /spa|tham my|emcas|viet my/i.test(project.title)) &&
        !aestheticProjects.some((project) => /blog|everygirl|phong thai doanh nhan/i.test(project.title)),
    },
    {
      name: 'loyalty examples prefer projects with actual membership/rewards signals',
      ok:
        loyaltyProjects.length > 0 &&
        loyaltyProjects.some((project) => /lg|hotel/i.test(project.title)) &&
        !loyaltyProjects.some((project) => /pwc/i.test(project.title)),
    },
    {
      name: 'missing project domain returns no projects instead of unrelated examples',
      ok: missingDomainProjects.length === 0,
    },
    {
      name: 'route stops project-example misses with an explicit no-data response',
      ok:
        routeSource.includes('getNoProjectDataResponse(projectTopicLabel)') &&
        routeSource.includes("model: 'project-examples-no-data'"),
    },
  ];

  let failed = 0;
  for (const check of checks) {
    if (check.ok) {
      console.log(`PASS ${check.name}`);
    } else {
      failed++;
      console.error(`FAIL ${check.name}`);
    }
  }

  if (failed > 0) {
    process.exit(1);
  }
}

runChecks().catch(err => {
  console.error(err);
  process.exit(1);
});
