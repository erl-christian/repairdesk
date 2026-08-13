# RepairDesk Bohol - Web Application

Welcome to the web application for RepairDesk Bohol! This is a modern, full-stack solution designed to streamline the management of device repair requests. It provides a user-friendly interface for customers to submit and track their repairs, and a comprehensive admin dashboard for staff to manage the entire repair lifecycle from submission to completion.

## ✨ Features

The application is split into two main user-facing parts: a public interface for customers and a protected admin area.

### 🧍 Customer-Facing Features

- **Submit Repair Requests**: A simple and intuitive form for customers to submit new repair requests for their devices.
- **Track Repair Status**: A public tracking page where customers can enter their ticket number to view the current status of their repair.

### 🔐 Admin Features

- **Secure Authentication**: Admins can log in securely to access the management dashboard.
- **Dashboard Overview**: A central dashboard to view key metrics and recent activities (feature to be expanded).
- **Comprehensive Repair Management**:
  - View a paginated list of all repair requests.
  - Search for specific requests by customer name, device, etc.
  - Filter requests by their current status (e.g., `Pending`, `In Progress`, `Completed`).
- **Detailed Request View**: A modal view provides all details for a specific repair, including:
  - Customer and device information.
  - The reported problem description.
  - Service details like preferred date/time.
- **Status Updates**: Easily update the status of a repair request, which notifies the customer.
- **Internal Repair Notes**: Add and view internal notes for each repair, visible only to admins.
- **Repair Timeline**: A chronological timeline that logs every status change and significant event for a repair request.

## 🚀 Tech Stack

This project is built with a modern, robust, and scalable technology stack.

- **Frontend**: React & TypeScript
- **Framework**: Vite (assumed based on modern setup)
- **Routing**: React Router DOM
- **UI Components**: shadcn/ui - A collection of beautifully designed, accessible, and customizable components.
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Server State Management**: React Query for data fetching, caching, and synchronization.
- **Global State (Auth)**: React Context API

## 📂 Project Structure

The `apps/web/src` directory is organized using a feature-sliced approach to promote modularity and scalability.

```
apps/web/src/
├── api/            # API client setup (e.g., Axios instance)
├── components/     # Shared, reusable UI components (e.g., Button, Input)
│   ├── layout/     # Layout components like Sidebar
│   └── ui/         # shadcn/ui components
├── constants/      # Application-wide constants (e.g., page titles)
├── features/       # Core application features, each as a module
│   ├── auth/       # Authentication logic, components, and hooks
│   ├── dashboard/  # Dashboard page components
│   ├── repair-note/ # Repair notes feature
│   └── repair-request/ # Repair request management feature
├── hooks/          # Global custom hooks
├── layouts/        # Main page layouts (AdminLayout, PublicLayout)
├── lib/            # Utility functions
├── pages/          # Standalone pages (e.g., Homepage)
└── routes/         # Routing configuration and route guards
```

### Key Architectural Concepts

- **Feature-Sliced Design**: Code is organized by business features (`auth`, `repair-request`) rather than by type (`components`, `hooks`). This makes the codebase easier to navigate and maintain as it grows.
- **Server State with React Query**: Instead of using a global state manager like Redux for server data, we leverage React Query. It handles caching, background refetching, and data mutations, leading to a more resilient and performant UI.
- **Authentication Flow**: The `AuthProvider` (`features/auth/AuthProvider.tsx`) uses React Context to provide authentication state (`user`, `token`, `isAuthenticated`) to the entire app. `ProtectedRoutes.tsx` and `PublicRoute.tsx` use this context to guard access to different parts of the application.
- **Component-Based UI**: The UI is built from small, reusable components, primarily from the `shadcn/ui` library, ensuring a consistent and high-quality user experience.

## 🏁 Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later recommended)
- pnpm (or npm/yarn)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd repairdesk-bohol
    ```

2.  **Install dependencies:**

    This is a monorepo, so you should install dependencies from the root directory.

    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the `apps/web` directory by copying the example file:

    ```bash
    cp apps/web/.env.example apps/web/.env
    ```

    Now, open `apps/web/.env` and fill in the required environment variables, such as the backend API URL.

    ```env
    VITE_API_BASE_URL=http://localhost:3000/api
    ```

4.  **Run the development server:**

    From the root of the monorepo, run the web application:

    ```bash
    pnpm --filter web dev
    ```

    The application should now be running on http://localhost:5173.

## 주요 컴포넌트 및 로직

- **`AppRoutes.tsx`**: Defines all public, protected, and authentication routes using `react-router-dom`. This is the entry point for all page-level navigation.
- **`AuthProvider.tsx`**: Manages the user's authentication state, including the JWT. It performs initial validation of the token stored in `localStorage` to check for expiration.
- **`RepairRequestsPage.tsx`**: The main page for admins. It demonstrates the use of the `useRepairRequests` hook from React Query to fetch, paginate, and filter data. It also manages local UI state for search queries and filters.
- **`RepairRequestDetailsModal.tsx`**: A powerful component that showcases how to aggregate data from multiple async hooks (`useRepairRequest`, `useRepairTimeline`) into a single, cohesive view. It also composes several sub-features like `RepairNotesSection` and `RepairRequestStatusActions`.
- **`LoginPage.tsx`**: Handles the admin login form. On successful submission, it calls the `login` function from `useAuth` to update the global state and stores the token, redirecting the user to the admin dashboard.

---

This README provides a high-level overview of the project. For more detailed information, please refer to the source code and inline comments.
