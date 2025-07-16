# 🐕‍🦺 WalkMate MVP - Dog Walking Service API

A simple REST API for managing dog walking bookings.

## 🛠️ Tech Stack

- **Node.js** with **Express.js** - Web framework
- **TypeScript** - Type safety and better developer experience
- **Zod** - Schema validation
- **File-based storage** - JSON data persistence
- **CORS** - Cross-origin resource sharing
- **UUID** - Unique identifier generation

## 📦 Installation

1. **Clone the repository**
2. **Install dependencies**

```bash
npm install
```

3. **Run the server**

```bash
npm run dev
```

## 🚀 Usage

The API runs on `http://localhost:5001` by default.

### API Endpoints

- `POST /api/booking` - Create a new dog walking booking
- `PATCH /api/booking/:id/complete` - Mark a booking as completed
- `GET /api/dashboard` - Get dashboard data with booking statistics

### Example Booking Request

```json
{
  "dogName": "Max",
  "breedOrSize": "Golden Retriever",
  "preferredDate": "2024-01-15",
  "preferredTime": "10:00",
  "duration": 30,
  "specialNotes": "Friendly with other dogs"
}
```

## 🔧 Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server

## 🚀 Improvements

- Add database integration (PostgreSQL/MongoDB)
- Add email notifications for bookings
- Add payment integration
- Implement rate limiting and API security
