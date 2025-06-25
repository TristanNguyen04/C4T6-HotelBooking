# Hotel Booking Application

A full-stack hotel booking application with React client and Express server.

## Quick Start

To run both client and server simultaneously:

```bash
npm run dev
```

This will start:
- **Client**: React development server (typically on http://localhost:5173)
- **Server**: Express development server (typically on http://localhost:3000)

## Individual Commands

If you want to run them separately:

```bash
# Run only the client
npm run dev:client

# Run only the server
npm run dev:server
```

## Build

To build both applications for production:

```bash
npm run build
```

## Installation

To install all dependencies for both client and server:

```bash
npm run install:all
```

## Project Structure

```
C4T6-HotelBooking/
├── apps/
│   ├── client/     # React frontend
│   └── server/     # Express backend
├── package.json    # Root package.json with concurrent scripts
└── README.md
```
