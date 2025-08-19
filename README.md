# myTasks - Modern MERN Stack Task Management Application
<div align="center">
 <img src="https://img.shields.io/badge/myTasks-MERN%20Stack-8B5CF6?style=for-the-badge" alt="myTasks" />
 <img src="https://img.shields.io/badge/License-MIT-06B6D4?style=for-the-badge" alt="License" />
 <img src="https://img.shields.io/badge/React-18.0+-61DAFB?style=for-the-badge&logo=react" alt="React" />
 <img src="https://img.shields.io/badge/Node.js-Latest-339933?style=for-the-badge&logo=node.js" alt="Node.js" />
 <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb" alt="MongoDB" />
</div>

<div align="center">
<img src="https://github.com/user-attachments/assets/0156de29-82cf-442c-8c58-4f721882fdde" 
     alt="Image" 
     width="100%" />
</div>

## Project Overview

<div align="center">
  <img src="https://github.com/user-attachments/assets/ab68d646-2526-40f5-815b-b6db06458ec5" 
       alt="Image" 
       width="85%" />
</div>

**myTasks** is a comprehensive task management web application built with the MERN stack, representing a modern approach to productivity software development. The application embodies the philosophy of "Optimize Productivity, Maximize Impact" through its clean architecture, intuitive user interface, and robust functionality. This project demonstrates proficiency in full-stack JavaScript development while incorporating contemporary design principles and industry best practices.

The development process followed carefully planned iterations, progressing from initial MongoDB setup to advanced features like drag and drop functionality. Each phase focused on specific aspects of the application, ensuring systematic growth and maintainable code architecture. The result is a production ready application that showcases modern web development capabilities while solving real world productivity challenges

## Technical Architecture

### Backend Implementation
The server side architecture leverages **Node.js** with **Express.js** framework to create a scalable RESTful API. Database management utilizes **MongoDB Atlas** cloud services, integrated through **Mongoose ODM** for schema-based data modeling. The authentication system implements secure user sessions, complemented by **bcrypt** for password hashing.

**Core Backend Architecture:**
- **Express Server** - Runs on port 1000 with CORS enabled for cross-origin requests
- **MongoDB Atlas Integration** - Cloud NoSQL database with Mongoose ODM
- **RESTful API Design** - Organized routes: `/api/v1` (auth) and `/api/v2` (tasks)
- **Bcrypt Password Security** - Secure password hashing for user data protection
- **Middleware Implementation** - Request parsing, CORS, and error handling
- **Schema Validation** - Mongoose models with required fields and data types

### Frontend Development
The client-side application utilizes **React.js** with functional components and modern hooks API for efficient state management. **React Router** enables seamless single-page application navigation with protected routes and dynamic routing capabilities. **Redux** integration provides centralized state management for complex data flows and real-time updates.

**Frontend Technology Stack:**
- **React.js 19.1.0** - Latest React with modern component architecture
- **React Hooks** - useState, useEffect, useContext for state management
- **React Router 7.6.3** - SPA routing with protected routes and PrivateRoute component
- **Redux Toolkit 2.8.2** - Global state management with authActions
- **Axios 1.10.0** - HTTP client for API communication
- **React Toastify 11.0.5** - Professional notification system
- **React Icons 5.5.0** - Comprehensive icon library
- **CSS3 Advanced Features** - Flexbox, Grid, custom animations, and gradient designs
- **Session Storage** - Client-side token persistence
- **Responsive Design** - Mobile-first approach with Bootstrap classes

## Key Features & Functionality

### User Management System

<div align="center">
 <img src="https://github.com/user-attachments/assets/0665d10a-95d6-41d6-b1a5-50d4a1f22597" 
      alt="Image" 
      width="80%" />
</div>

The application provides secure user registration and authentication workflows with comprehensive form validation and error handling. Session management ensures persistent user sessions while maintaining security standards.

**Authentication Features:**
- **Secure Registration & Login** - Form validation and error handling
- **Password Security** - Bcrypt hashing and strength validation
- **Input Sanitization** - Protection against malicious inputs
- **Token Storage** - Secure client-side token management

### Task Management Capabilities

Core functionality centers around comprehensive CRUD operations for task management. Users can create detailed tasks with title and description fields, update task information in real time, mark tasks as complete or incomplete, and organize their workflow efficiently.

