# 🔧 RepairDesk

### Online Computer & Device Repair Request Management System

RepairDesk is a full-stack web application designed to simplify the process of submitting, managing, and tracking device repair requests.

The system provides a public-facing interface where customers can submit repair requests and track their repair status, while administrators have a protected dashboard for managing requests, updating repair statuses, viewing repair details, and monitoring the repair timeline.

> 🚧 **Project Status:** Completed / Portfolio Project  
> 🌐 **Deployment:** Not currently deployed  
> 📍 **Initial Scope:** Bohol, Philippines

---

## ✨ Features

RepairDesk Bohol is divided into two main areas:

- 👤 Customer-facing system
- 🔐 Administrator dashboard

---

# 👤 Customer Features

### 📝 Submit a Repair Request

Customers can submit a repair request by providing:

- Customer name
- Phone number
- Email address
- Device type
- Device brand
- Device model
- Problem description
- Preferred service method
- Municipality
- Preferred date
- Preferred time

After submission, the system automatically generates a unique public ticket number.

Example:

```text
RD-BHL-2026-8105
```

Customers can use this ticket number together with their phone number to track their repair.

### 🔎 Repair Tracking

Customers can track their repair without creating an account.

They only need:

```text
Ticket Number
+
Phone Number
```

The tracking page displays:

- Ticket number
- Customer information
- Device information
- Problem description
- Service method
- Municipality
- Preferred schedule
- Current repair status
- Repair timeline
- Customer-visible repair notes

---

# 🔐 Administrator Features

### 🔑 Admin Authentication

Administrators have a protected login system.

Admin-only pages are protected using route guards so unauthorized users cannot access the dashboard.

### 📊 Dashboard

The admin dashboard provides an overview of repair activity and gives administrators a central place to monitor repair requests.

### 🛠️ Repair Request Management

Administrators can:

- View repair requests
- Search repair requests
- Filter requests by status
- Navigate through paginated results
- Open detailed repair information
- Update repair statuses

Supported repair statuses:

```text
PENDING_REVIEW
ACCEPTED
IN_PROGRESS
WAITING_PARTS
READY_FOR_PICKUP
COMPLETED
CANCELLED
```

### 📋 Repair Request Details

Administrators can open a detailed view of a repair request containing:

#### Customer Information

- Name
- Phone number
- Email
- Municipality

#### Device Information

- Device type
- Brand
- Model

#### Service Information

- Service method
- Preferred date
- Preferred time

#### Repair Information

- Problem description
- Current status
- Repair timeline
- Internal repair notes

### 🔄 Repair Status Management

Administrators can update the status of a repair directly from the repair details interface.

Example workflow:

```text
PENDING_REVIEW
      ↓
  ACCEPTED
      ↓
IN_PROGRESS
      ↓
WAITING_PARTS
      ↓
READY_FOR_PICKUP
      ↓
  COMPLETED
```

A status update can also create a corresponding timeline event.

### 🕒 Repair Timeline

Every repair request maintains a chronological timeline of important events.

Example:

```text
July 27, 2026
│
├── Repair request submitted
├── Request accepted
├── Repair started
├── Waiting for parts
├── Ready for pickup
└── Repair completed
```

### 📧 Email Notifications

The system supports email notifications for important repair events such as:

- Repair request submission
- Repair status updates
- Repair completion

The current implementation uses Gmail/SMTP for email delivery.

---

# 🧱 Tech Stack

## Frontend

| Technology | Purpose |
|---|---|
| React | User interface |
| TypeScript | Type safety |
| Vite | Development/build tooling |
| React Router | Application routing |
| Tailwind CSS | Styling |
| shadcn/ui | UI components |
| Lucide React | Icons |
| TanStack React Query | Server state management |

## Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | REST API |
| TypeScript | Type safety |
| Prisma | ORM |
| PostgreSQL | Database |
| Zod | Request validation |
| JWT | Authentication |
| Nodemailer | Email notifications |

## Development Tools

- Git
- GitHub
- Postman
- VS Code
- Prisma
- pnpm

---

# 🏗️ Architecture

RepairDesk Bohol follows a feature-oriented frontend architecture and a layered backend architecture.

### Frontend

```text
React
  │
  ├── Pages
  ├── Features
  │     ├── Authentication
  │     ├── Dashboard
  │     ├── Repair Requests
  │     └── Repair Tracking
  │
  ├── Components
  ├── Hooks
  ├── Services / API
  └── Routes
```

### Backend

```text
Client
   │
   ▼
Express Routes
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Repositories
   │
   ▼
Prisma ORM
   │
   ▼
PostgreSQL
```

This separation keeps routing, request handling, business logic, and database access organized and maintainable.

---

# 📂 Project Structure

The project uses a monorepo structure.

```text
repairdesk-bohol/
│
├── apps/
│   ├── api/
│   │   └── src/
│   │       ├── auth/
│   │       ├── controllers/
│   │       ├── database/
│   │       ├── repositories/
│   │       ├── routes/
│   │       ├── services/
│   │       ├── types/
│   │       ├── validators/
│   │       └── server.ts
│   │
│   └── web/
│       └── src/
│           ├── app/
│           ├── components/
│           │   └── ui/
│           ├── constants/
│           ├── features/
│           │   ├── auth/
│           │   ├── dashboard/
│           │   ├── repair-request/
│           │   └── tracking/
│           ├── hooks/
│           ├── layouts/
│           ├── lib/
│           ├── pages/
│           ├── routes/
│           └── types/
│
├── docs/
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

---

# 🗄️ Database Design

The application uses PostgreSQL with Prisma ORM.

Main entities include:

```text
Admin
  │
  ▼
