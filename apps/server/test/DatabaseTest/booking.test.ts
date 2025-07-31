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
                roomKey: "deluxe-suite",
                roomDescription: "Deluxe Suite with Ocean View",
                roomImage: "hotel-room-image.jpg",
                request: "Late check-in requested",
                guestName: "John Doe",
                guestNumber: "+1234567890",
                checkin: new Date('2025-08-01'),
                checkout: new Date('2025-08-05'),
                guests: "4",
                baseRateInCurrency: 1234,
                includedTaxesAndFeesInCurrency: 200,
                stripeSessionId: "stripeSession123"
            }
        })
        expect(booking.userId).toBe(userId);
        expect(booking.hotelId).toBe("testHotel123");
        expect(booking.hotelName).toBe("TestHotel");
        expect(booking.roomKey).toBe("deluxe-suite");
        expect(booking.roomDescription).toBe("Deluxe Suite with Ocean View");
        expect(booking.roomImage).toBe("hotel-room-image.jpg");
        expect(booking.request).toBe("Late check-in requested");
        expect(booking.guestName).toBe("John Doe");
        expect(booking.guestNumber).toBe("+1234567890");
        expect(booking.checkin).toEqual(new Date('2025-08-01'));
        expect(booking.checkout).toEqual(new Date('2025-08-05'));
        expect(booking.guests).toEqual("4");
        expect(booking.baseRateInCurrency).toEqual(1234);
        expect(booking.includedTaxesAndFeesInCurrency).toEqual(200);
        expect(booking.stripeSessionId).toEqual("stripeSession123");

        await prisma.booking.create({
            data:{
                userId: userId,
                hotelId: "testHotel456",
                hotelName: "TestHotel2",
                roomKey: "standard-room",
                roomDescription: "Standard Room with City View",
                guestName: "Jane Smith",
                guestNumber: "+0987654321",
                checkin: new Date('2025-08-01'),
                checkout: new Date('2025-08-05'),
                guests: "2",
                baseRateInCurrency: 5432,
                includedTaxesAndFeesInCurrency: 350,
                stripeSessionId: "stripeSession456"
            }
        })

    });
    test("Create Booking Fail : Invalid userId", async ()=>{
        await expect(
            prisma.booking.create({
                data: {
                    userId: "123", // Assuming this user doesn't exist
                    hotelId: "testHotel123",
                    hotelName: "TestHotel",
                    roomKey: "deluxe-suite",
                    roomDescription: "Deluxe Suite with Ocean View",
                    guestName: "John Doe",
                    guestNumber: "+1234567890",
                    checkin: new Date("2025-08-01"),
                    checkout: new Date("2025-08-05"),
                    guests: "4",
                    baseRateInCurrency: 1234,
                    includedTaxesAndFeesInCurrency: 200,
                    stripeSessionId: "stripeSession123",
                },
            })
        ).rejects.toThrow("Foreign key constraint");
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
        expect(booking1.roomKey).toBe("standard-room");
        expect(booking1.roomDescription).toBe("Standard Room with City View");
        expect(booking1.guestName).toBe("Jane Smith");
        expect(booking1.guestNumber).toBe("+0987654321");
        expect(booking1.checkin).toEqual(new Date('2025-08-01'));
        expect(booking1.checkout).toEqual(new Date('2025-08-05'));
        expect(booking1.guests).toEqual("2");
        expect(booking1.baseRateInCurrency).toEqual(5432);
        expect(booking1.includedTaxesAndFeesInCurrency).toEqual(350);
        expect(booking1.stripeSessionId).toEqual("stripeSession456");

        expect(booking2.userId).toBe(userId);
        expect(booking2.hotelId).toBe("testHotel123");
        expect(booking2.hotelName).toBe("TestHotel");
        expect(booking2.roomKey).toBe("deluxe-suite");
        expect(booking2.roomDescription).toBe("Deluxe Suite with Ocean View");
        expect(booking2.roomImage).toBe("hotel-room-image.jpg");
        expect(booking2.request).toBe("Late check-in requested");
        expect(booking2.guestName).toBe("John Doe");
        expect(booking2.guestNumber).toBe("+1234567890");
        expect(booking2.checkin).toEqual(new Date('2025-08-01'));
        expect(booking2.checkout).toEqual(new Date('2025-08-05'));
        expect(booking2.guests).toEqual("4");
        expect(booking2.baseRateInCurrency).toEqual(1234);
        expect(booking2.includedTaxesAndFeesInCurrency).toEqual(200);
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