# RepairDesk Bohol

> Online Computer Repair Booking and Tracking System for Bohol

RepairDesk Bohol is a web-based computer repair request and tracking system designed to streamline the process of submitting, managing, and tracking device repair requests.

The system allows customers to submit repair requests without creating an account, receive a unique ticket number, and track their repair status using their ticket number and phone number.

Administrators can manage repair requests, update repair statuses, add repair notes, and maintain a repair timeline for each request.

---

## Features

### Customer Features

- Submit a repair request
- Provide customer and device information
- Select preferred service method
- Select preferred repair date and time
- Describe the device problem
- Receive a unique repair ticket number
- Track repair requests using:
  - Ticket number
  - Phone number
- View repair request details
- View current repair status
- View repair status timeline
- View repair notes
- Receive email notifications for repair request events

### Admin Features

- Admin authentication
- Dashboard
- View all repair requests
- Search repair requests
- Filter requests by status
- Pagination
- View complete repair request details
- Update repair status
- Add status update notes
- View repair timeline
- Add and manage repair notes

---

## Repair Status Flow

Repair requests follow a predefined status workflow:

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