**Core Task Features:**
- **Complete CRUD Operations** - Create, Read, Update, Delete with real-time API calls
<div align="center">
  <img src="https://github.com/user-attachments/assets/0dc0221c-a3b1-41f5-893a-0ef86b567088" alt="Image 1" width="40%" />
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/6c3344b0-b2a4-4d78-ad5a-c65bf20ec3b0" alt="Image 3" width="40%" />
</div>

- **Task Completion Toggle** - isCompleted boolean field with instant UI updates
<div align="center">
 <img src="https://github.com/user-attachments/assets/cb9c9fc0-fc0b-454d-a3df-508eafa170a0" 
      alt="Image" 
      width="55%" />
</div>

- **Real-time Synchronization** - Optimistic UI updates with backend persistence
- **Task Order Management** - Drag & drop ordering with database sync
- **Detailed Task Structure** - Title and body fields with character validation
- **Session-based Operations** - All operations tied to authenticated user sessions
- **Error Recovery** - Automatic data refresh on API failures

### Advanced Interactive Features


<div align="center">
 <img src="https://github.com/user-attachments/assets/145fdd72-a0fc-4227-9195-cc89d3f6b6a2" 
      alt="Image" 
      width="70%" />
</div>

**Real-time Search System:**
- **Intelligent Word-based Filtering** - Searches both task titles and descriptions
- **Partial Word Matching** - Matches words starting with search query
- **Live Results Counter** - Displays number of found tasks dynamically
- **Clear Search Functionality** - Easy reset with visual clear button
- **Empty State Handling** - Elegant "no results" display with search term highlighting
  
<div align="center">
 <img src="https://github.com/user-attachments/assets/1fc515c2-8f3b-44e8-a6a6-c43d55963875" 
      alt="Image" 
      width="70%" />
</div>


**Professional Drag & Drop Interface:**
- **Visual Drag Feedback** - Smooth drag states with CSS classes
- **Drop Zone Indicators** - Clear visual feedback during drag operations
- **Order Persistence** - Automatic backend sync of task order via API
- **Touch-friendly Implementation** - Optimized for mobile devices
- **Collision Detection** - Precise drag-over and drop handling

**Comprehensive Notification System:**
- **React Toastify Integration** - Professional toast notifications
- **Contextual Messages** - Success, error, and info notifications
- **Action Feedback** - Confirmation for all CRUD operations
- **Error Handling** - User-friendly error messages for API failures
- **Auto-dismiss & Manual Control** - Flexible notification management

## Development Methodology

The project followed an iterative development approach across 30 distinct phases:

**Phase 1 (Setup & Backend Foundation):** MongoDB connection establishment, Mongoose schema design, and basic server configuration formed the foundation.

**Phase 2 (Authentication & API Development):** User authentication systems and RESTful API endpoints were developed with security considerations.

**Phase 3 (Frontend Architecture):** React application setup, component architecture design, and routing configuration established the client-side foundation.

**Phase 4 (UI/UX Implementation):** Interface design, responsive layouts, and interactive elements were crafted with attention to user experience principles.

**Phase 5 (Advanced Features):** Search functionality, drag-and-drop capabilities, and performance optimizations completed the feature set.

## Technical Highlights

### Performance Optimization
The application incorporates several performance enhancement strategies to ensure optimal user experience and system efficiency.

**Performance Features:**
- **Code Splitting** - Optimized bundle sizes for faster loading
- **Lazy Loading** - Components loaded on demand
- **Database Indexing** - Efficient query performance
- **Component Memoization** - React optimization techniques
- **Virtual DOM Efficiency** - Smooth user interactions

### Security Implementation
Security measures ensure data integrity and user privacy protection across all application layers.

**Security Measures:**
- **Password Hashing** - Bcrypt implementation for data protection
- **Input Validation & Sanitization** - Prevention of malicious inputs
- **CORS Policy Configuration** - Secure cross-origin requests
- **Environment Variable Protection** - Sensitive data security

### Responsive Design Excellence
Mobile-first design principles ensure optimal functionality across all device types and screen sizes.

**Responsive Features:**
- **Mobile-First Approach** - Optimized for mobile devices primarily
- **CSS Media Queries** - Adaptive layouts for different screens
- **Flexible Layouts** - Fluid design elements
- **Touch-Friendly Interface** - Optimized for mobile interactions
- **Cross-Device Consistency** - Uniform experience across platforms

