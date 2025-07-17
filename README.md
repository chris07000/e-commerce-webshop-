# E-Commerce Webshop

Een moderne e-commerce webshop gebouwd met Next.js 14, React, TypeScript, en Tailwind CSS. De webshop heeft een elegant zwart-wit design en ondersteunt creditcard betalingen via Stripe.

## 🚀 Features

- **Modern Design**: Elegant zwart-wit thema met responsive design
- **Next.js 14**: App Router, Server Components, en optimalisaties
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Stripe Integration**: Veilige creditcard betalingen
- **Mobile-First**: Volledig responsive design
- **State Management**: Zustand voor cart management
- **Image Optimization**: Next.js Image component
- **SEO Optimized**: Metadata en structured data

## 📁 Project Structuur

```
e-commerce-webshop/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── stripe/
│   │   │   │   └── create-payment-intent/
│   │   │   │       └── route.ts
│   │   │   └── products/
│   │   │       └── route.ts
│   │   ├── products/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   ├── checkout/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── input.tsx
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   └── footer.tsx
│   │   ├── product/
│   │   │   ├── product-card.tsx
│   │   │   └── product-grid.tsx
│   │   ├── cart/
│   │   │   ├── cart-item.tsx
│   │   │   └── cart-summary.tsx
│   │   └── theme-provider.tsx
│   ├── lib/
│   │   ├── utils.ts
│   │   └── stripe.ts
│   ├── store/
│   │   └── cart-store.ts
│   ├── types/
│   │   └── index.ts
│   └── styles/
│       └── globals.css
├── public/
│   ├── images/
│   └── icons/
├── package.json
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
└── README.md
```

## 🛠️ Installation & Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd e-commerce-webshop
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Maak een `.env.local` bestand in de root directory:

```env
# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
```

### 4. Stripe Setup

1. Registreer een account op [Stripe](https://stripe.com)
2. Kopieer je API keys van het Stripe Dashboard
3. Voeg de keys toe aan je `.env.local` bestand
4. Test de betalingen met Stripe's test creditcard nummers

### 5. Run Development Server

```bash
npm run dev
```

Bezoek [http://localhost:3000](http://localhost:3000) om je webshop te bekijken.

## 🎨 Design Features

- **Zwart-wit thema**: Elegante, moderne uitstraling
- **Responsive**: Werkt perfect op alle apparaten
- **Smooth animations**: Framer Motion voor fluid transitions
- **Accessibility**: WCAG 2.1 compliant
- **Dark/Light mode**: Automatische theme switching

## 💳 Payment Integration

De webshop gebruikt Stripe voor veilige creditcard betalingen:

- **Ondersteunde kaarten**: Visa, Mastercard, American Express, etc.
- **Veiligheid**: PCI DSS compliant
- **3D Secure**: Ondersteund voor extra beveiliging
- **Webhooks**: Real-time payment status updates

## 🛍️ E-commerce Features

- **Product Catalog**: Dynamische product listings
- **Shopping Cart**: Persistent cart met local storage
- **Checkout Process**: Streamlined checkout flow
- **Order Management**: Order history en tracking
- **Search & Filter**: Zoek en filter functies
- **User Accounts**: Account management
- **Wishlist**: Save voor later functionaliteit

## 📱 Mobile Optimization

- **Touch-friendly**: Optimized voor touch interfaces
- **Fast Loading**: Geoptimaliseerde afbeeldingen en code
- **Offline Support**: Service worker voor offline functionaliteit
- **PWA Ready**: Progressive Web App capabilities

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Build voor productie
npm run build

# Start productie server
npm run start

# Lint code
npm run lint

# Type checking
npm run type-check
```

### Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, CSS Modules
- **State Management**: Zustand
- **Payments**: Stripe
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod

## 🚀 Deployment

### Vercel (Recommended)

1. Push code naar GitHub
2. Connect repository op Vercel
3. Voeg environment variables toe
4. Deploy!

### Andere platforms

De webshop werkt ook op:
- Netlify
- Railway
- AWS Amplify
- Google Cloud Run

## 📈 Performance

- **Core Web Vitals**: Optimized voor Google's metrics
- **SEO**: Complete meta tags en structured data
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic code splitting
- **Caching**: Optimized caching strategies

## 🤝 Contributing

1. Fork het project
2. Maak een feature branch
3. Commit je changes
4. Push naar je branch
5. Open een Pull Request

## 📄 License

Dit project is licensed onder de MIT License.

## 🆘 Support

Voor vragen of problemen:
- Open een GitHub issue
- Stuur een email naar support@e-shop.com

## 🔄 Updates

- **v1.0.0**: Initial release
- **v1.1.0**: Added payment integration
- **v1.2.0**: Mobile optimization
- **v1.3.0**: PWA features

---

**Gebouwd met ❤️ voor Nederlandse e-commerce** 