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
    if (request === './embeddings') {
      return { generateEmbedding: async () => [] };
    }

    if (request.startsWith('.')) {
      const resolved = path.resolve(path.dirname(absolutePath), `${request}.ts`);
      return loadTsModule(resolved);
    }

    return require(request);
  };

  vm.runInNewContext(
    outputText,
    {
      exports: module.exports,
      module,
      require: localRequire,
      console,
      process,
      setTimeout,
    },
    { filename: absolutePath }
  );

  return module.exports;
}

const {
  getCompanyIntroResponse,
  getContactInfoResponse,
  getIdentityResponse,
  getProjectInspiredConsultationResponse,
  getServiceConsultationResponse,
  getServiceOverviewResponse,
} = loadTsModule('src/lib/ai/company-responses.ts');
const { getBusinessDomainsResponse } = loadTsModule('src/lib/ai/business-domains.ts');
const { classifyChatIntent } = loadTsModule('src/lib/ai/intent-router.ts');
const {
  getPhoneReceivedHandoffResponse,
  getPricingHandoffResponse,
  getPricingHandoffSummary,
} = loadTsModule('src/lib/ai/pricing-policy.ts');
const { buildConversationMemorySummary } = loadTsModule('src/lib/ai/conversation-memory.ts');

const scenario = [
  {
    user: 'Ban la ai?',
    expectType: 'identity',
    checkpoint: 'Mo dau: bot tu gioi thieu dung vai tro DU.',
  },
  {
    user: 'Ben ban co nhung dich vu gi?',
    expectType: 'service_overview',
    checkpoint: 'Gioi thieu nhom dich vu tong quan.',
  },
  {
    user: 'Toi can tu van mot website ban hang thoi trang.',
    expectType: 'service_consultation',
    checkpoint: 'Di vao nhanh website ban hang/e-commerce.',
  },
  {
    user: 'Website nay can nhung phan chinh nao?',
    expectType: 'service_consultation',
    checkpoint: 'Hoi module tong the cua website.',
  },
  {
    user: 'San pham co danh muc, tim kiem va loc size mau khong?',
    expectType: 'service_consultation',
    checkpoint: 'Danh muc san pham, tim kiem, bo loc.',
  },
  {
    user: 'Toi can gio hang va dat hang nhanh.',
    expectType: 'service_consultation',
    checkpoint: 'Gio hang va dat hang.',
  },
  {
    user: 'Co tich hop thanh toan online va COD duoc khong?',
    expectType: 'service_consultation',
    checkpoint: 'Thanh toan online la tinh nang, khong bi hieu nham la bao gia.',
  },
  {
    user: 'Phan quan tri don hang thi can nhung gi?',
    expectType: 'service_consultation',
    checkpoint: 'Quan tri don hang.',
  },
  {
    user: 'Van chuyen va ma van don co ket noi duoc khong?',
    expectType: 'service_consultation',
    checkpoint: 'Van chuyen, tracking.',
  },
  {
    user: 'Toi muon co khuyen mai, voucher va freeship.',
    expectType: 'service_consultation',
    checkpoint: 'Khuyen mai/voucher.',
  },
  {
    user: 'Website co can SEO va toi uu toc do tai trang khong?',
    expectType: 'service_consultation',
    checkpoint: 'SEO va hieu nang.',
  },
  {
    user: 'Ben toi co nhieu chi nhanh va kho hang.',
    expectType: 'service_consultation',
    checkpoint: 'Mo hinh nhieu chi nhanh/kho.',
  },
  {
    user: 'Co ban hang da kenh Facebook Zalo Shopee duoc khong?',
    expectType: 'service_consultation',
    checkpoint: 'Ban hang da kenh.',
  },
  {
    user: 'Phan quan tri co phan quyen nhan vien khong?',
    expectType: 'service_consultation',
    checkpoint: 'Quan tri va phan quyen.',
    expectResponseIncludes: ['phan quyen', 'vai tro'],
  },
  {
    user: 'Can co bao cao doanh thu va don hang theo ngay.',
    expectType: 'service_consultation',
    checkpoint: 'Bao cao van hanh.',
    expectResponseIncludes: ['bao cao', 'doanh thu', 'theo ngay'],
  },
  {
    user: 'Giao dien UI UX co responsive mobile khong?',
    expectType: 'service_consultation',
    checkpoint: 'UI/UX va responsive.',
    expectResponseIncludes: ['responsive', 'mobile'],
  },
  {
    user: 'Sau khi lam xong co bao tri bao hanh khong?',
    expectType: 'service_consultation',
    checkpoint: 'Bao tri/bao hanh.',
  },
  {
    user: 'Quy trinh trien khai website nhu vay gom may buoc?',
    expectType: 'service_consultation',
    checkpoint: 'Quy trinh trien khai.',
  },
  {
    user: 'Voi nhu cau tren thi chi phi khoang bao nhieu, nho nhan vien bao gia truc tiep giup toi.',
    expectType: 'pricing_handoff',
    checkpoint: 'Ket thuc tu van AI, chuyen sang xin thong tin de nhan vien bao gia.',
  },
  {
    user: 'So dien thoai cua toi la 0909123456.',
    expectType: 'pricing_phone_received',
    checkpoint: 'Nhan so dien thoai va xac nhan nhan vien se lien he.',
  },
];

