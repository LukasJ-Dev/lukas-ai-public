import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import AppError from "./app_error";
import { headers } from "next/headers";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ipRatelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(20, "30 s"), // IP: 20 requests per 30 seconds
});

const globalRatelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(500, "1 m"), // Global: 500 requests per minute
});

export default async function rate_limit() {
  try {
    // Extract identifier for rate limiting
    const h = await headers();
    const ip =
      h.get("x-forwarded-for") ||
      h.get("x-real-ip") ||
      h.get("cf-connecting-ip") ||
      h.get("x-envoy-external-address") ||
      "unknown";

    // Check IP rate limit
    const ipResult = await ipRatelimit.limit(ip);
    if (!ipResult.success) {
      throw new AppError(
        "Too many requests from this IP. Please wait a moment and try again.",
        429
      );
    }

    // Check global rate limit
    const globalResult = await globalRatelimit.limit("global");
    if (!globalResult.success) {
      throw new AppError(
        "The server is handling too many requests at the moment. Please try again later.",
        429
      );
    }

    return true;
  } catch (error: unknown) {
    throw error;
  }
}
