# Testing Checklist for Pokédex Application

## Prerequisites
- Backend running on `http://localhost:5000`
- Frontend running on `http://localhost:3000`
- Browser open with frontend

---

## READ Operations ✓

### 1. Homepage (Pokémon List)
- [ ] App loads without errors
- [ ] 30 Pokémon display in a grid
- [ ] Each Pokémon shows name and sprite image
- [ ] Pokémon are clickable

### 2. Pokémon Details View
- [ ] Clicking a Pokémon shows details on the right panel
- [ ] Display: Name, image, height, weight, base experience
- [ ] Display: Stats with visual bars
- [ ] Display: Abilities as tags
- [ ] Display: Description/flavor text
- [ ] Display: Audio player for cry (if available)

---

## CREATE Operations ✓

### 3. Create Custom Pokémon
- [ ] Click "+ Add New Pokémon" button
- [ ] Form appears with all required fields:
  - [ ] Name
  - [ ] Abilities (comma-separated)
  - [ ] Base Experience
  - [ ] Weight
  - [ ] Height
  - [ ] Description
  - [ ] Sprite URL (optional)
  - [ ] Stats sliders (6 stats with ranges)
- [ ] Fill in all required fields
- [ ] Click "Create Pokémon"
- [ ] Success alert appears
- [ ] New Pokémon appears in the list with "Custom" badge
- [ ] Can click on new Pokémon to view details

---

## UPDATE/EDIT Operations ✓

### 4. Edit Custom Pokémon
- [ ] Select a custom Pokémon (has "Custom" badge)
- [ ] Click "✏️ Edit" button
- [ ] Edit form appears with current values
- [ ] Form fields:
  - [ ] Name (editable)
  - [ ] Description (editable)
  - [ ] Abilities (editable)
  - [ ] Weight (editable)
  - [ ] Height (editable)
  - [ ] Base Experience (editable)
- [ ] Modify at least one field
- [ ] Click "Save Changes"
- [ ] Success alert appears
- [ ] Changes reflected in details view
- [ ] Changes reflected in list view

---

## DELETE Operations ✓

### 5. Delete Custom Pokémon
- [ ] Select a custom Pokémon
- [ ] Click "🗑️ Delete" button
- [ ] Confirmation dialog appears
- [ ] Click "OK" to confirm
- [ ] Success alert appears
- [ ] Pokémon removed from list
- [ ] Details panel shows "Select a Pokémon"

---

## API Integration Tests ✓

### 6. Backend API Endpoints
- [ ] `GET /api/pokemon` - Returns list with 30+ Pokémon
- [ ] `GET /api/pokemon/{id}` - Returns detailed data
- [ ] `POST /api/pokemon` - Creates new entry
- [ ] `PATCH /api/pokemon/{id}` - Updates entry
- [ ] `DELETE /api/pokemon/{id}` - Removes entry

---

## UI/UX Tests ✓

### 7. User Interface
- [ ] Layout is responsive (left panel + right panel)
- [ ] Buttons are clearly visible and clickable
- [ ] Colors are consistent
- [ ] Text is readable
- [ ] No console errors (check DevTools)

### 8. Data Persistence
- [ ] Custom Pokémon persist during session
- [ ] Can perform multiple CRUD operations
- [ ] List updates correctly after each operation

---

## Edge Cases

### 9. Error Handling
- [ ] Try creating Pokémon without required fields
- [ ] Try deleting while offline
- [ ] Try invalid sprite URLs
- [ ] Verify error messages appear

---

## Test Scenarios

**Scenario 1: Full CRUD Cycle**
1. Create a Pokémon named "TestMon"
2. View its details
3. Edit the description
4. Delete it

**Scenario 2: Multiple Pokémon**
1. Create 3 custom Pokémon
2. Switch between viewing each
3. Edit one
4. Delete one
5. Verify 2 remain

**Scenario 3: API Integration**
1. Start backend - should fetch 30 PokéAPI Pokémon
2. Create custom Pokémon - should appear alongside PokéAPI ones
3. Total in list should be 30 + (custom count)

---

## Notes
- Original PokéAPI Pokémon should NOT be editable/deletable
- Custom Pokémon should have "Custom" badge
- Stats should have visual representation
- All Pokémon should be selectable