function normalizeText(input) {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/Ä‘/g, 'd')
    .replace(/Ä/g, 'D')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function trimForConsole(input, maxLength = 260) {
  const compact = input.replace(/\s+/g, ' ').trim();
  return compact.length > maxLength ? `${compact.slice(0, maxLength - 3)}...` : compact;
}

function getRecentMessages(history, limit = 10) {
  return history.slice(-limit).map((item) => ({
    role: item.role,
    content: item.content,
  }));
}

async function buildAssistantResponse(intent, userMessage, state) {
  switch (intent.type) {
    case 'identity':
      return getIdentityResponse();
    case 'company_intro':
      return getCompanyIntroResponse();
    case 'business_domains':
      return getBusinessDomainsResponse();
    case 'contact_info':
      return getContactInfoResponse();
    case 'service_overview':
      return getServiceOverviewResponse();
    case 'service_consultation':
      return getServiceConsultationResponse(userMessage, state.memorySummary, getRecentMessages(state.history), []);
    case 'project_inspired_consultation':
      return getProjectInspiredConsultationResponse(userMessage);
    case 'pricing_handoff':
      return getPricingHandoffResponse();
    case 'pricing_phone_received':
      return getPhoneReceivedHandoffResponse(intent.phone || userMessage);
    case 'project_examples':
      return 'PROJECT_EXAMPLES: Route API se lay du an tu knowledge base/RAG. Scenario offline nay khong goi MongoDB.';
    case 'rag_answer':
    default:
      return 'RAG_ANSWER: Cau hoi roi vao fallback RAG/model. Scenario offline khong goi LLM.';
  }
}

function assertTurn(turn, step, actualType, response) {
  const checks = [];
  const normalizedResponse = normalizeText(response);

  checks.push({
    name: `Turn ${turn}: expected intent ${step.expectType}`,
    ok: actualType === step.expectType,
    details: `got ${actualType}`,
  });
  checks.push({
    name: `Turn ${turn}: assistant response is not empty`,
    ok: typeof response === 'string' && response.trim().length > 0,
  });
  checks.push({
    name: `Turn ${turn}: did not fall back to rag_answer`,
    ok: actualType !== 'rag_answer',
  });

  if (turn >= 4 && turn <= 18) {
    const driftedToWrongProductLine =
      normalizedResponse.includes('day la nhom mobile app') ||
      normalizedResponse.includes('day la nhom phan mem quan ly doanh nghiep') ||
      normalizedResponse.includes('day la phan he quan ly ban hang crm') ||
      normalizedResponse.includes('day la phan he quan ly kho hang');

    checks.push({
      name: `Turn ${turn}: response stays in website/e-commerce consultation context`,
      ok: !driftedToWrongProductLine,
    });
  }

  if (step.expectResponseIncludes) {
    for (const phrase of step.expectResponseIncludes) {
      checks.push({
        name: `Turn ${turn}: response mentions "${phrase}"`,
        ok: normalizedResponse.includes(phrase),
      });
    }
  }

  return checks;
}

