# 📚 At the End of the Shelf - Client

A React-based web client for managing book reviews with search functionality, powered by Kakao Book API.

## ✨ Features

### 🔍 Book Search
- Real-time book search using Kakao Book API
- Search by category (All / Title / Author / Publisher)
- Debounced search (800ms) to minimize API calls
- Sort results by relevance, title, author, or publication date
- Recent search history (up to 10 searches)

### ✍️ Review Management
- Create, edit, and delete book reviews
- Record book information (title, author, cover image)
- Rate books (1-5 stars) and track reading dates
- Real-time form validation with visual feedback
- Character limit (2,000 characters) with counter display
- Image URL validation with preview

### 📖 Gallery View
- Display all written reviews
- Statistics dashboard (total reviews, average rating, 5-star books, recent 30 days)
- Filter by rating (All / 4+ stars)
- Sort by newest, oldest, or rating

### 🎨 User Experience
- Light/Dark theme toggle
- Toast notification system
- Loading spinners and error messages
- Image fallback handling
- Responsive design

## 🛠️ Tech Stack

- **React** 19.1 - UI library
- **React Router** 7.6 - Client-side routing
- **Kakao Book API** - Book search functionality
- **localStorage** - Data persistence
- **CSS Modules** - Scoped styling

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Tycheon18/attheend-client.git
cd attheend-client
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Get your Kakao REST API key from [Kakao Developers](https://developers.kakao.com/) and add it to `.env`:
```
REACT_APP_KAKAO_API_KEY=your_kakao_rest_api_key_here
```

5. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── api/               # API utilities
├── components/
│   ├── Common/        # Reusable components (Toast, Loading, Error, ThemeToggle)
│   ├── Layout/        # Layout components (Header, Footer, Layout)
│   ├── List/          # Book search results list
│   ├── Pagination/    # Pagination component
│   ├── ReviewForm/    # Review creation form
│   ├── ReviewList/    # Review list display
│   └── Search/        # Search-related components
├── contexts/          # React contexts (ThemeContext)
├── pages/             # Page components
│   ├── Main.js        # Home page
│   ├── Search.js      # Search page
│   ├── New.js         # Create review
│   ├── Edit.js        # Edit review
│   └── Gallery.js     # Gallery view
├── utils/             # Utility functions
│   ├── recentSearchUtils.js  # Recent search management
│   └── sortUtils.js          # Sorting logic
└── App.js             # Main app component
```

## 🔑 Key Features

### State Management
- React Context API for global state
- useReducer hook for CRUD operations
- localStorage synchronization

### Routing
```
/ → Main page
/search → Book search
/new → Create review
/edit/:id → Edit review
/gallery → Review gallery
```

### Data Flow
```
User Action → dispatch(action) 
  → reducer(state, action) 
  → localStorage sync 
  → new state → UI update
```

## 🎯 Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## 🔗 Related Projects

- [attheend-server](https://github.com/Tycheon18/attheend-server) - Backend API server (Node.js/Express)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Tycheon18**
- GitHub: [@Tycheon18](https://github.com/Tycheon18)

## 🙏 Acknowledgments

- [Kakao Developers](https://developers.kakao.com/) - Book search API
- [Create React App](https://create-react-app.dev/) - React project setup
