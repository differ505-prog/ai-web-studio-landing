import type { ContractClause, ContractDraft, PaymentStage } from "@/lib/studio/types";

type DraftVariables = {
  projectTitle: string;
  totalAmountLabel: string;
  paymentPlanLabel: string;
  freeRevisionRounds: number;
  extraRevisionFee: string;
  finalReviewDays: number;
  ghostingDays: number;
  warrantyDays: number;
  jurisdiction: string;
};

function interpolate(template: string, variables: DraftVariables) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: keyof DraftVariables) => String(variables[key]));
}

const clauseTemplates = [
  {
    id: "scope",
    title: "第一條：專案範圍與內容",
    content:
      "本專案「{{projectTitle}}」之服務範圍，應以雙方確認之需求文件、報價內容與附件為準。任何超出既有需求之新增功能、流程變更、版面重構或第三方串接調整，均視為需求變更，乙方得另行評估工時並提出追加報價。",
  },
  {
    id: "revision",
    title: "第二條：修改機制與計費",
    content:
      "本合約所稱修改，僅限於原需求範圍內之文字、圖片、色彩與排版微調。乙方於各審查階段提供共計 {{freeRevisionRounds}} 次免費修改額度，甲方應一次彙整意見提出。若甲方提出超次修改或需求擴張，乙方得依 {{extraRevisionFee}} 之標準計費，並於甲方書面同意後始進行。",
  },
  {
    id: "payment",
    title: "第三條：專案費用與付款方式",
    content:
      "本專案總價為 {{totalAmountLabel}}，付款機制採 {{paymentPlanLabel}}。甲方若未於約定期限內支付任一期款項，乙方有權暫停下一階段工作且不負遲延責任；交期將按實際停工日數自動順延。",
  },
  {
    id: "acceptance",
    title: "第四條：驗收機制",
    content:
      "乙方交付測試版或最終完成品後，甲方應於 {{finalReviewDays}} 個工作日內完成測試與回覆。若甲方於期限內未提出書面異議，或已將交付物公開上線、商業使用，即視同驗收通過，應立即依約結清尾款。",
  },
  {
    id: "warranty",
    title: "第五條：保固與除錯責任",
    content:
      "自驗收通過或正式上線日起算 {{warrantyDays}} 日內，若發生與原規格不符或程式無法正常運作之錯誤，乙方應免費修復。因甲方或第三方自行修改程式、伺服器環境變動、第三方 API 政策異動所致之問題，不在免費保固範圍內。",
  },
  {
    id: "ip",
    title: "第六條：智慧財產權與所有權",
    content:
      "在甲方付清本合約全部款項前，包含訂金、各期款、尾款與追加費用在內，本專案之設計稿、原始碼、資料結構與其他產出物之智慧財產權均屬乙方所有。甲方若未付清即擅自使用、公開傳輸或改作，乙方得終止合約並請求損害賠償。",
  },
  {
    id: "ghosting",
    title: "第七條：甲方協力義務與失聯條款",
    content:
      "甲方應依進度準時提供文案、素材、權限與決策回覆。若甲方連續 {{ghostingDays}} 日未回覆、未提供必要資料或要求暫停專案，乙方有權以書面通知終止本合約。合約終止後，乙方已收款項不予退還，甲方並須依乙方已完成之工作比例補足差額。",
  },
  {
    id: "kill-fee",
    title: "第八條：終止與違約處理",
    content:
      "若甲方非因乙方重大違約而單方終止合約，甲方已支付之款項不予退還，並須依已完成比例結算，另加計結算金額 20% 作為專案管理與作業重置費用。若甲方遲延付款、侵犯智財權或拒絕履行協力義務，乙方得逕行終止並請求損害賠償。",
  },
  {
    id: "confidentiality",
    title: "第九條：保密義務",
    content:
      "雙方就本專案所知悉之營業秘密、個人資料、商業策略與技術資訊，均應負保密義務。未經他方書面同意，不得向第三人揭露或挪作本專案以外用途。",
  },
  {
    id: "jurisdiction",
    title: "第十條：準據法與管轄法院",
    content:
      "本合約之解釋、效力與履行均適用中華民國法律。因本合約所生之任何爭議，雙方同意以 {{jurisdiction}} 為第一審管轄法院。",
  },
  {
    id: "esign",
    title: "第十一條：電子簽署與留存",
    content:
      "甲方得透過築時數位提供之專屬簽署網址，以電子方式完成本合約之確認與簽署。系統將留存簽署人姓名、Email、電話、簽署時間、裝置資訊摘要與簽名圖像，作為本次簽署之紀錄與佐證。",
  },
];

export function buildContractClauses(draft: Pick<
  ContractDraft,
  | "projectTitle"
  | "totalAmount"
  | "paymentPlanLabel"
  | "freeRevisionRounds"
  | "extraRevisionFee"
  | "finalReviewDays"
  | "ghostingDays"
  | "warrantyDays"
  | "jurisdiction"
>): ContractClause[] {
  const variables: DraftVariables = {
    projectTitle: draft.projectTitle,
    totalAmountLabel: `新台幣 ${draft.totalAmount.toLocaleString("zh-TW")} 元`,
    paymentPlanLabel: draft.paymentPlanLabel,
    freeRevisionRounds: draft.freeRevisionRounds,
    extraRevisionFee: draft.extraRevisionFee,
    finalReviewDays: draft.finalReviewDays,
    ghostingDays: draft.ghostingDays,
    warrantyDays: draft.warrantyDays,
    jurisdiction: draft.jurisdiction,
  };

  return clauseTemplates.map((clause) => ({
    id: clause.id,
    title: clause.title,
    content: interpolate(clause.content, variables),
  }));
}

export function buildPaymentStages(
  totalAmount: number,
  plan: ReadonlyArray<{ id: string; label: string; percent: number; dueRule: string }>,
): PaymentStage[] {
  return plan.map((item) => ({
    id: item.id,
    label: item.label,
    percent: item.percent,
    dueRule: item.dueRule,
    amount: Math.round((totalAmount * item.percent) / 100),
    status: "pending",
  }));
}

export const paymentPlanPresets = {
  "3-4-3": [
    { id: "deposit", label: "第一期訂金", percent: 30, dueRule: "簽約後 3 個工作日內支付" },
    { id: "beta", label: "第二期測試版交付款", percent: 40, dueRule: "交付 Beta 版後 5 個工作日內支付" },
    { id: "final", label: "第三期尾款", percent: 30, dueRule: "正式上線或視同驗收後 5 個工作日內支付" },
  ],
  "4-4-2": [
    { id: "deposit", label: "第一期訂金", percent: 40, dueRule: "簽約後 3 個工作日內支付" },
    { id: "beta", label: "第二期測試版交付款", percent: 40, dueRule: "交付 Beta 版後 5 個工作日內支付" },
    { id: "final", label: "第三期尾款", percent: 20, dueRule: "正式上線或視同驗收後 5 個工作日內支付" },
  ],
} as const;
