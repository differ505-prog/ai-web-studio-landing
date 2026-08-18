import { describe, it, expect } from "vitest";
import {
  getWeekInfo,
  getLevel,
  getRankTitle,
  createInitialOpsState,
  getGroupViews,
  getOpsSummary,
} from "@/lib/studio/ops";

describe("Ops Utilities", () => {
  describe("getWeekInfo", () => {
    it("should return valid week information", () => {
      const result = getWeekInfo(new Date("2026-08-19"));

      expect(result).toHaveProperty("weekIndex");
      expect(result).toHaveProperty("weekKey");
      expect(result).toHaveProperty("weekLabel");
      expect(typeof result.weekIndex).toBe("number");
      expect(result.weekKey).toMatch(/^\d{4}-W\d{2}$/);
    });
  });

  describe("getLevel", () => {
    it("should calculate correct level from XP", () => {
      expect(getLevel(0)).toBe(1);
      expect(getLevel(199)).toBe(1);
      expect(getLevel(200)).toBe(2);
      expect(getLevel(400)).toBe(3);
    });

    it("should handle edge cases", () => {
      expect(getLevel(-100)).toBe(0);
      expect(getLevel(0)).toBe(1);
    });
  });

  describe("getRankTitle", () => {
    it("should return correct rank titles", () => {
      expect(getRankTitle(1)).toBe("起稿中");
      expect(getRankTitle(2)).toBe("構圖中");
      expect(getRankTitle(3)).toBe("提案中");
      expect(getRankTitle(4)).toBe("執行中");
      expect(getRankTitle(5)).toBe("定稿中");
      expect(getRankTitle(6)).toBe("主理中");
    });

    it("should clamp to valid range", () => {
      expect(getRankTitle(0)).toBe("起稿中");
      expect(getRankTitle(100)).toBe("主理中");
    });
  });

  describe("createInitialOpsState", () => {
    it("should create a valid initial state", () => {
      const state = createInitialOpsState(new Date("2026-08-19"));

      expect(state).toHaveProperty("weekly");
      expect(state).toHaveProperty("stats");
      expect(state.weekly).toHaveProperty("groups");
      expect(state.stats).toHaveProperty("xp");
      expect(state.stats).toHaveProperty("streak");
      expect(state.stats.xp).toBe(0);
      expect(state.stats.streak).toBe(0);
    });
  });

  describe("getOpsSummary", () => {
    it("should calculate correct summary", () => {
      const groups = getGroupViews(createInitialOpsState(new Date()));
      const summary = getOpsSummary(groups);

      expect(summary).toHaveProperty("totalGroups");
      expect(summary).toHaveProperty("totalItems");
      expect(summary).toHaveProperty("totalRequiredActions");
      expect(summary).toHaveProperty("completedItems");
      expect(summary).toHaveProperty("pendingItems");
      expect(summary).toHaveProperty("completedGroups");
      expect(summary).toHaveProperty("weeklyCompletionRate");
      expect(typeof summary.weeklyCompletionRate).toBe("number");
    });
  });
});
