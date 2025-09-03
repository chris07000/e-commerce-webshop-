# Order Management Setup Guide

## Overzicht

Dit systeem is geïmplementeerd om orders bij te houden die via Stripe worden betaald. Hier is wat er is toegevoegd:

## Nieuwe Features

### 1. Order API Endpoints
- `GET /api/orders` - Alle orders ophalen (voor admin)
- `POST /api/orders` - Nieuwe order aanmaken
- `GET /api/orders/[id]` - Specifieke order ophalen
- `PUT /api/orders/[id]` - Order status updaten

### 2. Automatische Order Creation
- Stripe webhook verwerkt succesvolle betalingen
- Maakt automatisch orders aan in lokale JSON database
- Slaat cart items, klantgegevens en betaalstatus op

### 3. Admin Dashboard
- Toegankelijk via `/admin/orders`
- Overzicht van alle orders met status
- Mogelijkheid om order status te wijzigen
- Revenue tracking en statistieken

### 4. Verbeterde Payment Flow
- Cart data wordt meegegeven aan Stripe metadata
- Success page toont echte order informatie
- Automatische stock reductie na succesvolle betaling

## Setup Instructies

### 1. Environment Variabelen
Zorg ervoor dat je de volgende environment variabelen hebt ingesteld:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# Application Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Admin Authentication
ADMIN_PASSWORD=jouw_veilige_wachtwoord_hier
```

**⚠️ Belangrijk voor Admin Wachtwoord:**
- Verander `ADMIN_PASSWORD` naar een sterk wachtwoord
- Gebruik geen eenvoudige wachtwoorden zoals "123456" of "admin"
- Voor extra beveiliging kun je een lang wachtwoord gebruiken
- Standaard wachtwoord is `admin123` (verander dit!)

### 2. Stripe Webhook Setup
1. Ga naar je Stripe Dashboard
2. Ga naar Webhooks sectie
3. Voeg een nieuwe webhook endpoint toe: `https://e-commerce-webshop-353a.vercel.app/api/stripe/webhook`
4. Selecteer deze events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Kopieer de webhook signing secret naar `STRIPE_WEBHOOK_SECRET`

### 3. Data Directory
Het systeem maakt automatisch een `data/` directory aan in je project root om orders op te slaan in `orders.json`.

## Hoe het werkt

### Order Flow:
1. **Checkout**: Klant vult cart en gaat naar checkout
2. **Payment Intent**: Cart data wordt meegegeven aan Stripe metadata
3. **Payment**: Klant betaalt via Stripe
4. **Webhook**: Stripe stuurt webhook naar `/api/stripe/webhook`
5. **Order Creation**: Webhook maakt automatisch order aan via `/api/orders`
6. **Success Page**: Klant ziet order confirmatie met echte order data

### Data Storage:
- Orders worden opgeslagen in `data/orders.json`
- Geen database vereist - werkt direct out of the box
- Voor productie kun je dit later vervangen door een echte database

## Admin Functies

### Order Management Dashboard (`/admin/orders`)
- **🔒 Wachtwoord Beveiliging**: Login vereist met admin wachtwoord
- **Overzicht**: Alle orders met filters op status
- **Statistieken**: Revenue, order counts per status
- **Status Updates**: Direct order status wijzigen
- **Order Details**: Volledige order informatie bekijken
- **Session Management**: Blijft ingelogd tijdens browser sessie
- **Logout Functie**: Veilig uitloggen via logout knop

### Order Statussen:
- `pending` - Nieuwe order, nog niet verwerkt
- `processing` - Order wordt voorbereid
- `shipped` - Order is verzonden
- `delivered` - Order is geleverd
- `cancelled` - Order is geannuleerd

## Wat jullie nu kunnen zien

### Voor Klanten:
- Betaling werkt zoals voorheen via Stripe
- Success page toont nu echte order informatie
- Order ID wordt gegenereerd en getoond

### Voor Admin/Eigenaar:
- **🔐 Beveiligde toegang**: Ga naar `/admin/orders` en log in met wachtwoord
- Zie hoeveel revenue er binnen is gekomen
- Wijzig order statussen (pending → processing → shipped → delivered)
- Volledige order details inclusief klant info en items
- Veilige sessie management - blijft ingelogd tot je uitlogt

### Admin Login:
1. Ga naar `http://localhost:3000/admin/orders`
2. Voer admin wachtwoord in (standaard: `admin123`)
3. Krijg toegang tot volledige order dashboard
4. Gebruik logout knop rechts boven om veilig uit te loggen

## Volgende Stappen (Optioneel)

1. **Email Notifications**: Verstuur order confirmatie emails
2. **Database Migration**: Vervang JSON door PostgreSQL/MongoDB
3. **Inventory Management**: Automatische stock updates
4. **Customer Accounts**: Klant login en order geschiedenis
5. **Tracking Integration**: Koppeling met verzendpartners

## Troubleshooting

### Orders verschijnen niet in admin dashboard:
1. Check of webhook correct is ingesteld in Stripe
2. Controleer webhook secret in environment variabelen
3. Kijk in console logs voor webhook errors
4. Test met Stripe CLI: `stripe listen --forward-to localhost:3000/api/stripe/webhook`

### Data directory problemen:
- Zorg ervoor dat de applicatie schrijfrechten heeft
- `data/` directory wordt automatisch aangemaakt
- Voor productie: zet data directory buiten webroot

Dit systeem geeft jullie nu volledige controle over orders en betalingen! 🎉
