# Property Search SPA - University Coursework

A minimal React single-page application for searching and viewing properties in Sri Lanka.

## Features Implemented

✅ **Search Filtering** - Filter by type, price (LKR), bedrooms, location, date
✅ **Property Details** - Image gallery with thumbnails, tabs (description, floor plan, map)
✅ **Favourites** - Add/remove with duplicate prevention, drag & drop reordering
✅ **Responsive Design** - Single media query for mobile layout
✅ **Testing** - 6 Jest tests covering search and favourites logic
✅ **Security** - JSX encoding, CSP meta tag

## Component Structure (5 components only)

1. **App** - Router setup
2. **SearchPage** - Search form + results + favourites
3. **PropertyCard** - Reusable card component
4. **PropertyPage** - Property details with gallery
5. **Tabs** - Simple tab component

## Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test
```

## Data Structure

7 properties in Sri Lanka with:
- id, type, price (LKR), bedrooms, postcode, dateAdded, description
- 6-8 images per property
- Floor plan image
- Location coordinates (Colombo area) for map
- Detailed property features (parking, security, amenities)

## Search Functionality

Works with ANY combination of:
- Property type (house/flat/bungalow)
- Min/max price range (Sri Lankan Rupees)
- Min/max bedroom range
- Location area (Colombo 7, Nugegoda, Dehiwala, etc.)
- Date added (after selected date)

## Favourites Features

- Add/remove properties
- Duplicate prevention
- Drag & drop to reorder
- Clear all favourites
- Persisted in localStorage

## CSS Guidelines Followed

- ONE CSS file only (index.css)
- ONE media query (@768px)
- No frameworks, no animations
- Simple colors: white, light gray, black
- Flexbox layout only

## Testing Coverage

1. Filter by property type
2. Filter by price range
3. Filter by bedroom range
4. Reset filters
5. Add to favourites
6. Prevent duplicate favourites

## Security Measures

- JSX automatic encoding prevents XSS
- Content Security Policy meta tag in HTML
## Viva Preparation Tips

- Explain search filter logic (line 32-65 in SearchPage.js)
- Demonstrate drag & drop (line 94-108 in SearchPage.js)
- Show responsive design (line 265+ in index.css)
- Explain localStorage usage (line 20-29 in SearchPage.js)
- Discuss Sri Lankan property market context
- Show Google Maps integration with Colombo locations
- Run tests: `npm test`usage (line 20-29 in SearchPage.js)
- Run tests: `npm test`

## Code Quality

- Simple, readable code
- Comments on key logic
- No over-engineering
- Minimal component count
- Easy to explain in viva
