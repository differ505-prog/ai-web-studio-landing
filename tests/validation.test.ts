import { describe, it, expect } from "vitest";
import { ContactSchema } from "@/lib/validation";

describe("Contact Schema Validation", () => {
  it("should validate a valid contact form submission", () => {
    const validData = {
      name: "王小明",
      email: "wang@example.com",
      message: "我想製作一個網站",
      projectType: "網站設計",
    };

    const result = ContactSchema.safeParse(validData);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("王小明");
      expect(result.data.email).toBe("wang@example.com");
    }
  });

  it("should reject an invalid email", () => {
    const invalidData = {
      name: "王小明",
      email: "not-an-email",
      message: "我想製作一個網站",
    };

    const result = ContactSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
  });

  it("should reject empty name", () => {
    const invalidData = {
      name: "",
      email: "test@example.com",
      message: "Test message",
    };

    const result = ContactSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
  });

  it("should reject message that is too short", () => {
    const invalidData = {
      name: "王小明",
      email: "test@example.com",
      message: "", // Empty message should fail
    };

    const result = ContactSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
  });
});
