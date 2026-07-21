# AI Startup Simulator — Backend

## Setup

1. Copy `.env.example` to `.env` and fill in values.
2. Install dependencies:
   npm install
3. Run in development:
   npm run dev
4. Run in production:
   npm start

## Health Check

GET /api/health

Response:
{
  "statusCode": 200,
  "success": true,
  "message": "Server running successfully",
  "data": null
}