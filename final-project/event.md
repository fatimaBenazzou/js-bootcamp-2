# **Full-Stack MERN Final Project Specification Document**

## **1. Project Overview**

-   **Project Name:** **Algerian Event Ticket Booking System**
-   **Short Description:**  
    A web platform where users can create and manage events, and others can purchase event tickets using a **points-based** system instead of direct payment. This workaround addresses Algeria’s e-payment limitations.

## **2. Group Members**

| Name | Email | GitHub Profile |
| ---- | ----- | -------------- |
|      |       |                |

## **3. Selected Theme**

_(Choose one by marking an "X")_

-   [ ] **Task Management Application**
-   [ ] **E-Commerce Website**
-   [ ] **Real-time Chat Application**
-   [ ] **Book Recommendation App**
-   [x] **MERN Application**

## **4. Features & Functionalities**

### **Frontend Features**

-   User authentication (Signup/Login)
-   Role-based dashboard (**Event Creator & Ticket Buyer**)
-   Event creation form (cover image, description, ticket count, price in points)
-   Browse and search for events
-   Ticket booking system using points
-   User profile with points balance and transaction history
-   QR code generation for purchased tickets
-   Responsive UI with a clean design

### **Backend Features**

-   User authentication with JWT
-   Role-based access control (Admin, Event Creator, Ticket Buyer)
-   CRUD operations for event management
-   Points-based transaction system
-   Booking system with ticket availability check
-   QR code generation and verification
-   Admin dashboard to monitor events and users
-   Database management using MongoDB

### **Additional Features (if any)**

-   **Email notifications** for ticket confirmation
-   **Event categories & filters** for better browsing
-   **Basic analytics** for event creators (ticket sales, revenue in points)
-   **Admin control panel** for managing users and event approvals

## **5. Technologies Used**

-   **Frontend:** React, Tailwind CSS
-   **Backend:** Express.js, Mongoose
-   **Database:** MongoDB (Atlas)
-   **Additional Libraries/Tools:** QR Code Generator, JWT for authentication

## **6. Project Milestones & Timeline**

| Milestone             | Expected Completion Date  |
| --------------------- | ------------------------- |
| Project Setup         | 2 days (01/03) ~ (03/03)  |
| Backend Development   | 1 week (04/03) ~ (12/03)  |
| Frontend Development  | 2 weeks (12/03) ~ (25/03) |
| Integration & Testing | 4 days (26/03) ~ (30/03)  |
| Final Deployment      | 1 day (31/03)             |

## **7. Additional Notes**

-   The platform will **not use direct payment integration**, only a points-based system.
-   Users **purchase points offline** via cash or bank transfer and redeem them for tickets.
-   Future improvements may include **mobile-friendly enhancements** or a **ticket resale feature**.
