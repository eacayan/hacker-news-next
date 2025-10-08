# Hacker News Next.js Application

A modern web application built with Next.js 15 that displays and sorts 10 random Hacker News stories with a clean, responsive interface.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Implementation Details](#implementation-details)
- [API Documentation](#api-documentation)

## Features

- Display top Hacker News stories with random selection
- Sort stories by score or author karma
- Responsive grid layout
- Clean, modern UI with SCSS modules
- Comprehensive test coverage
- Server-side rendering with Next.js App Router
- Dynamic image generation for story cards

## Tech Stack

### Core Framework (Boilerplate)

- **Next.js 15+** - App Router
- **React 18+**
- **TypeScript**

### Features (Original Implementation)

- **Page routes**
- **Individual components**
- **Hooks and utilities**

### Styling (Original Implementation)

- **SCSS Modules**
- Custom styling for all components

### Testing (Original Implementation)

- **Jest** - Testing framework
- **React Testing Library** - Component testing
- **@testing-library/user-event** - User interaction testing
- **@testing-library/jest-dom** - Custom matchers

### External APIs (Boilerplate)

- **Hacker News API** - Data source

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```
git clone <repository-url>
cd hacker-news-next
```

2. Install dependencies

```
npm run install
```

3. Run development server

```
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
hacker-news-next/
├── app/
│   ├── story/
│   │   └── [id]/
│   │       ├── loading.tsx
│   │       ├── page.tsx
│   │       ├── page.module.scss
│   │       └── page.test.tsx
│   ├── favicon.ico
│   ├── globals.scss
│   ├── layout.tsx
│   ├── layout.module.scss
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── not-found.module.scss
│   ├── page.tsx
│   ├── page.module.scss
│   └── page.test.tsx
│
├── components/
│   ├── Loader/
│   │   ├── Loader.tsx
│   │   └── Loader.module.scss
│   ├── SortControls/
│   │   ├── SortControls.tsx
│   │   ├── SortControls.module.scss
│   │   └── SortControls.test.tsx
│   ├── StoryCard/
│   │   ├── StoryCard.tsx
│   │   ├── StoryCard.module.scss
│   │   └── StoryCard.test.tsx
│   ├── StoryGrid/
│   │   ├── StoryGrid.tsx
│   │   ├── StoryGrid.module.scss
│   │   └── StoryGrid.test.tsx
│   └── index.ts
│
├── hooks/
│   └── useStorySort/
│       ├── useStorySort.ts
│       └── useStorySort.test.ts
│
├── lib/
│   ├── api.ts
│   ├── mocks.ts
│   └── utils.ts
│
├── mocks/
│   ├── index.ts
│   └── mockStories.ts
|
├── styles/
│   └── variables.scss
│
├── types/
│   └── index.ts
│
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── jest.config.mjs
├── jest.setup.js
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

## Implementation Details

### Original Implementations

#### 1. **API Client (`lib/api.ts`)**

- Fetches data from Hacker News API

#### 2. **Custom Hook: `useStorySort`**

- Supports sorting by score and author karma

#### 3. **Components**

**SortControls**

- Dropdown select component for sorting by score or karma

**StoryCard**

- Displays individual story information
- Links to story detail page

**StoryGrid**

- Layout component with sorting integration

**Loader**

- Reusable loading component
- Used across multiple routes

#### 4. **Pages**

**Home Page (`app/page.tsx`)**

- Server component that fetches random stories
- Passes data to client components

**Story Detail Page (`app/story/[id]/page.tsx`)**

- Dynamic route for individual stories
- Calls `notFound()` for missing stories
- Server-side data fetching with error handling

**Loading States**

- Global loading component (app/loading.tsx)
- Story-specific loading (app/story/[id]/loading.tsx)

**404 Error Page (app/not-found.tsx)**

- Custom 404 page

#### 5. **Utilities (`lib/utils.ts`) and Types (`types/index.ts`)**

- Global types and helper functions

#### 6. **Styling**

- All SCSS modules are original
- Global styles and variables
- Responsive design with mobile-first approach

#### 7. **Testing Infrastructure**

- Jest configuration with Next.js integration
- Custom mocks for Next.js components
- Reusable mock data (`lib/mocks.ts`)

#### 8. **Linting Setup**

- ESLint and Prettier configuration

### Boilerplate from Next.js/Dependencies

1.  **Next.js App Router Structure**
    - `app/` directory structure
    - `layout.tsx` and `page.tsx` naming convention
    - File-based routing
2.  **Configuration Files**
    - `next.config.ts` - Default Next.js configuration
    - `next-env.d.ts` - Auto-generated TypeScript declarations
    - Base `tsconfig.json` structure
3.  **Dependencies**
    - `next` - Framework
    - `react` and `react-dom` - UI library
    - Standard Next.js peer dependencies

## API Documentation

### Hacker News API

**Base URL**: `https://hacker-news.firebaseio.com/v0`

#### Endpoints Used

```
// Get top story IDs
GET /topstories.json

// Get story details
GET /item/{id}.json

// Get user details
GET /user/{username}.json
```
