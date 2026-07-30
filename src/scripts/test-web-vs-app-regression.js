const fs = require('fs');
const vm = require('vm');
const ts = require('typescript');

const source = fs.readFileSync('src/lib/ai/company-responses.ts', 'utf8');
const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
    esModuleInterop: true,
  },
}).outputText;

const sandbox = {
  exports: {},
  module: { exports: {} },
  require: (request) => {
    if (request === './embeddings') {
      return { generateEmbedding: async () => [] };
    }
    return require(request);
  },
  console,
  process,
};
sandbox.exports = sandbox.module.exports;
vm.runInNewContext(transpiled, sandbox, { filename: 'company-responses.ts' });

const { getServiceConsultationResponse } = sandbox.module.exports;

const overviewText =
  'Duoc a. DUDI Software thuong tu van theo 7 nhom chinh:\n' +
  '1. Website doanh nghiep, landing page, website gioi thieu thuong hieu.\n' +
  '2. Website ban hang/e-commerce, dat hang va thanh toan online.\n' +
  '3. Mobile app iOS/Android.';

async function runChecks() {
  const webSelectionResponse = await getServiceConsultationResponse(
    'Website Ban hang / E-commerce: web nhu the nay nay',
    '',
    [{ role: 'ASSISTANT', content: overviewText }]
  );

  const correctionResponse = await getServiceConsultationResponse(
    'Da bao web ma sao ra app',
    'Nhu cau: website ban hang/e-commerce'
  );

  const checks = [
    {
      name: 'current-message explicit web guard exists before app branch',
      ok:
        source.includes('const hasExplicitWeb') &&
        source.indexOf('isCorrectingBackToWeb') < source.indexOf('if (hasApp)'),
    },
    {
      name: 'overview mobile item is not treated as mobile branch context',
      ok:
        source.includes('lastAssistantIsMobileBranch') &&
        source.includes('7\\s*nhom\\s*chinh') &&
        source.includes('tu\\s*van\\s*theo\\s*7\\s*nhom'),
    },
    {
      name: 'service response stays on website ecommerce after overview',
      ok:
        /website ban hang|website b.n h.ng/i.test(webSelectionResponse) &&
        !/mobile app|app ban hang|app b.n h.ng/i.test(webSelectionResponse),
    },
    {
      name: 'web correction response says website is not app',
      ok: /khong phai app|kh.ng ph.i app/i.test(correctionResponse) && /website/i.test(correctionResponse),
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

runChecks().catch((err) => {
  console.error(err);
  process.exit(1);
});