## Project Structure
```
MERN-TODO/
├── .dist/                        # Build outputs
├── backend/                      # Server-side application
│   ├── conn/
│   │   └── conn.js               # Database connection configuration
│   ├── models/                   # Mongoose schema definitions
│   │   ├── list.js               # Task model schema with completion & order fields
│   │   └── user.js               # User model schema with email/username fields
│   ├── routes/                   # API endpoint definitions
│   │   ├── auth.js               # Authentication routes (/api/v1)
│   │   └── list.js               # Task CRUD operations (/api/v2)
│   ├── app.js                    # Express server setup (Port 1000)
│   ├── package.json              # Backend dependencies
│   └── package-lock.json         # Backend lock file
├── frontend/                     # Client-side React application
│   ├── public/                   # Static assets
│   │   ├── favicon.ico           # Site icon
│   │   ├── index.html            # HTML template
│   │   ├── logo192.png           # PWA logos
│   │   ├── logo512.png
│   │   ├── manifest.json         # PWA manifest
│   │   └── robots.txt            # SEO configuration
│   └── src/                      # React source code
│       ├── components/           # Component library
│       │   ├── about/            # About page components
│       │   │   ├── About.jsx
│       │   │   └── about.css
│       │   ├── footer/           # Footer components
│       │   │   ├── Footer.jsx
│       │   │   └── Footer.css
│       │   ├── home/             # Landing page components
│       │   │   ├── Home.jsx
│       │   │   └── home.css
│       │   ├── navbar/           # Navigation components
│       │   │   ├── Navbar.jsx
│       │   │   └── Navbar.css
│       │   ├── signup/           # Authentication components
│       │   │   ├── HeadingComp.jsx
│       │   │   ├── SignIn.jsx
│       │   │   ├── Signup.jsx
│       │   │   └── signup.css
│       │   └── todo/             # Task management components
│       │       ├── Todo.jsx      # Main todo interface with search & drag-drop
│       │       ├── TodoCards.jsx # Individual task card component
│       │       ├── Update.jsx    # Task update modal
│       │       └── todo.css      # Todo styling
│       ├── store/                # Redux state management
│       │   └── index.js          # Auth state management
│       ├── App.js                # Main React component with routing
│       ├── App.css               # Global application styles
│       ├── index.js              # React DOM entry point
│       └── index.css             # Base CSS styles
│   ├── package.json              # Frontend dependencies
│   └── package-lock.json         # Frontend lock file
├── node_modules/                 # Root dependencies
├── .env                          # Environment variables
├── .gitignore                    # Git ignore rules
├── LICENSE                       # Project license
├── package.json                  # Root package configuration
├── package-lock.json             # Root lock file
└── README.md                     # Project documentation
```

## Installation & Setup

### Prerequisites
- Node.js (v16.0 or higher)
- npm or yarn package manager
- MongoDB Atlas account
- Git version control

### Environment Configuration
Create a `.env` file in the backend directory:
```bash
MONGODB_URI=your_mongodb_atlas_connection_string
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies (Express, Mongoose, JWT, bcrypt, CORS, Nodemon)
npm install

# Start development server with hot reload
npx nodemon app.js

# Alternative: If configured in package.json
npm start
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (React 19.1, Redux Toolkit, Axios, React Router)
npm install

# Start development server on port 3000
npm start
```

### Development URLs
- **Frontend Application:** `http://localhost:3000`
- **Backend API Server:** `http://localhost:1000`
- **API Base Routes:** 
  - Authentication: `/api/v1` (register, signin)
  - Tasks: `/api/v2` (getTasks, addTask, updateTask, deleteTask, toggleComplete)

## Deployment & Production

The application is production-ready with Vercel deployment configuration for the frontend and cloud database integration through MongoDB Atlas. Environment variable management, error logging, and continuous deployment pipelines ensure reliable production performance.

## Conclusion

myTasks represents a comprehensive demonstration of modern full-stack JavaScript development, showcasing proficiency in MERN stack technologies while implementing industry best practices for security, performance, and user experience. The project exemplifies the ability to deliver production quality applications that balance functionality with aesthetic excellence.

---

**Stack:** React.js • Node.js • Express.js • MongoDB • Redux
