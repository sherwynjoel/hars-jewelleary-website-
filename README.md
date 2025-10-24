# Hars Jewellery - E-commerce Website

A modern, responsive e-commerce website for jewelry with beautiful UI/UX, admin panel, and user functionality.

## Features

### 🎨 Modern UI/UX
- Beautiful, responsive design with Tailwind CSS
- High-level animations using Framer Motion
- Elegant typography with Playfair Display and Inter fonts
- Smooth transitions and hover effects
- Mobile-first responsive design

### 🔐 Authentication System
- Secure login and signup functionality
- NextAuth.js integration
- Role-based access control (User/Admin)
- Protected routes

### 👑 Admin Panel
- Product management (Create, Read, Update, Delete)
- Image upload functionality
- Inventory management
- Price and stock control
- Order management
- Dashboard with statistics

### 🛒 User Features
- Product browsing and filtering
- Shopping cart functionality
- Wishlist (favorites)
- Order placement
- User profile management
- Responsive product grid

### 🛍️ E-commerce Features
- Product categories (Rings, Necklaces, Earrings, etc.)
- Advanced filtering and sorting
- Shopping cart with quantity management
- Order processing
- Secure checkout

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Authentication**: NextAuth.js
- **Database**: Prisma with SQLite
- **State Management**: Zustand
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hars-jewellery
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Create sample data (optional)**
   ```bash
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── admin/             # Admin panel
│   ├── cart/              # Shopping cart
│   └── collections/       # Product collections
├── components/            # Reusable components
├── lib/                   # Utilities and configurations
├── prisma/               # Database schema
└── types/                # TypeScript type definitions
```

## Key Components

- **Navigation**: Responsive navigation with cart counter
- **ProductCard**: Animated product cards with hover effects
- **ProductGrid**: Responsive product grid with filtering
- **AdminPanel**: Complete admin interface for product management
- **Cart**: Shopping cart with quantity management
- **Authentication**: Secure login/signup forms

## Database Schema

The application uses Prisma with SQLite and includes:
- Users (with role-based access)
- Products (with images, categories, pricing)
- Cart items
- Orders and order items

## Admin Features

- **Dashboard**: Overview of products, stock, and sales
- **Product Management**: Add, edit, delete products
- **Image Upload**: Multiple image support
- **Inventory Control**: Stock management
- **Order Management**: View and process orders

## User Features

- **Product Browsing**: Filter by category, sort by price/name
- **Shopping Cart**: Add/remove items, quantity management
- **Wishlist**: Save favorite products
- **Order History**: View past orders
- **Responsive Design**: Works on all devices

## Customization

### Colors
The theme uses a gold color palette that can be customized in `tailwind.config.js`:

```javascript
colors: {
  gold: {
    50: '#fffbeb',
    500: '#f59e0b',
    600: '#d97706',
    // ... more shades
  }
}
```

### Animations
Framer Motion animations can be customized in individual components or globally in the CSS.

## Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**
   - Vercel (recommended for Next.js)
   - Netlify
   - AWS
   - Any Node.js hosting service

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact us at info@harsjewellery.com

---

Built with ❤️ for Hars Jewellery
