import { describe, it, expect } from "vitest";
import { createTarget, updateTarget, updateTargetStatus, deleteTarget, getHuntSummary } from "@/lib/studio/hunt";

describe("Hunt Utilities", () => {
  const mockState = {
    targets: [
      createTarget({
        name: "測試店家",
        category: "priority-1",
        source: "IG",
        sourceUrl: "",
        notes: "測試備註",
        city: "台北市",
        existingWebsite: "",
        googleMapsUrl: "",
      }),
    ],
  };

  describe("createTarget", () => {
    it("should create a target with correct properties", () => {
      const target = createTarget({
        name: "新店家",
        category: "priority-2",
        source: "FB",
        sourceUrl: "https://facebook.com/test",
        notes: "測試",
        city: "新北市",
        existingWebsite: "https://example.com",
        googleMapsUrl: "",
      });

      expect(target).toHaveProperty("id");
      expect(target).toHaveProperty("name", "新店家");
      expect(target).toHaveProperty("category", "priority-2");
      expect(target).toHaveProperty("source", "FB");
      expect(target).toHaveProperty("status", "found");
      expect(target).toHaveProperty("createdAt");
      expect(target).toHaveProperty("updatedAt");
    });
  });

  describe("updateTarget", () => {
    it("should update target properties", () => {
      const targetId = mockState.targets[0].id;
      const updated = updateTarget(mockState, targetId, { name: "更新後名稱", notes: "新備註" });

      expect(updated.targets[0].name).toBe("更新後名稱");
      expect(updated.targets[0].notes).toBe("新備註");
    });

    it("should not modify original state", () => {
      const targetId = mockState.targets[0].id;
      updateTarget(mockState, targetId, { name: "更新後名稱" });

      expect(mockState.targets[0].name).toBe("測試店家");
    });
  });

  describe("updateTargetStatus", () => {
    it("should update target status", () => {
      const targetId = mockState.targets[0].id;
      const updated = updateTargetStatus(mockState, targetId, "contacted");

      expect(updated.targets[0].status).toBe("contacted");
    });
  });

  describe("deleteTarget", () => {
    it("should remove target from state", () => {
      const targetId = mockState.targets[0].id;
      const updated = deleteTarget(mockState, targetId);

      expect(updated.targets).toHaveLength(0);
    });

    it("should not modify original state", () => {
      const targetId = mockState.targets[0].id;
      deleteTarget(mockState, targetId);

      expect(mockState.targets).toHaveLength(1);
    });
  });

  describe("getHuntSummary", () => {
    it("should calculate correct summary", () => {
      const summary = getHuntSummary(mockState);

      expect(summary).toHaveProperty("totals");
      expect(summary).toHaveProperty("totalFound");
      expect(summary).toHaveProperty("totalTarget");
      expect(summary).toHaveProperty("statusBreakdown");
      expect(summary.totalFound).toBe(1);
    });
  });
});
