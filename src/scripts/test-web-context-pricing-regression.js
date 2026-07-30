const fs = require('fs');
const vm = require('vm');
const ts = require('typescript');

function loadTsModule(filePath) {
  const source = fs.readFileSync(filePath, 'utf8');
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
  vm.runInNewContext(transpiled, sandbox, { filename: filePath });
  return sandbox.module.exports;
}

const { getServiceConsultationResponse } = loadTsModule('src/lib/ai/company-responses.ts');
const { isPricingOrMoneyInquiry } = loadTsModule('src/lib/ai/pricing-policy.ts');

const mobileAppAssistantText =
  'Day la nhom mobile app iOS/Android. Anh chi muon lam app cho ban hang, booking hay quan ly noi bo?';

const realEstateChoice =
  'Website gioi thieu du an / Thuong hieu Chu dau tu nhu An Gia Masterise Homes Gamuda Land. Cai nay ne';

async function runChecks() {
  const webResponse = await getServiceConsultationResponse('The tu van web di', '', [
    { role: 'ASSISTANT', content: mobileAppAssistantText },
  ]);

  const checks = [
    {
      name: 'explicit web request after app context stays on website',
      ok: /website|web/i.test(webResponse) && !/Mobile App|ve Mobile App|app phuc vu/i.test(webResponse),
    },
    {
      name: 'An Gia project choice is not treated as pricing',
      ok: !isPricingOrMoneyInquiry(realEstateChoice),
    },
    {
      name: 'user rejecting pricing interpretation is not treated as pricing',
      ok: !isPricingOrMoneyInquiry('t noi cai nay chu co bao la gia dau ma bao gia'),
    },
    {
      name: 'actual pricing question is still detected',
      ok: isPricingOrMoneyInquiry('Gia web ban hang bao nhieu tien?'),
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
