import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("User model", () => {
    let userId: string;
    beforeAll(async () => {
        // Clean up tables before tests
        await prisma.booking.deleteMany();
        await prisma.user.deleteMany();
        const testUser = await prisma.user.create({
            data:{
                email: '123@gmail.com',
                password: 'hashedpassword',
                isVerified: true,
            }
        })
        userId = testUser.id;
    });

    afterAll(async () => {
        await prisma.booking.deleteMany();
        await prisma.user.deleteMany();
    });

    test("Create Booking Successfully", async ()=>{
        const booking = await prisma.booking.create({
            data:{
                userId: userId,
                hotelId: "testHotel123",
                hotelName: "TestHotel",
                checkin: new Date('2025-08-01'),
                checkout: new Date('2025-08-05'),
                guests: "4",
                price: 1234,
                currency: "SGD",
                stripeSessionId: "stripeSession123"
            }
        })
        expect(booking.userId).toBe(userId);
        expect(booking.hotelId).toBe("testHotel123");
        expect(booking.hotelName).toBe("TestHotel");
        expect(booking.checkin).toEqual(new Date('2025-08-01'));
        expect(booking.checkout).toEqual(new Date('2025-08-05'));
        expect(booking.guests).toEqual("4");
        expect(booking.price).toEqual(1234);
        expect(booking.currency).toEqual("SGD");
        expect(booking.stripeSessionId).toEqual("stripeSession123");

        await prisma.booking.create({
            data:{
                userId: userId,
                hotelId: "testHotel456",
                hotelName: "TestHotel2",
                checkin: new Date('2025-08-01'),
                checkout: new Date('2025-08-05'),
                guests: "2",
                price: 5432,
                currency: "SGD",
                stripeSessionId: "stripeSession456"
            }
        })

    });

    test("Retrieve Booking Reccord: Valid UserId", async ()=>{
        const bookings = await prisma.booking.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        expect(bookings.length).toBe(2);
        const booking1 = bookings[0];
        const booking2 = bookings[1];
        expect(booking1.userId).toBe(userId);
        expect(booking1.hotelId).toBe("testHotel456")
        expect(booking1.hotelName).toBe("TestHotel2")
        expect(booking1.checkin).toEqual(new Date('2025-08-01'));
        expect(booking1.checkout).toEqual(new Date('2025-08-05'));
        expect(booking1.guests).toEqual("2");
        expect(booking1.price).toEqual(5432);
        expect(booking1.currency).toEqual("SGD");
        expect(booking1.stripeSessionId).toEqual("stripeSession456");

        expect(booking2.userId).toBe(userId);
        expect(booking2.hotelId).toBe("testHotel123");
        expect(booking2.hotelName).toBe("TestHotel");
        expect(booking2.checkin).toEqual(new Date('2025-08-01'));
        expect(booking2.checkout).toEqual(new Date('2025-08-05'));
        expect(booking2.guests).toEqual("4");
        expect(booking2.price).toEqual(1234);
        expect(booking2.currency).toEqual("SGD");
        expect(booking2.stripeSessionId).toEqual("stripeSession123");


    });

    test("Retrieve Booking Reccord: Invalid UserId", async ()=>{
        const bookings = await prisma.booking.findMany({
            where: {
                userId: "123"
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        expect(bookings.length).toBe(0);
        expect(bookings).toEqual([]);
    })

})