RepairRequest
  │
  ├── RepairTimeline
  │
  └── RepairNote
```

### RepairRequest

Stores the main customer repair request.

### RepairTimeline

Stores chronological repair status events.

### RepairNote

Stores notes associated with a repair request.

### Admin

Stores administrator authentication information.

---

# 🔌 API

The backend exposes RESTful API endpoints under:

```text
/api/v1
```

### Authentication

```http
POST /api/v1/auth/login
```

### Repair Requests

```http
POST   /api/v1/repair-requests
GET    /api/v1/repair-requests
GET    /api/v1/repair-requests/:id
PATCH  /api/v1/repair-requests/:id/status
POST   /api/v1/repair-requests/track
```

### Repair Timeline

```http
GET /api/v1/repair-requests/:id/timeline
```

### Dashboard

```http
GET /api/v1/dashboard
```

### Health Check

```http
GET /health
```

---

# 🧪 Testing & QA

The project was tested using manual functional testing and API testing.

### API Testing

Postman was used to test:

- Authentication
- Repair request creation
- Repair request tracking
- Repair request retrieval
- Status updates
- Timeline retrieval
- Validation errors
- Invalid ticket/phone combinations

### Frontend Testing

The application was manually tested for:

- Form validation
- Successful form submission
- Error handling
- Loading states
- Admin authentication
- Protected routes
- Repair request searching
- Status filtering
- Pagination
- Repair details modal
- Status updates
- Customer tracking
- Timeline display

### Example Test Flow

```text
Create Repair Request
        ↓
Receive Ticket Number
        ↓
Track Request
        ↓
Admin Reviews Request
        ↓
Update Status
        ↓
Timeline Updated
        ↓
Customer Tracks Updated Status
```

---

# 🔒 Security Considerations

The application includes basic security measures such as:

- JWT-based admin authentication
- Protected admin routes
- Zod request validation
- Server-side validation
- Customer verification using ticket number + phone number
- Environment variables for sensitive configuration
- Password hashing for admin credentials

Sensitive environment variables should never be committed to GitHub.

---

# ⚙️ Getting Started

## Prerequisites

Make sure you have installed:

- Node.js 18+
- PostgreSQL
- Git
- pnpm

## 1. Clone the Repository

```bash
git clone <your-repository-url>

cd repairdesk-bohol
```

## 2. Install Dependencies

From the project root:

```bash
pnpm install
```

## 3. Configure Environment Variables

Create the required `.env` files for the backend and frontend.

### Backend

Example:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/repairdesk"

JWT_SECRET="your-secret-key"

SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

### Frontend

Example:

```env
VITE_API_URL="http://localhost:5000/api/v1"
```

> ⚠️ Never commit your real `.env` files or Gmail App Passwords to GitHub.

## 4. Setup Prisma

From the API directory:

```bash
cd apps/api
```

Generate Prisma Client:

```bash
pnpm prisma generate
```

Run database migrations:

```bash
pnpm prisma migrate dev
```

## 5. Start the Backend

From the API directory:

```bash
pnpm dev
```

The backend should be available at:

```text
http://localhost:5000
```

Test the health endpoint:

```text
http://localhost:5000/health
```

## 6. Start the Frontend

From the project root:

```bash
pnpm --filter web dev
```

The frontend should be available at:

```text
http://localhost:5173
```

---

# 🖥️ Screenshots

Screenshots can be added here once the repository images are uploaded.

### Customer Repair Request

> Add screenshot here

### Repair Tracking

> Add screenshot here

### Admin Dashboard

> Add screenshot here

### Repair Request Details

> Add screenshot here

---

# 🛣️ Repair Lifecycle

```text
                 ┌─────────────────┐
                 │ Customer submits│
                 │ repair request  │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │ PENDING_REVIEW  │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │    ACCEPTED     │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │  IN_PROGRESS    │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │ WAITING_PARTS   │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │READY_FOR_PICKUP │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │    COMPLETED    │
                 └─────────────────┘

                 At appropriate stages:

                 ┌─────────────────┐
                 │    CANCELLED    │
                 └─────────────────┘
```

---

# 🎯 Project Goals

RepairDesk Bohol was created to demonstrate how a small service-based business can manage repair requests through a centralized web application.

The main goals were:

- Reduce manual repair request handling
- Provide customers with a simple tracking system
- Centralize repair management
- Maintain a history of repair status changes
- Improve communication between customers and technicians
- Provide a foundation that can be expanded into a larger repair management platform

---

# 📚 What I Learned

This project provided practical experience with:

- Full-stack application development
- REST API design
- React application architecture
- TypeScript
- Database modeling with Prisma
- PostgreSQL
- Authentication and authorization
- Form validation
- API validation
- TanStack React Query
- Feature-based frontend architecture
- Email integration
- API testing with Postman
- Manual QA testing
- Git/GitHub workflow

---

# 🚀 Future Improvements

Possible future improvements include:

- Online payment integration
- SMS notifications
- Technician accounts
- Customer accounts
- Technician assignment
- Repair cost tracking
- Parts inventory
- Appointment scheduling
- Automated customer notifications
- Production deployment
- Automated unit and integration tests
- Role-based permissions for different administrators

---

# 👨‍💻 Author

**Erl Christian Albuena**

Information Technology Developer

Built as a full-stack portfolio project focused on practical service management and repair workflow automation.

---

# 📄 License

This project is available for educational and portfolio purposes.

If you use or modify this project, please provide appropriate attribution.

---

<p align="center">
  Built with ❤️ using React, Node.js, Express, Prisma, and PostgreSQL.
</p>
