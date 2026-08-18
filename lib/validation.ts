import { z } from "zod";

const phoneRegex = /^[\d\s\-+()]{8,20}$/;

export const ContactSchema = z.object({
  name: z
    .string()
    .min(1, "姓名為必填欄位")
    .max(80, "姓名長度不可超過 80 個字元")
    .regex(/^[\p{L}\s\d\u4e00-\u9fff]+$/u, "姓名包含無效字元"),
  email: z
    .string()
    .min(1, "Email 為必填欄位")
    .max(160, "Email 長度不可超過 160 個字元")
    .email("請輸入有效的 Email 地址"),
  message: z
    .string()
    .min(1, "需求描述為必填欄位")
    .max(3000, "需求描述長度不可超過 3000 個字元")
    .refine(
      (val) => !/<script|javascript:|on\w+=/i.test(val),
      "需求描述包含無效字元"
    ),
  projectType: z
    .string()
    .max(80, "專案類型長度不可超過 80 個字元")
    .optional()
    .default(""),
  website: z
    .string()
    .max(0, "此欄位為隱藏 honeypot")
    .optional(),
});

export const SignerInfoSchema = z.object({
  signerName: z
    .string()
    .min(1, "簽署人姓名為必填欄位")
    .max(100, "簽署人姓名長度不可超過 100 個字元")
    .regex(/^[\p{L}\s\d\u4e00-\u9fff]+$/u, "姓名包含無效字元"),
  signerEmail: z
    .string()
    .min(1, "簽署人 Email 為必填欄位")
    .email("請輸入有效的 Email 地址"),
  signerPhone: z
    .string()
    .min(1, "聯絡電話為必填欄位")
    .regex(phoneRegex, "請輸入有效的電話號碼"),
  signerRole: z
    .string()
    .min(1, "簽署人身分為必填欄位")
    .max(50, "簽署人身分長度不可超過 50 個字元"),
  signatureDataUrl: z
    .string()
    .min(1, "簽署資料為必填欄位")
    .regex(/^data:image\/(png|jpeg|jpg);base64,/i, "簽署格式無效"),
  agreedToTerms: z.literal(true, {
    message: "請勾選同意書",
  }),
  signedAt: z.string().datetime().optional(),
});

export type ContactPayload = z.infer<typeof ContactSchema>;
export type SignatureSubmission = z.infer<typeof SignerInfoSchema>;

export function sanitizeString(str: string): string {
  return str
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim();
}

export function createSafeErrorMessage(error: unknown): string {
  if (error instanceof z.ZodError) {
    const firstError = error.issues[0];
    if (firstError) {
      return firstError.message;
    }
  }
  if (error instanceof Error) {
    console.error("Internal error:", error.message);
  }
  return "資料驗證失敗，請重新整理後再試。";
}
