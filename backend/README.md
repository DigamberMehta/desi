# DESi Backend

## Environment Variables

Create a `.env` file in the backend root:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/desi-uae
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production

```bash
npm start
```

## Models

### Product

- slug (unique)
- name (bilingual: en, ar)
- description (bilingual)
- badge (NEW, SALE, BESTSELLER)
- priceAED, priceAED
- image, gallery
- bullets (bilingual)
- category (smart-locks, alarm-security, accessories)
- specifications
- stock, isNew, isActive
- ratings, reviewCount
- inTheBox

### User

- name, email (unique), password (hashed)
- role (user, admin)
- phone, avatar
- address (street, city, emirate, postalCode)
- isActive, isEmailVerified
- emailVerificationToken, resetPasswordToken
- lastLogin, createdAt, updatedAt
