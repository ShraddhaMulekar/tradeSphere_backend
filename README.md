# TradeSphere Backend API

A comprehensive REST API for a stock trading platform built with Node.js, Express, and MongoDB.

## 🚀 Features

- **User Authentication** - Register, Login, Logout with JWT
- **Wallet Management** - Add/Withdraw funds
- **Watchlist** - Add/Remove stocks to watchlist
- **Trading** - Buy/Sell stocks with order management
- **Portfolio** - Track holdings with real-time P&L
- **Orders** - Pending to Completed order flow (10 seconds)
- **Stock Search** - Search stocks via Finnhub API
- **Popular Stocks** - Pre-curated list with live prices

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Finnhub API Key 

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone 
cd tradesphere-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file**
```env
PORT=5000
MONGO_URI=mongodb+srv://user:test123@cluster0.39v6p.mongodb.net/tradeSphere?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=tR@desPhere#2025
SALT_ROUNDS=10
FINNHUB_KEY=d4o59h9r01qtrbsisaf0d4o59h9r01qtrbsisafg
```

4. **Start the server**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── auth/
│   │   ├── register.controller.js
│   │   ├── login.controller.js
│   │   └── logout.controller.js
│   ├── wallet/
│   │   ├── add_wallet.controller.js
│   │   └── withdrawal_wallet.controller.js
│   ├── watchlist/
│   │   ├── add_watchList.controller.js
│   │   └── remove_watchlist.controller.js
│   ├── trade/
│   │   ├── buyTrade.controller.js
│   │   └── sellTrade.controller.js
│   ├── portfolio/
│   │   └── allPortfolio.controller.js
│   ├── order/
│   │   ├── order.controller.js
│   │   └── allOrder.controller.js
│   └── stock/
│       ├── searchStock.controller.js
│       ├── popularStocks.controller.js
│       └── price.controller.js
├── middlewares/
│   └── auth.middleware.js    # JWT verification
├── models/
│   ├── user.model.js
│   ├── portfolio.model.js
│   ├── order.model.js
│   └── logout.model.js
├── routes/
│   ├── auth.route.js
│   ├── wallet.route.js
│   ├── watchList.route.js
│   ├── trade.route.js
│   ├── portfolio.route.js
│   ├── order.route.js
│   ├── stockSearch.route.js
│   ├── popularStocks.route.js
│   └── price.route.js
├── .env
├── server.js
└── package.json
```

## 📡 API Endpoints

### **Authentication**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | ❌ |
| POST | `/auth/login` | Login user | ❌ |
| POST | `/auth/logout` | Logout user | ✅ |
| GET | `/auth/all-users` | Get all users | ❌ |

### **Wallet**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/wallet/add` | Add money to wallet | ✅ |
| POST | `/wallet/withdrawal` | Withdraw money | ✅ |

### **Watchlist**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/watchlist/add` | Add stock to watchlist | ✅ |
| POST | `/watchlist/remove` | Remove stock from watchlist | ✅ |
| GET | `/watchlist/all` | Get user's watchlist | ✅ |

### **Trading**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/trade/buy` | Buy stock | ✅ |
| POST | `/trade/sell` | Sell stock | ✅ |

### **Portfolio**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/portfolio/all` | Get user's portfolio | ✅ |

### **Orders**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/order/create` | Create order | ✅ |
| GET | `/order/all` | Get user's orders | ✅ |
| DELETE | `/order/delete/:id` | Delete pending order | ✅ |

### **Stocks**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/stock/search/:symbol` | Search stocks | ✅ |
| GET | `/stock/quote/:symbol` | Get stock price | ✅ |
| GET | `/stock/popular` | Get popular stocks | ✅ |
| GET | `/price/:symbol` | Get stock price | ✅ |

## 🔐 Authentication

API uses JWT (JSON Web Tokens) for authentication.

**Request Header:**
```
Authorization: Bearer <your_jwt_token>
```

## 📝 Example API Calls

### Register User
```bash
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password@123"
}
```

### Buy Stock
```bash
POST /trade/buy
Authorization: Bearer <token>
Content-Type: application/json

{
  "symbol": "AAPL",
  "quantity": 10,
  "price": 150.50
}
```

## 🧪 Order Flow

1. **Order Created** → Status: `pending`
2. **Wait 10 seconds** → Auto-processing
3. **Order Completed** → Status: `completed`
   - Wallet updated
   - Portfolio updated

## 🌐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/tradesphere` |
| `JWT_SECRET` | Secret key for JWT | `your_secret_key` |
| `SALT_ROUNDS` | Bcrypt salt rounds | `10` |
| `FINNHUB_KEY` | Finnhub API key | `your_finnhub_key` |

## 📦 Dependencies

```json
{
  "express": "^4.18.2",
  "mongoose": "^7.0.0",
  "dotenv": "^16.0.3",
  "cors": "^2.8.5",
  "bcrypt": "^5.1.0",
  "jsonwebtoken": "^9.0.0",
  "axios": "^1.4.0"
}
```

## 🚨 Error Handling

All endpoints return consistent error responses:

```json
{
  "message": "Error description",
  "error": "Detailed error message"
}
```

**HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes with middleware
- Input validation
- CORS enabled

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (Admin/User),
  wallet: Number (default: 0),
  watchlist: [String]
}
```

### Portfolio Model
```javascript
{
  userId: ObjectId,
  symbol: String,
  quantity: Number,
  buyPrice: Number
}
```

### Order Model
```javascript
{
  userId: ObjectId,
  symbol: String,
  type: String (BUY/SELL),
  quantity: Number,
  price: Number,
  total: Number,
  status: String (pending/completed/failed)
}
```

## 🐛 Known Issues

- `setTimeout` for order completion will reset if server restarts

-----