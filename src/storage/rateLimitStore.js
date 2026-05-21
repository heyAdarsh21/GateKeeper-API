'use strict';

const config = require('../config');
class RateLimitStore {
  constructor() {
    /** @type {Map<string, { acceptedTimestamps: number[], rejectedCount: number }>} */
    this._store = new Map();
  }
  tryRequest(userId) {
    const now = Date.now();
    const windowStart = now - config.rateLimit.windowMs;

    let entry = this._store.get(userId);
    if (!entry) {
      entry = { acceptedTimestamps: [], rejectedCount: 0 };
      this._store.set(userId, entry);
    }

    entry.acceptedTimestamps = entry.acceptedTimestamps.filter(ts => ts > windowStart);

    if (entry.acceptedTimestamps.length >= config.rateLimit.maxRequests) {
      entry.rejectedCount++;
      return {
        allowed: false,
        currentCount: entry.acceptedTimestamps.length,
        rejectedTotal: entry.rejectedCount,
      };
    }

    entry.acceptedTimestamps.push(now);
    return {
      allowed: true,
      currentCount: entry.acceptedTimestamps.length,
      rejectedTotal: entry.rejectedCount,
    };
  }

  getStats() {
    const now = Date.now();
    const windowStart = now - config.rateLimit.windowMs;
    const users = {};

    for (const [userId, entry] of this._store) {
      const activeTimestamps = entry.acceptedTimestamps.filter(ts => ts > windowStart);
      users[userId] = {
        accepted_requests_current_window: activeTimestamps.length,
        rejected_requests_total: entry.rejectedCount,
      };
    }

    return users;
  }
}

module.exports = new RateLimitStore();
