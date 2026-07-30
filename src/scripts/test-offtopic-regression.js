const fs = require('fs');
const vm = require('vm');
const ts = require('typescript');

const source = fs.readFileSync('src/lib/ai/off-topic.ts', 'utf8');
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
  require,
  console,
};
sandbox.exports = sandbox.module.exports;
vm.runInNewContext(transpiled, sandbox, { filename: 'off-topic.ts' });

const { getOffTopicResponse, isOffTopicInquiry } = sandbox.module.exports;

const drinkingResponse = getOffTopicResponse('Nh\u1eadu ko');
const violenceResponse = getOffTopicResponse('\u0111\u00e1nh l\u1ed9n');
const profanityResponse = getOffTopicResponse('dm');

const checks = [
  {
    name: 'short drinking invite is off-topic',
    ok: isOffTopicInquiry('Nhau ko'),
  },
  {
    name: 'drinking invite with Vietnamese accents is off-topic',
    ok: isOffTopicInquiry('Th\u1ebf c\u00f3 \u0111i nh\u1eadu ko'),
  },
  {
    name: 'violence typo invite is off-topic',
    ok: isOffTopicInquiry('\u0111\u1ea5m nh\u00e2u kh\u00f4ng'),
  },
  {
    name: 'violence invite is off-topic',
    ok: isOffTopicInquiry('\u0111\u1ea5m nhau'),
  },
  {
    name: 'fighting slang is off-topic',
    ok: isOffTopicInquiry('\u0111\u00e1nh l\u1ed9n'),
  },
  {
    name: 'short profanity is off-topic',
    ok: isOffTopicInquiry('dm'),
  },
  {
    name: 'restaurant website request is not off-topic',
    ok: !isOffTopicInquiry('T\u01b0 v\u1ea5n website qu\u00e1n nh\u1eadu'),
  },
  {
    name: 'off-topic drinking response does not mention restaurant portfolio',
    ok:
      /kh\u00f4ng \u0111i nh\u1eadu \u0111\u01b0\u1ee3c|khong di nhau duoc/i.test(drinkingResponse) &&
      !/Qu\u00e1n Nh\u1eadu T\u1ef1 Do|quannhautudo|website b\u00e1n h\u00e0ng|e-commerce/i.test(drinkingResponse),
  },
  {
    name: 'violence response is not mistaken for drinking or portfolio',
    ok:
      /kh\u00f4ng th\u1ec3 tham gia|khong the tham gia/i.test(violenceResponse) &&
      !/nh\u1eadu|portfolio|website doanh nghi\u1ec7p/i.test(violenceResponse),
  },
  {
    name: 'profanity response asks to keep conversation polite',
    ok: /l\u1ecbch s\u1ef1|lich su/i.test(profanityResponse),
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