function assertConversation(state, turns) {
  const intentTypes = turns.map((turn) => turn.intent.type);
  const lastTurn = turns[turns.length - 1];
  const normalizedLastResponse = normalizeText(lastTurn.assistant);

  return [
    {
      name: 'Scenario has exactly 20 customer turns',
      ok: turns.length === 20,
      details: `got ${turns.length}`,
    },
    {
      name: 'Conversation covers at least 12 website consultation turns',
      ok: intentTypes.filter((type) => type === 'service_consultation').length >= 12,
    },
    {
      name: 'Pricing handoff happens before phone capture',
      ok:
        intentTypes[18] === 'pricing_handoff' &&
        intentTypes[19] === 'pricing_phone_received',
      details: `turn19=${intentTypes[18]}, turn20=${intentTypes[19]}`,
    },
    {
      name: 'Final state waits for agent after receiving phone',
      ok: state.status === 'WAITING_FOR_AGENT',
      details: `status=${state.status}`,
    },
    {
      name: 'Final response confirms staff will contact customer',
      ok:
        normalizedLastResponse.includes('nhan vien') &&
        (normalizedLastResponse.includes('lien he') || normalizedLastResponse.includes('bao gia')),
    },
  ];
}

function writeTranscript(turns, state, outputPath) {
  const lines = [
    '# Website Consultation Conversation Test',
    '',
    `- Total turns: ${turns.length}`,
    `- Final status: ${state.status}`,
    `- Final summary: ${state.summary || '(none)'}`,
    '',
  ];

  for (const turn of turns) {
    lines.push(`## Turn ${turn.index}: ${turn.checkpoint}`);
    lines.push('');
    lines.push(`Intent: \`${turn.intent.type}\``);
    lines.push('');
    lines.push(`USER: ${turn.user}`);
    lines.push('');
    lines.push('DU:');
    lines.push('');
    lines.push(turn.assistant);
    lines.push('');
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, lines.join('\n'), 'utf8');
}

async function main() {
  const state = {
    status: 'AI_ACTIVE',
    title: 'Website consultation test',
    summary: '',
    memorySummary: '',
    history: [],
  };
  const turns = [];
  const checks = [];

  console.log('\nWEBSITE CONSULTATION CONVERSATION TEST');
  console.log('======================================\n');

  for (let i = 0; i < scenario.length; i++) {
    const step = scenario[i];
    const intent = await classifyChatIntent(
      step.user,
      {
        status: state.status,
        title: state.title,
        summary: state.summary,
        memorySummary: state.memorySummary,
        recentMessages: getRecentMessages(state.history),
      },
      []
    );

    const assistant = await buildAssistantResponse(intent, step.user, state);

    state.memorySummary = buildConversationMemorySummary({
      currentSummary: state.memorySummary,
      userMessage: step.user,
      intentType: intent.type,
    });

    if (intent.type === 'pricing_handoff') {
      state.status = 'WAITING_FOR_AGENT';
      state.title = 'Yeu cau bao gia';
      state.summary = getPricingHandoffSummary(step.user);
    }

    state.history.push({ role: 'USER', content: step.user });
    state.history.push({ role: 'ASSISTANT', content: assistant });

    const turn = {
      index: i + 1,
      user: step.user,
      assistant,
      intent,
      checkpoint: step.checkpoint,
    };
    turns.push(turn);
    checks.push(...assertTurn(turn.index, step, intent.type, assistant));

    console.log(`Turn ${turn.index.toString().padStart(2, '0')} | ${step.checkpoint}`);
    console.log(`USER: ${step.user}`);
    console.log(`INTENT: ${intent.type}`);
    console.log(`DU: ${trimForConsole(assistant)}`);
    console.log('');
  }

  checks.push(...assertConversation(state, turns));

  let failed = 0;
  console.log('CHECKS');
  console.log('------');
  for (const check of checks) {
    if (check.ok) {
      console.log(`PASS ${check.name}`);
    } else {
      failed++;
      console.error(`FAIL ${check.name}${check.details ? ` (${check.details})` : ''}`);
    }
  }

  const outputPath = path.resolve('tmp/website-consultation-conversation-transcript.md');
  writeTranscript(turns, state, outputPath);
  console.log(`\nTranscript written to: ${outputPath}`);

  if (failed > 0) {
    console.error(`\n${failed} check(s) failed.`);
    process.exit(1);
  }

  console.log('\nAll conversation checks passed.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
