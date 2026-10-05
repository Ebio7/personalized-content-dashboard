# Personalized Content Dashboard

A modern, interactive dashboard application built with Next.js, TypeScript, Redux Toolkit, and Tailwind CSS. The dashboard provides users with a personalized content feed from multiple sources including news, movies, and social media posts.

## Features

### Core Features
- **Personalized Content Feed**: Users can configure their content preferences (technology, sports, finance, movies, social media) from a settings panel
- **Multi-Source Content Integration**: Fetches content from mock APIs simulating News API, TMDB API, and Social Media API
- **Interactive Content Cards**: Display cards with images, headlines, descriptions, and action buttons
- **Infinite Scrolling**: Efficient content loading with pagination
- **Trending Section**: Displays top trending items across categories
- **Favorites System**: Users can bookmark and view their favorite content
- **Search Functionality**: Debounced search across all content types

### Advanced UI/UX Features
- **Drag-and-Drop**: Reorder content cards using React DnD
- **Dark Mode**: Toggle between light and dark themes with persistent preferences
- **Smooth Animations**: Framer Motion animations for transitions and interactions
- **Responsive Design**: Fully responsive layout that works on all screen sizes
- **Modern Dashboard Layout**: Sidebar navigation with header search bar

### State Management
- **Redux Toolkit**: Global state management for preferences, content, favorites, and search
- **Redux Persist**: Persistent storage of user preferences and favorites using localStorage
- **Async Data Fetching**: Redux Thunks for handling API calls and loading states

### Testing
- **Unit Tests**: Jest and React Testing Library for component and utility testing
- **Integration Tests**: Testing Redux slices and state management
- **E2E Tests**: Playwright for critical user flows (navigation, search, favorites, dark mode)

## Tech Stack

- **Frontend**: React 19, Next.js 16
- **Language**: TypeScript
- **State Management**: Redux Toolkit, Redux Persist
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Drag & Drop**: @hello-pangea/dnd
- **Testing**: Jest, React Testing Library, Playwright
- **HTTP Client**: Axios

## Project Structure

```
personalized-content-dashboard/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── layout.tsx      # Root layout with providers
│   │   ├── page.tsx        # Main dashboard page
│   │   └── globals.css     # Global styles
│   ├── components/          # React components
│   │   ├── dashboard/      # Dashboard sections
│   │   ├── layout/         # Layout components (Sidebar, Header)
│   │   ├── ui/             # Reusable UI components
│   │   └── Providers.tsx  # Redux and theme providers
│   ├── store/              # Redux store configuration
│   │   ├── slices/         # Redux slices
│   │   ├── thunks/         # Async thunks
│   │   ├── hooks.ts        # Typed hooks
│   │   └── store.ts        # Store configuration
│   ├── services/           # API services
│   │   ├── newsService.ts
│   │   ├── movieService.ts
│   │   ├── socialService.ts
│   │   └── apiService.ts
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   └── __tests__/          # Test files
│       ├── components/
│       ├── store/
│       └── utils/
├── e2e/                    # Playwright E2E tests
├── public/                 # Static assets
└── Configuration files     # jest.config.js, playwright.config.ts, etc.
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd personalized-content-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run e2e` - Run E2E tests with Playwright
- `npm run e2e:ui` - Run E2E tests with Playwright UI

## User Guide

### Navigation
- Use the sidebar to navigate between Feed, Trending, Favorites, and Settings
- Click on section names to switch views

### Personalizing Your Feed
1. Go to Settings
2. Select/deselect content categories (Technology, Sports, Finance, Movies, Social Media)
3. Return to Feed to see personalized content

### Search
- Use the search bar in the header to search across all content types
- Search is debounced for optimal performance

### Favorites
- Click the heart icon on any content card to add it to favorites
- Access your favorites from the sidebar

### Dark Mode
- Toggle dark mode from the sidebar or Settings
- Preference is saved automatically

### Load More Content
- Click "Load More" at the bottom of the feed to load additional content
- Infinite scrolling is implemented for efficient content loading

## Testing

### Unit Tests
Run unit tests for components, Redux slices, and utilities:
```bash
npm test
```

### E2E Tests
Run end-to-end tests with Playwright:
```bash
npm run e2e
```

For a visual test runner:
```bash
npm run e2e:ui
```

## Environment Variables

Create a `.env.local` file in the root directory for local development:

```env
# API Keys (Optional - Currently using mock APIs)
# Uncomment and add your API keys to use real APIs

# News API Key (https://newsapi.org/)
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key_here

# TMDB API Key (https://www.themoviedb.org/)
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here

# Application Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

**Note**: The `.env.local` file is already in `.gitignore` to protect your API keys. Never commit files containing sensitive information.

## API Integration

The application currently uses mock APIs for demonstration purposes. To integrate with real APIs:

1. Add your API keys to `.env.local` as shown above
2. Update the service files in `src/services/` to use real API endpoints
3. Replace mock data with actual API calls

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy with default settings

### Other Platforms
Build the project and deploy the `.next` folder:
```bash
npm run build
```

## Performance Optimizations

- Debounced search to reduce API calls
- Infinite scrolling for efficient content loading
- Redux Persist for state persistence
- Optimized re-renders with React.memo where applicable
- Code splitting with Next.js

## Accessibility

- Semantic HTML elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast compliance
- Focus management

## Future Enhancements

- User authentication with NextAuth.js
- Real-time updates with WebSockets
- Multi-language support with react-i18next
- More content sources and integrations
- Advanced filtering and sorting options
- User profiles and activity tracking

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## License

This project is created for demonstration purposes.

## Contact

For questions or feedback, please open an issue in the repository.
