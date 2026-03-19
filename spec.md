# Luxuries Perfume

## Current State
The site has 5 pages (Home, Collection, About, Journal, Contact) plus Checkout and OrderConfirmation. Products are in data/products.ts. Collection shows ProductCards with no detail page link.

## Requested Changes (Diff)

### Add
- New FragranceDetail page at route /fragrance/$id with: large image, name, category, price, full description, notes, star rating, add-to-cart, RatingModal, back link
- Route in App.tsx for /fragrance/$id

### Modify
- ProductCard: make image and name clickable, navigating to /fragrance/$id

### Remove
- Nothing

## Implementation Plan
1. Create src/frontend/src/pages/FragranceDetail.tsx
2. Add fragranceDetailRoute to App.tsx
3. Update ProductCard.tsx image and title to be links
