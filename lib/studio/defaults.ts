import { randomUUID } from "node:crypto";
import { buildContractClauses, buildPaymentStages, paymentPlanPresets } from "@/lib/studio/templates";
import type { ClientProfile, ContractDraft } from "@/lib/studio/types";

export const defaultStudioProfile: ClientProfile = {
  name: "築時數位",
  companyName: "築時數位工作室",
  email: "hello.arrivestudio@gmail.com",
  phone: "0900-000-000",
  address: "台北市中山區（簽約時填入正式地址）",
  contactPerson: "築時數位",
};

export const defaultContractNotes = [
  "附件一：專案需求規格書與報價單",
  "附件二：首頁內容架構與交付時程",
  "附件三：品牌素材交接清單",
];

export function createBlankContractDraft(): ContractDraft {
  const totalAmount = 36000;
  const paymentPlanLabel = "3-4-3 分期付款";
  const paymentStages = buildPaymentStages(totalAmount, paymentPlanPresets["3-4-3"]);

  return {
    id: `contract-${randomUUID().replace(/-/g, "").slice(0, 12)}`,
    projectId: `project-${randomUUID().replace(/-/g, "").slice(0, 12)}`,
    projectTitle: "待命名專案",
    title: "築時數位網站設計與開發委託合約",
    totalAmount,
    paymentPlanLabel,
    freeRevisionRounds: 2,
    extraRevisionFee: "每次新台幣 3,000 元或每小時 1,800 元",
    finalReviewDays: 5,
    ghostingDays: 14,
    warrantyDays: 30,
    jurisdiction: "台北地方法院",
    client: {
      name: "待填寫客戶名稱",
      companyName: "待填寫客戶公司",
      email: "client@example.com",
      phone: "09xx-xxx-xxx",
      address: "待填寫客戶地址",
      contactPerson: "待填寫聯絡窗口",
    },
    studio: defaultStudioProfile,
    paymentStages,
    clauses: buildContractClauses({
      projectTitle: "待命名專案",
      totalAmount,
      paymentPlanLabel,
      freeRevisionRounds: 2,
      extraRevisionFee: "每次新台幣 3,000 元或每小時 1,800 元",
      finalReviewDays: 5,
      ghostingDays: 14,
      warrantyDays: 30,
      jurisdiction: "台北地方法院",
    }),
    notes: defaultContractNotes,
    updatedAt: new Date().toISOString(),
  };
}
