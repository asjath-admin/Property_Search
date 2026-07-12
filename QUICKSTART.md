# QUICK START GUIDE - Property Search SPA

## ✅ PROJECT COMPLETE - READY FOR SUBMISSION

### What's Been Built:
1. ✅ 5 components (minimum required)
2. ✅ Search with 7 filter combinations
3. ✅ Property details with image gallery & tabs
4. ✅ Favourites with drag-drop & duplicate prevention
5. ✅ Responsive design (1 media query only)
6. ✅ ONE CSS file (no frameworks)
7. ✅ 6 Jest tests (all passing)
8. ✅ CSP security
9. ✅ 7 properties in JSON

---

## 🚀 How to Run

```bash
# 1. Install dependencies (if not already done)
npm install

# 2. Start development server
npm start
# Opens http://localhost:3000

# 3. Run tests
npm test

# 4. Build for production
npm build
```

---

## 🎯 Features to Demo in Viva

### 1. Search Functionality
**Location:** SearchPage.js (lines 33-66)
- Try combining multiple filters
- Show "Reset" button functionality
- Explain the filtering logic

### 2. Favourites System  
**Location:** SearchPage.js (lines 76-108)
- Add property to favourites
- Show duplicate prevention
- Drag & drop to reorder
- Clear all button

### 3. Property Details
**Location:** PropertyPage.js
- Click thumbnails to change main image
- Show 3 tabs: Description, Floor Plan, Map
- Navigate back to search

### 4. Responsive Design
**Location:** index.css (line 265)
- Resize browser to < 768px
- Show mobile layout
- ONE media query only

### 5. Testing
**Command:** `npm test`
- All 6 tests pass
- Covers search filtering
- Covers favourites logic

---

## 📝 Key Code Sections for Viva Questions

### Q: "Explain your search filtering logic"
**Answer:** SearchPage.js, lines 33-66
- Start with all properties
- Apply each filter if value exists
- Use array filter() method
- Works with ANY combination

### Q: "How do you prevent duplicate favourites?"
**Answer:** SearchPage.js, lines 77-84
- Check if property.id already exists
- Use array.find() method
- If exists: remove, if not: add

### Q: "How does drag and drop work?"
**Answer:** SearchPage.js, lines 94-108
- HTML5 drag API
- Store draggedIndex in state
- Splice and reorder array
- Update favourites state

### Q: "Why only 5 components?"
**Answer:** 
- Minimizes complexity
- Easier to maintain
- Reusable PropertyCard
- No unnecessary abstractions

---

## 📊 Project Statistics

- **Total Components:** 5
- **Lines of CSS:** ~265 + ~85 media query
- **Media Queries:** 1 (requirement met)
- **Tests:** 6 (all passing)
- **Properties:** 7 (JSON data)
- **Images per property:** 6-8
- **No frameworks:** ✓
- **No animations:** ✓
- **CSP included:** ✓

---

## 🎓 Marks Checklist

- ✅ Search with multiple filters
- ✅ Property details page
- ✅ Image gallery with thumbnails
- ✅ Tabs (Description, Floor Plan, Map)
- ✅ Favourites add/remove
- ✅ Drag & drop favourites
- ✅ Duplicate prevention
- ✅ Clear favourites
- ✅ Responsive (1 media query)
- ✅ No frameworks
- ✅ Simple colors/design
- ✅ Jest tests (5+ tests)
- ✅ Security (JSX + CSP)
- ✅ JSON data (7 properties)
- ✅ localStorage persistence

---

## 💡 Pro Tips for Viva

1. **Run the app first** - Show it working
2. **Run tests** - Prove they pass
3. **Open code side-by-side** - Easy reference
4. **Know your line numbers** - Quick navigation
5. **Explain simply** - No over-complicated terms
6. **Show responsive design** - Resize browser
7. **Demo drag & drop** - Visual proof

---

## 📁 File Locations

- **Main App:** src/App.js
- **Search & Filters:** src/components/SearchPage.js
- **Property Details:** src/components/PropertyPage.js
- **Reusable Card:** src/components/PropertyCard.js
- **Tabs:** src/components/Tabs.js
- **CSS:** src/index.css
- **Data:** src/data/properties.json
- **Tests:** src/App.test.js

---

