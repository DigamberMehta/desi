# Backend Setup & Quick Start Guide

## 1. Install Dependencies

```bash
cd backend
npm install
```

## 2. Create .env File

Create a `.env` file in the backend root (copy from `.env.example`):

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/desi-uae
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
```

## 3. Start MongoDB

```bash
# macOS with Homebrew
brew services start mongodb-community

# Verify MongoDB is running
mongosh
```

## 4. Seed Database with Products

```bash
npm run seed
```

Output should show:

```
✅ MongoDB connected
🗑️  Cleared existing products
✅ Inserted 5 products
   - DESi Utopic RX — Face Recognition Smart Lock
   - DESi Utopic RX — WiFi Bridge Edition
   - DESi Utopic RX — Fingerprint + WiFi Set
   - DESi Utopic RX — Base Smart Lock
   - DESi QUiC V002 Door Cam + Access Control
✅ Database connection closed
```

## 5. Start Development Server

```bash
npm run dev
```

Server should start on `http://localhost:5000`

---

## Quick API Tests

### Test 1: Get All Products

```bash
curl http://localhost:5000/api/products
```

### Test 2: Get Product by Slug

```bash
curl http://localhost:5000/api/products/slug/desi-utopic-rx-face-recognition
```

### Test 3: Create a User

```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "+971501234567",
    "role": "user"
  }'
```

### Test 4: Get All Users

```bash
curl http://localhost:5000/api/users
```

### Test 5: Create a Product

```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "new-smart-lock",
    "name": {
      "en": "New Smart Lock",
      "ar": "قفل ذكي جديد"
    },
    "priceAED": 200,
    "priceAED": 800,
    "image": "https://example.com/image.png",
    "category": "smart-locks",
    "stock": 50,
    "isNew": true
  }'
```

---

## Project Structure

```
backend/
├── app.js                  # Express app setup
├── server.js              # Server entry point
├── package.json           # Dependencies & scripts
├── .env                   # Environment variables
├── .env.example           # Example env file
├── models/
│   ├── Product.js        # Product schema
│   ├── User.js           # User schema
│   └── index.js          # Model exports
├── controllers/
│   ├── productController.js   # Product CRUD logic
│   ├── userController.js      # User CRUD logic
│   └── index.js               # Controller exports
├── routes/
│   ├── products.js       # Product routes
│   ├── users.js          # User routes
│   └── index.js          # Route aggregator
├── middleware/
│   └── index.js          # Middleware functions
├── extra/
│   ├── seed.js           # Database seeding script
│   └── index.js          # Utilities & constants
├── API_DOCS.md           # Full API documentation
└── README.md             # Backend README
```

---

## Available Scripts

```bash
npm start       # Run production server
npm run dev     # Run development server with nodemon
npm run seed    # Populate database with product data
```

---

## Important Notes

- All endpoints return JSON
- Passwords are hashed with bcryptjs
- Passwords are never returned in responses
- Product slugs must be unique
- User emails must be unique
- Bilingual support (English/Arabic) for products
- See `API_DOCS.md` for complete API reference

---

## Troubleshooting

### MongoDB Connection Error

- Ensure MongoDB is running: `brew services start mongodb-community`
- Check MONGODB_URI in .env file
- Verify database is accessible: `mongosh`

### Port Already in Use

- Change PORT in .env file
- Or kill the process: `lsof -ti:5000 | xargs kill -9`

### Module Not Found

- Run `npm install`
- Ensure all imports use `.js` extension (ES6 modules)

---

## Next Steps

1. ✅ Database seeded with products
2. ✅ CRUD routes created
3. Next: Add authentication middleware
4. Next: Add validation middleware
5. Next: Connect frontend to backend
