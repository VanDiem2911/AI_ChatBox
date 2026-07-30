import { classifyChatIntent } from '../lib/ai/intent-router';

async function runDomainWebExamplesTest() {
  console.log('====================================================');
  console.log('🧪 RUNNING SPECIFIC DOMAIN WEB EXAMPLES ROUTING TEST');
  console.log('====================================================\n');

  const domainQueries = [
    'Có làm web Luật không',
    'Có làm web luật sư không',
    'Có làm web bất động sản không',
    'Có web ô tô không',
    'Bên bạn có làm web du lịch không',
    'Có làm web nha khoa không',
    'Có làm web xây dựng không',
    'Có web bán hàng không',
  ];

  for (const q of domainQueries) {
    const intent = await classifyChatIntent(q);
    console.log(`Query: "${q}" -> Intent: ${intent.type}`);

    if (intent.type !== 'project_examples') {
      console.error(`❌ FAIL: Expected project_examples for "${q}", got ${intent.type}`);
      process.exit(1);
    }
  }

  console.log('🎉 ALL SPECIFIC DOMAIN WEB EXAMPLES TESTS PASSED SUCCESSFULLY!\n');
}

runDomainWebExamplesTest().catch(err => {
  console.error('Error running test:', err);
  process.exit(1);
});
