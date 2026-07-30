interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export interface RateLimitOptions {
  limit?: number; // Maximum allowed requests
  windowMs?: number; // Time window in milliseconds
}

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = {}
): { allowed: boolean; remaining: number; resetMs: number } {
  const limit = options.limit || 15; // default 15 requests
  const windowMs = options.windowMs || 60 * 1000; // default 1 minute

  const now = Date.now();
  const record = store[identifier];

  if (!record || now > record.resetTime) {
    store[identifier] = {
      count: 1,
      resetTime: now + windowMs,
    };
    return { allowed: true, remaining: limit - 1, resetMs: windowMs };
  }

  if (record.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetMs: Math.max(0, record.resetTime - now),
    };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: limit - record.count,
    resetMs: Math.max(0, record.resetTime - now),
  };
}
