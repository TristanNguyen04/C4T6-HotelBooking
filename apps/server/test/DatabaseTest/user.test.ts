import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("User model", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany()
  });

  test("Create User Successfully", async () => {
    const user = await prisma.user.create({
      data: {
        name: 'testuser123',
        email: "test@example.com",
        password: "password123",
        verificationToken: "token123",
        isVerified: true,
      },
    });

    expect(user.id).toBeDefined();
    expect(user.name).toBe('testuser123');
    expect(user.email).toBe("test@example.com");
    expect(user.password).toBe("password123");
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.isVerified).toBe(true);
    expect(user.verificationToken).toBe("token123");
  });

  test("Create user without optional fields", async () => {
    const user = await prisma.user.create({
      data: {
        email: "test2@example.com",
        password: "password123",
        
      },
    });
    expect(user.id).toBeDefined();
    expect(user.name).toBeNull();
    expect(user.email).toBe("test2@example.com");
    expect(user.verificationToken).toBeNull();
    expect(user.isVerified).toBe(false);
  });

  test("Enforce unique email", async () => {
    await prisma.user.create({
      data: {
        email: "unique@example.com",
        password: "password123",
      },
    });

    await expect(
      prisma.user.create({
        data: {
          email: "unique@example.com", // duplicate
          password: "password456",
        },
      })
    ).rejects.toThrow();
  });
});
