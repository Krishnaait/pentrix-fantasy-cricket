import { describe, expect, it } from "vitest";
import { appRouter } from "../routers";
import type { TrpcContext } from "../_core/context";

function createMockContext(): { ctx: TrpcContext } {
  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
      get: () => undefined,
    } as any,
    res: {
      cookie: () => {},
      clearCookie: () => {},
    } as any,
  };

  return { ctx };
}

describe("auth.register", () => {
  it("should reject registration for users under 18", async () => {
    const { ctx } = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const underageDate = new Date();
    underageDate.setFullYear(underageDate.getFullYear() - 17);

    await expect(
      caller.auth.register({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        dateOfBirth: underageDate.toISOString().split('T')[0],
      })
    ).rejects.toThrow();
  });

  it("should reject weak passwords", async () => {
    const { ctx } = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const validDate = new Date();
    validDate.setFullYear(validDate.getFullYear() - 20);

    await expect(
      caller.auth.register({
        name: "Test User",
        email: "test@example.com",
        password: "123", // Too short
        dateOfBirth: validDate.toISOString().split('T')[0],
      })
    ).rejects.toThrow();
  });
});

describe("auth.login", () => {
  it("should reject login with invalid credentials", async () => {
    const { ctx } = createMockContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.auth.login({
        email: "nonexistent@example.com",
        password: "wrongpassword",
      })
    ).rejects.toThrow();
  });
});

describe("auth.me", () => {
  it("should return null for unauthenticated users", async () => {
    const { ctx } = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.me();
    expect(result).toBeNull();
  });

  it("should return user data for authenticated users", async () => {
    const { ctx } = createMockContext();
    
    // Mock authenticated user
    ctx.user = {
      id: 1,
      email: "test@example.com",
      name: "Test User",
      role: "user",
      openId: "test-open-id",
      loginMethod: "email",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
      passwordHash: "hashed",
      dateOfBirth: new Date("2000-01-01"),
      age: 24,
      state: null,
      country: null,
    };

    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.me();

    expect(result).not.toBeNull();
    expect(result?.email).toBe("test@example.com");
    expect(result?.name).toBe("Test User");
  });
});
