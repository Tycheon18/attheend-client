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
- **Tailwind CSS** - Utility-first styling

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

3. Create `.env` file:
```
REACT_APP_KAKAO_API_KEY=your_kakao_rest_api_key_here
```

4. Start the development server:
```bash
npm start
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Common/        # Toast, Loading, ThemeToggle
│   ├── Layout/        # Layout, Navbar
│   ├── List/          # Book search results
│   ├── Pagination/    # Pagination
│   ├── ReviewForm/    # Review creation form
│   ├── ReviewList/    # Review display
│   ├── Search/        # Search components
│   └── ui/            # Reusable UI components
├── contexts/          # ThemeContext
├── pages/             # Page components
└── utils/             # Utility functions
```

## 🔗 Related Projects

- [attheend-server](https://github.com/Tycheon18/attheend-server) - Backend API server

## 📄 License

MIT License — **Tycheon18**
