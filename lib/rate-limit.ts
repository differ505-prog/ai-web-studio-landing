import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let redisClient: Redis | null = null;

function isRateLimitConfigured(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

function getRedisClient(): Redis {
  if (!redisClient) {
    const url = process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;

    if (!url || !token) {
      throw new Error("KV_REST_API_URL or KV_REST_API_TOKEN not configured");
    }

    redisClient = new Redis({ url, token });
  }
  return redisClient;
}

export function getContactRateLimiter(): Ratelimit | null {
  if (!isRateLimitConfigured()) {
    return null;
  }
  return new Ratelimit({
    redis: getRedisClient(),
    limiter: Ratelimit.slidingWindow(10, "1 m"),
    analytics: true,
    prefix: "ratelimit:contact",
    timeout: 1000,
  });
}

export function getSignRateLimiter(): Ratelimit | null {
  if (!isRateLimitConfigured()) {
    return null;
  }
  return new Ratelimit({
    redis: getRedisClient(),
    limiter: Ratelimit.slidingWindow(5, "1 m"),
    analytics: true,
    prefix: "ratelimit:sign",
    timeout: 1000,
  });
}

export type RateLimitHeaders = Record<string, string>;

export async function getRateLimitInfo(
  rateLimiter: Ratelimit | null,
  identifier: string
): Promise<{ success: boolean; remaining: number; reset: number; headers: RateLimitHeaders }> {
  if (!rateLimiter) {
    return {
      success: true,
      remaining: 999,
      reset: Date.now() + 60000,
      headers: {},
    };
  }

  const { success, remaining, reset } = await rateLimiter.limit(identifier);
  return {
    success,
    remaining,
    reset,
    headers: {
      "X-RateLimit-Limit": "10",
      "X-RateLimit-Remaining": String(remaining),
      "X-RateLimit-Reset": String(reset),
    },
  };
}
