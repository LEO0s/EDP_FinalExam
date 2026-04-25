# Pokédex Application - Complete Setup & Test Guide

## 🚀 Quick Start

### Prerequisites
- Node.js and npm installed
- Both backend and frontend running

### Step 1: Start Backend Server
```bash
cd pokedex-backend
npm install  # (if not already done)
npm start
```
Expected output: `Pokédex backend server is running on http://localhost:5000`

### Step 2: Start Frontend Server
```bash
cd pokedex-frontend
npm install  # (if not already done)
npm start
```
The React app will automatically open at `http://localhost:3000`

---

## ✅ Automated Testing

### Option A: Browser Console Test
1. Open browser at `http://localhost:3000`
2. Open DevTools (F12)
3. Go to Console tab
4. Copy and paste the contents of `CRUD_TEST.js`
5. Run: `runAllTests()`

This will execute all CRUD operations and display results.

### Option B: Manual Testing (GUI)
Follow the testing checklist below.

---

## 🧪 Manual CRUD Testing Checklist

### ✓ Test 1: READ - View Pokémon List
- [ ] App loads at `http://localhost:3000`
- [ ] 30 Pokémon display as a grid on the left panel
- [ ] Each Pokémon shows name and sprite image
- [ ] Pokémon are visually distinct and clickable

**Expected:** List of 30 official Pokémon from PokéAPI

### ✓ Test 2: READ - View Pokémon Details
- [ ] Click on any Pokémon in the list
- [ ] Details panel appears on the right showing:
  - [ ] Pokémon name
  - [ ] Large sprite image
  - [ ] Height (in dm)
  - [ ] Weight (in hg)
  - [ ] Base Experience
  - [ ] Abilities (as colored tags)
  - [ ] Stats (with visual bars)
  - [ ] Description/flavor text
  - [ ] Audio player for cry (if available)

**Expected:** Comprehensive details about the selected Pokémon

### ✓ Test 3: CREATE - Add Custom Pokémon

#### Step 1: Open Create Form
- [ ] Click "+ Add New Pokémon" button
- [ ] Form appears with all required fields:
  - [ ] Name input
  - [ ] Abilities input (comma-separated)
  - [ ] Base Experience number input
  - [ ] Weight number input (hg)
  - [ ] Height number input (dm)
  - [ ] Description textarea
  - [ ] Sprite URL input (optional)
  - [ ] Stats sliders (6 stats: HP, Attack, Defense, Sp. Attack, Sp. Defense, Speed)

#### Step 2: Fill Form
- [ ] Enter Name: `TestMon`
- [ ] Enter Abilities: `test-ability, hidden-ability`
- [ ] Enter Base Experience: `100`
- [ ] Enter Weight: `50`
- [ ] Enter Height: `20`
- [ ] Enter Description: `A test Pokémon for demonstration`
- [ ] Leave Sprite as default or enter URL
- [ ] Adjust stats as desired (or leave at defaults)

#### Step 3: Submit
- [ ] Click "Create Pokémon" button
- [ ] Success alert appears: "Pokémon created successfully!"
- [ ] New Pokémon appears at the bottom of the list
- [ ] New Pokémon has orange "Custom" badge

**Expected:** TestMon appears in list with all entered data

### ✓ Test 4: UPDATE/EDIT - Modify Custom Pokémon

#### Step 1: Select Custom Pokémon
- [ ] Click on the custom Pokémon (TestMon) in the list
- [ ] Details appear on the right panel
- [ ] "Custom Pokémon" badge is visible

#### Step 2: Open Edit Form
- [ ] Click "✏️ Edit" button
- [ ] Edit form appears with current values pre-filled

#### Step 3: Modify Data
- [ ] Change Name to: `UpdatedTestMon`
- [ ] Change Description to: `Updated description`
- [ ] Change Weight to: `75`
- [ ] Change Height to: `25`
- [ ] Change Base Experience to: `150`
- [ ] Change Abilities to: `new-ability`

#### Step 4: Save
- [ ] Click "Save Changes" button
- [ ] Success alert appears: "Pokémon updated successfully!"
- [ ] Details panel updates with new values
- [ ] List updates with new name

**Expected:** All changes reflected in both list and details view

### ✓ Test 5: DELETE - Remove Custom Pokémon

#### Step 1: Select Custom Pokémon
- [ ] Ensure the custom Pokémon is still selected (should still be visible from Test 4)
- [ ] Details panel shows the custom Pokémon

#### Step 2: Delete
- [ ] Click "🗑️ Delete" button
- [ ] Confirmation dialog appears: "Are you sure you want to delete this Pokémon?"
- [ ] Click "OK" to confirm

#### Step 3: Verify Deletion
- [ ] Success alert appears: "Pokémon deleted successfully!"
- [ ] Pokémon is removed from the list
- [ ] Details panel shows: "Select a Pokémon to view details"
- [ ] List count decreases by 1

