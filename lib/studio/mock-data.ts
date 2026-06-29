import { buildContractClauses, buildPaymentStages, paymentPlanPresets } from "@/lib/studio/templates";
import type { ContractDraft, ProjectRecord, SignedContractRecord } from "@/lib/studio/types";

export const studioProjects: ProjectRecord[] = [
  {
    id: "project-arrive-001",
    title: "青曦設計品牌官網改版",
    client: "青曦設計",
    summary: "重整首頁敘事、服務頁架構與詢問轉換流程，並補上合約與簽署標準化流程。",
    status: "contract_pending",
    serviceType: "品牌官網 + 合約工作流",
    totalBudget: 78000,
    nextAction: "寄送簽署連結並確認第一期款入帳",
    updatedAt: "2026-06-29 22:58",
  },
  {
    id: "project-arrive-002",
    title: "Sherlock 民宿風格 Landing Page",
    client: "Sherlock 民宿",
    summary: "以日系畫冊風格重做品牌首頁，導入表單詢問與方案介紹。",
    status: "in_progress",
    serviceType: "Landing Page",
    totalBudget: 52000,
    nextAction: "確認案例照片與 CTA 文案定稿",
    updatedAt: "2026-06-28 23:12",
  },
  {
    id: "project-arrive-003",
    title: "築時數位內部工作面板",
    client: "築時數位",
    summary: "建立私有工作面板、合約模板與客戶手機簽署頁。",
    status: "proposal_sent",
    serviceType: "內部工作流系統",
    totalBudget: 108000,
    nextAction: "完成 MVP 結構與簽署資料流驗證",
    updatedAt: "2026-06-29 23:16",
  },
];

const studioProfile = {
  name: "築時數位",
  companyName: "築時數位工作室",
  email: "hello.arrivestudio@gmail.com",
  phone: "0900-000-000",
  address: "台北市中山區（簽約時填入正式地址）",
  contactPerson: "築時數位",
};

const qingxiProfile = {
  name: "青曦設計",
  companyName: "青曦設計有限公司",
  email: "contact@qingxi.design",
  phone: "02-0000-1234",
  address: "新北市板橋區（正式簽約時填入）",
  contactPerson: "林小姐",
};

export const studioContracts: ContractDraft[] = [
  {
    id: "contract-arrive-001",
    projectId: "project-arrive-001",
    projectTitle: "青曦設計品牌官網改版",
    title: "築時數位網站設計與開發委託合約",
    totalAmount: 78000,
    paymentPlanLabel: "3-4-3 分期付款",
    freeRevisionRounds: 2,
    extraRevisionFee: "每次新台幣 3,000 元或每小時 1,800 元",
    finalReviewDays: 5,
    ghostingDays: 14,
    warrantyDays: 30,
    jurisdiction: "台北地方法院",
    client: qingxiProfile,
    studio: studioProfile,
    paymentStages: buildPaymentStages(78000, paymentPlanPresets["3-4-3"]),
    clauses: buildContractClauses({
      projectTitle: "青曦設計品牌官網改版",
      totalAmount: 78000,
      paymentPlanLabel: "3-4-3 分期付款",
      freeRevisionRounds: 2,
      extraRevisionFee: "每次新台幣 3,000 元或每小時 1,800 元",
      finalReviewDays: 5,
      ghostingDays: 14,
      warrantyDays: 30,
      jurisdiction: "台北地方法院",
    }),
    notes: [
      "附件一：專案需求規格書與報價單",
      "附件二：首頁內容架構與交付時程",
      "附件三：品牌素材交接清單",
    ],
    updatedAt: "2026-06-29 22:58",
  },
  {
    id: "contract-arrive-002",
    projectId: "project-arrive-003",
    projectTitle: "築時數位內部工作面板",
    title: "築時數位內部系統開發委託合約",
    totalAmount: 108000,
    paymentPlanLabel: "4-4-2 分期付款",
    freeRevisionRounds: 2,
    extraRevisionFee: "每次新台幣 4,500 元或每小時 2,000 元",
    finalReviewDays: 7,
    ghostingDays: 14,
    warrantyDays: 45,
    jurisdiction: "新北地方法院",
    client: studioProfile,
    studio: studioProfile,
    paymentStages: buildPaymentStages(108000, paymentPlanPresets["4-4-2"]),
    clauses: buildContractClauses({
      projectTitle: "築時數位內部工作面板",
      totalAmount: 108000,
      paymentPlanLabel: "4-4-2 分期付款",
      freeRevisionRounds: 2,
      extraRevisionFee: "每次新台幣 4,500 元或每小時 2,000 元",
      finalReviewDays: 7,
      ghostingDays: 14,
      warrantyDays: 45,
      jurisdiction: "新北地方法院",
    }),
    notes: [
      "包含工作面板、合約模板、簽署頁與已簽留存 MVP",
      "後續若接入資料庫與登入系統，將以追加需求另行估價",
    ],
    updatedAt: "2026-06-29 23:16",
  },
];

export const sampleSignedRecords: SignedContractRecord[] = [
  {
    id: "record-arrive-001",
    contractId: "contract-arrive-001",
    sourceToken: "sampletoken001",
    projectTitle: "青曦設計品牌官網改版",
    contractTitle: "築時數位網站設計與開發委託合約",
    clientName: "青曦設計",
    signerName: "林小姐",
    signerEmail: "contact@qingxi.design",
    signerPhone: "0912-222-333",
    signerRole: "專案窗口",
    signatureDataUrl:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='120'><rect width='100%' height='100%' fill='white'/><path d='M20 70 C60 20, 100 110, 150 60 S250 90, 290 40' stroke='%235c4a3f' fill='none' stroke-width='4' stroke-linecap='round'/></svg>",
    signedAt: "2026-06-27T08:40:00.000Z",
    ip: "203.0.113.20",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)",
    documentHash: "sample-hash-arrive-001",
    payload: {
      source: "arrive-studio-workbench",
      draft: studioContracts[0],
      sharedAt: "2026-06-27T07:55:00.000Z",
    },
  },
];

export function findContractDraft(contractId: string) {
  return studioContracts.find((contract) => contract.id === contractId);
}

export function findProjectRecord(projectId: string) {
  return studioProjects.find((project) => project.id === projectId);
}
