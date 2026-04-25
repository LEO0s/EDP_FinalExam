// CRUD Operations Test Suite for Pokédex Application
// Run this in browser console or with Node.js test runner

const API_BASE = 'http://localhost:5000/api';

// Test data
const testPokemon = {
  name: 'TestMon',
  abilities: ['test-ability', 'hidden-ability'],
  baseExperience: 100,
  weight: 50,
  height: 20,
  description: 'A test Pokémon for CRUD operations',
  sprite: 'https://via.placeholder.com/96'
};

// Helper function to make API calls
async function apiCall(method, endpoint, data = null) {
  const config = {
    method,
    headers: { 'Content-Type': 'application/json' }
  };
  
  if (data) {
    config.body = JSON.stringify(data);
  }
  
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, config);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`API Error [${method} ${endpoint}]:`, error.message);
    throw error;
  }
}

// TEST 1: READ - Get list of 30 Pokémon
async function testRead1_GetList() {
  console.log('\n🧪 TEST 1: READ - Get Pokémon List');
  try {
    const result = await apiCall('GET', '/pokemon');
    console.log(`✅ PASS - Retrieved ${result.length} Pokémon`);
    console.log('Sample:', result.slice(0, 3));
    return result;
  } catch (error) {
    console.log('❌ FAIL - Could not fetch list');
    return null;
  }
}

// TEST 2: READ - Get detailed info about a Pokémon
async function testRead2_GetDetails(pokemonId) {
  console.log('\n🧪 TEST 2: READ - Get Pokémon Details');
  try {
    const result = await apiCall('GET', `/pokemon/${pokemonId}`);
    console.log(`✅ PASS - Retrieved details for ${result.name}`);
    console.log(`   Name: ${result.name}`);
    console.log(`   Height: ${result.height}dm`);
    console.log(`   Weight: ${result.weight}hg`);
    console.log(`   Stats: ${result.stats ? result.stats.length : 0} entries`);
    console.log(`   Abilities: ${result.abilities ? result.abilities.join(', ') : 'None'}`);
    return result;
  } catch (error) {
    console.log('❌ FAIL - Could not fetch details');
    return null;
  }
}

// TEST 3: CREATE - Create a custom Pokémon
async function testCreate_AddPokemon() {
  console.log('\n🧪 TEST 3: CREATE - Add Custom Pokémon');
  try {
    const result = await apiCall('POST', '/pokemon', testPokemon);
    console.log(`✅ PASS - Created Pokémon: ${result.name}`);
    console.log(`   ID: ${result.id}`);
    console.log(`   Abilities: ${result.abilities.join(', ')}`);
    console.log(`   Custom: ${result.isCustom}`);
    return result;
  } catch (error) {
    console.log('❌ FAIL - Could not create Pokémon');
    return null;
  }
}

// TEST 4: UPDATE - Edit a custom Pokémon
async function testUpdate_EditPokemon(pokemonId) {
  console.log('\n🧪 TEST 4: UPDATE - Edit Custom Pokémon');
  const updateData = {
    name: 'UpdatedTestMon',
    description: 'Updated description for test',
    weight: 75,
    height: 25,
    baseExperience: 150,
    abilities: ['updated-ability']
  };
  
  try {
    const result = await apiCall('PATCH', `/pokemon/${pokemonId}`, updateData);
    console.log(`✅ PASS - Updated Pokémon: ${result.name}`);
    console.log(`   New Name: ${result.name}`);
    console.log(`   New Weight: ${result.weight}hg`);
    console.log(`   New Height: ${result.height}dm`);
    console.log(`   New Base Experience: ${result.baseExperience}`);
    return result;
  } catch (error) {
    console.log('❌ FAIL - Could not update Pokémon');
    return null;
  }
}

// TEST 5: DELETE - Remove a custom Pokémon
async function testDelete_RemovePokemon(pokemonId) {
  console.log('\n🧪 TEST 5: DELETE - Remove Custom Pokémon');
  try {
    const result = await apiCall('DELETE', `/pokemon/${pokemonId}`);
    console.log(`✅ PASS - Deleted Pokémon`);
    console.log(`   Message: ${result.message}`);
    console.log(`   Deleted: ${result.pokemon.name}`);
    return result;
  } catch (error) {
    console.log('❌ FAIL - Could not delete Pokémon');
    return null;
  }
}

// TEST 6: Verify localStorage persistence
async function testLocalStoragePersistence() {
  console.log('\n🧪 TEST 6: localStorage Persistence');
  try {
    const stored = localStorage.getItem('pokedex_custom_pokemon');
    if (stored) {
      const data = JSON.parse(stored);
      console.log(`✅ PASS - Found ${data.length} custom Pokémon in localStorage`);
      console.log('   Data:', data);
      return true;
    } else {
      console.log('⚠️ WARNING - No custom Pokémon in localStorage yet');
      return false;
    }
  } catch (error) {
    console.log('❌ FAIL - Could not access localStorage');
    return false;
  }
}

// Run all tests
async function runAllTests() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('🚀 POKÉDEX CRUD OPERATIONS TEST SUITE');
  console.log('═══════════════════════════════════════════════════════');
  
  try {
    // 1. Read list
    const pokemonList = await testRead1_GetList();
    if (!pokemonList || pokemonList.length === 0) {
      console.log('Cannot proceed - no Pokémon list');
      return;
    }
    
    // 2. Read details
    const firstPokemon = pokemonList[0];
    await testRead2_GetDetails(firstPokemon.id);
    
    // 3. Create
    const created = await testCreate_AddPokemon();
    if (!created) {
      console.log('Cannot proceed - creation failed');
      return;
    }
    
    // 4. Update
    const updated = await testUpdate_EditPokemon(created.id);
    if (!updated) {
      console.log('Cannot proceed - update failed');
      return;
    }
    
    // 5. Delete
    await testDelete_RemovePokemon(created.id);
    
    // 6. Check localStorage
    await testLocalStoragePersistence();
    
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('✨ ALL TESTS COMPLETED ✨');
    console.log('═══════════════════════════════════════════════════════\n');
    
  } catch (error) {
    console.error('Test suite error:', error);
  }
}

// Export for use in Node.js or browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    runAllTests,
    testRead1_GetList,
    testRead2_GetDetails,
    testCreate_AddPokemon,
    testUpdate_EditPokemon,
    testDelete_RemovePokemon,
    testLocalStoragePersistence
  };
}

// If running in browser, you can call: runAllTests()
