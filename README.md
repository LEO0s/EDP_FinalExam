# 🔴 Pokédex Web Application 🔴

A full-stack Pokédex application built with Express.js (backend) and React (frontend). Users can browse 30 official Pokémon from PokéAPI and create, read, update, and delete custom Pokémon entries.

## 📋 Project Structure

```
pokédex-app/
├── pokedex-backend/          # Express.js API server
│   ├── server.js
│   ├── package.json
│   └── README.md
├── pokedex-frontend/         # React web application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
├── .gitignore
├── QUICK_REFERENCE.md
├── SETUP_GUIDE.md
├── TESTING_CHECKLIST.md
├── CRUD_TEST.js
├── FINAL_SUMMARY.md
├── VERIFICATION.md
└── README.md (this file)
```

## 🚀 Quick Start

### Prerequisites
- Node.js 12+ and npm installed
- Ports 5000 and 3000 available

### Backend Setup
```bash
cd pokedex-backend
npm install
npm start
```
Server runs on `http://localhost:5000`

### Frontend Setup
```bash
cd pokedex-frontend
npm install
npm start
```
App opens at `http://localhost:3000`

## ✨ Features

- **Browse Pokémon**: View 30 official Pokémon from PokéAPI
- **View Details**: Click to see comprehensive Pokémon information
- **Create**: Add custom Pokémon with custom stats
- **Edit**: Modify custom Pokémon details
- **Delete**: Remove any Pokémon (official or custom)
- **Persistent**: Custom Pokémon saved in browser localStorage
- **Responsive**: Works on desktop and tablet

## 📚 Documentation

- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Quick start guide
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Detailed setup and testing
- [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md) - Test cases
- [CRUD_TEST.js](CRUD_TEST.js) - Automated test suite
- [FINAL_SUMMARY.md](FINAL_SUMMARY.md) - Project overview

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/pokemon` | Get all Pokémon (30 + custom) |
| GET | `/api/pokemon/:id` | Get Pokémon details |
| POST | `/api/pokemon` | Create custom Pokémon |
| PATCH | `/api/pokemon/:id` | Update custom Pokémon |
| DELETE | `/api/pokemon/:id` | Delete Pokémon (any) |

## 🧪 Testing

### Manual Testing
Follow the checklist in [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md)

### Automated Testing
1. Open `http://localhost:3000`
2. Open DevTools (F12 → Console)
3. Copy contents of `CRUD_TEST.js`
4. Run: `runAllTests()`

## 🛠 Technology Stack

- **Backend**: Express.js, Node.js, Axios
- **Frontend**: React, Axios
- **Storage**: Browser localStorage
- **API**: PokéAPI v2
- **Version Control**: Git

## 📝 CRUD Operations

✅ **CREATE** - Add custom Pokémon  
✅ **READ** - View Pokémon list and details  
✅ **UPDATE** - Edit custom Pokémon  
✅ **DELETE** - Remove any Pokémon  

## 💾 Data Persistence

- Custom Pokémon stored in browser localStorage
- Survives page refreshes
- Survives browser restarts
- Automatically synced to backend on app load

## 📄 License

Educational project for IT 2241: Event-Driven Programming

## 👨‍💻 Development

Both backend and frontend are fully functional and tested. All CRUD operations work seamlessly with the PokéAPI integration.

For detailed information, see the individual README files in each directory.

---

**Status**: ✅ Complete and Ready for Deployment