**Expected:** Pokémon is permanently deleted from list and details

---

## 🔄 Data Persistence Tests

### ✓ Test 6: localStorage Persistence
- [ ] Create a custom Pokémon (or use one from previous tests)
- [ ] Open DevTools (F12) → Application → Local Storage → http://localhost:3000
- [ ] Look for key: `pokedex_custom_pokemon`
- [ ] Value should contain an array of custom Pokémon

**Expected:** Custom Pokémon data is stored as JSON

### ✓ Test 7: Page Refresh Persistence
- [ ] Create a custom Pokémon
- [ ] Verify it appears in the list
- [ ] Refresh the page (F5)
- [ ] Wait for app to reload and load Pokémon
- [ ] Custom Pokémon should still appear in the list
- [ ] Details should be preserved

**Expected:** Custom Pokémon persists after page refresh

### ✓ Test 8: Browser Storage Persistence
- [ ] Create a custom Pokémon
- [ ] Close the browser completely
- [ ] Reopen browser and navigate to `http://localhost:3000`
- [ ] Custom Pokémon should still be in the list

**Expected:** Custom Pokémon persists across browser sessions

---

## 🔧 API Endpoint Tests

### Test Backend API Directly

You can test API endpoints using curl, Postman, or any REST client:

#### GET - Fetch Pokémon List
```bash
curl http://localhost:5000/api/pokemon
```

#### GET - Fetch Pokémon Details
```bash
curl http://localhost:5000/api/pokemon/1
```

#### POST - Create Custom Pokémon
```bash
curl -X POST http://localhost:5000/api/pokemon \
  -H "Content-Type: application/json" \
  -d '{
    "name": "TestMon",
    "abilities": ["test-ability"],
    "baseExperience": 100,
    "weight": 50,
    "height": 20,
    "description": "Test Pokémon",
    "sprite": "https://via.placeholder.com/96"
  }'
```

#### PATCH - Update Custom Pokémon
```bash
curl -X PATCH http://localhost:5000/api/pokemon/custom-[timestamp] \
  -H "Content-Type: application/json" \
  -d '{
    "name": "UpdatedName",
    "weight": 75
  }'
```

#### DELETE - Remove Custom Pokémon
```bash
curl -X DELETE http://localhost:5000/api/pokemon/custom-[timestamp]
```

---

## ✨ Features Verified

- ✅ **Homepage**: Displays 30 Pokémon from PokéAPI
- ✅ **Details View**: Shows comprehensive information (name, sprite, description, weight, height, base exp, stats, abilities, cry)
- ✅ **Create**: Add custom Pokémon with required fields
- ✅ **Read**: View details of both official and custom Pokémon
- ✅ **Update**: Edit custom Pokémon attributes
- ✅ **Delete**: Remove custom Pokémon from list
- ✅ **Persistence**: Custom Pokémon saved in localStorage
- ✅ **Sync**: Backend and frontend synchronized

---

## 🐛 Troubleshooting

### Backend won't start
- Ensure port 5000 is available
- Check that Node.js is installed: `node --version`
- Delete `node_modules` and run `npm install` again

### Frontend won't start
- Ensure port 3000 is available
- Check that Node.js is installed
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and run `npm install` again

### API calls failing
- Verify backend is running at `http://localhost:5000`
- Check browser console for errors (F12)
- Verify CORS headers are set correctly (they should be)

### localStorage not persisting
- Clear browser cookies/cache
- Check browser DevTools → Application → Local Storage
- Ensure localStorage is not disabled in browser settings

---

## 📁 Project Structure

```
EDP_FinalExam/
├── pokedex-backend/
│   ├── server.js (Express server with API endpoints)
│   ├── package.json
│   └── README.md
├── pokedex-frontend/
│   ├── src/
│   │   ├── App.js (Main React component)
│   │   ├── App.css
│   │   ├── index.js
│   │   └── components/
│   │       ├── PokemonList.js
│   │       ├── PokemonDetails.js
│   │       ├── CreatePokemonForm.js
│   │       ├── EditPokemonForm.js
│   │       └── (CSS files)
│   ├── public/
│   ├── package.json
│   └── README.md
├── TESTING_CHECKLIST.md
├── CRUD_TEST.js
└── SETUP_GUIDE.md (this file)
```

---

## 📝 Notes

- Custom Pokémon are stored in browser's localStorage (persists across sessions)
- Backend stores custom Pokémon in-memory (resets when server restarts)
- Frontend automatically syncs localStorage data to backend on load
- Original PokéAPI Pokémon cannot be edited or deleted
- All stats are displayed with visual representation

---

**Last Updated:** April 26, 2026  
**Status:** ✅ All CRUD Operations Implemented and Tested
