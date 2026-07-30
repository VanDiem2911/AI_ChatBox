import {
  getCompanyIntroResponse,
  getIdentityResponse,
  getServiceConsultationResponse,
  getServiceOverviewResponse,
} from '../lib/ai/company-responses';
import { getBusinessDomainsResponse } from '../lib/ai/business-domains';
import { classifyChatIntent } from '../lib/ai/intent-router';

function normalizeText(input: string): string {
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

function assertResponse(name: string, condition: boolean, details?: string) {
  if (!condition) {
    throw new Error(`${name} failed${details ? `: ${details}` : ''}`);
  }

  console.log(`PASS ${name}`);
}

const salesContext = [
  'Nhu cau: website ban hang/e-commerce',
  'Chi tiet: ban san pham thoi trang/quan ao, mo hinh cua hang ban le',
].join('\n');

async function main() {
  const identityIntent = await classifyChatIntent('Ban la ai', { memorySummary: salesContext });
  const casualIdentityIntent = await classifyChatIntent('gioi thieu di m la ai', { memorySummary: salesContext });
  const briefIntroIntent = await classifyChatIntent('Gioi thieu di', { memorySummary: salesContext });
  const projectIntroIntent = await classifyChatIntent('Gioi thieu du an bat dong san');
  const identityResponse = normalizeText(getIdentityResponse());

  assertResponse(
    'identity question is not misrouted to ecommerce',
    identityIntent.type === 'identity' &&
      casualIdentityIntent.type === 'identity' &&
      briefIntroIntent.type === 'identity' &&
      projectIntroIntent.type === 'project_examples' &&
      identityResponse.includes('tro ly ai tu van khach hang') &&
      !identityResponse.includes('nhom nay la website ban hang')
  );

  const dudiOfferingIntent = await classifyChatIntent('The DUDI co gi', { memorySummary: salesContext });
  const dudiIntroIntent = await classifyChatIntent('Gioi thieu ve DUDI di', { memorySummary: salesContext });
  const companyIntroResponse = normalizeText(getCompanyIntroResponse());

  assertResponse(
    'DUDI introduction is not misrouted to project examples',
    dudiOfferingIntent.type === 'company_intro' &&
      dudiIntroIntent.type === 'company_intro' &&
      companyIntroResponse.includes('cong ty phat trien phan mem') &&
      companyIntroResponse.includes('website ban hang') &&
      !companyIntroResponse.includes('du an v organic'),
    companyIntroResponse
  );

  const overview = normalizeText(getServiceOverviewResponse());
  assertResponse(
    'service overview sounds less mechanical',
    overview.includes('thuong tu van theo 7 nhom chinh') &&
      overview.includes('chi can nhan ngan') &&
      !overview.includes('vui long chon mot nhom')
  );

  const domains = normalizeText(getBusinessDomainsResponse());
  assertResponse(
    'business domains ends with a natural next step',
    domains.includes('cu nhan ten nganh') &&
      !domains.includes('em co the gui dung nhom do de tham khao')
  );

  const broadEcommerce = normalizeText(
    await getServiceConsultationResponse('Website ban hang/e-commerce, dat hang va thanh toan online.')
  );
  assertResponse(
    'broad ecommerce response is concise',
    broadEcommerce.includes('nhom nay la website ban hang') &&
      !broadEcommerce.includes('da nhu cau nay thuoc nhom')
  );

  const promoResponse = normalizeText(await getServiceConsultationResponse('khuyen mai', salesContext));
  assertResponse(
    'module follow-up keeps known product and model',
    promoResponse.includes('thoi trang/quan ao') &&
      promoResponse.includes('cua hang ban le') &&
      promoResponse.includes('ma giam gia') &&
      !promoResponse.includes('san pham minh ban la gi'),
    promoResponse
  );

  const operationsResponse = normalizeText(
    await getServiceConsultationResponse('quan tri don hang, van chuyen, khuyen mai', salesContext)
  );
  assertResponse(
    'multi-module follow-up stays on selected modules',
    operationsResponse.includes('quan tri don hang') &&
      operationsResponse.includes('van chuyen') &&
      operationsResponse.includes('khuyen mai') &&
      !operationsResponse.includes('san pham minh ban la gi'),
    operationsResponse
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
