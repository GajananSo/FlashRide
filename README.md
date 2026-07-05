FLASHRIDE APPLICATION
A Scalable Web-Based Platform for Intelligent Ride Booking and Allocation

1. Project Overview
FlashRide is an advanced full-stack ride-booking web application designed to optimize and automate the
match allocation workflow between customers and drivers. Built with high concurrency and scalability in mind,
the system integrates a robust Spring Boot enterprise backend with an interactive, responsive React user

interface. The platform addresses fundamental dispatch challenges, ensuring optimal vehicle routing, real-
time location computation, secure credentials tracking, and payment flows.

2. Key Features

Dual-User Ecosystem: Specialized registration, security verification, and dashboard flows custom-
tailored for both Customers and Drivers.

Intelligent Allocation System: Dynamic computational models that resolve nearby vehicle availability
using coordinates tracking and distance matrix calculations.
Comprehensive Booking Management: Complete transactional management tracking active bookings,
cancel request workflows, ride state changes, and automated lifecycle completion.
Secure Authentication & Authorization: State-of-the-art token-based session security utilizing stateless
JWT architectures integrated into Spring Security.
Integrated Transacting: Dynamic payment processing layers supporting secure interface updates,
including UPI-based payment records and metadata logging.
3. Technology Stack
Backend Architecture:
Java Enterprise Edition Spring Boot 3.x Spring Security (JWT) Spring Data JPA MySQL Database
Maven Build Automation
Frontend Architecture:
React.js Vite Tooling Tailwind CSS Framework Axios HTTP Client ESLint Configuration

4. Repository Structure
The repository follows a clean, decoupled monorepo architectural layout allowing isolated component
development:
•

•

•

•

•

1

Flashride/
├── Flashride-Backend/ <-- Spring Boot Project Roots
│ ├── src/main/java/com/alpha/FlashRide/ <-- Source Packages (MVC Layer)
│ ├── src/main/resources/ <-- Application Properties
│ └── pom.xml <-- Maven Core Dependencies
├── Flashride-Frontend/ <-- React SPA Project Roots
│ ├── src/ <-- Component Tree & Assets
│ ├── index.html <-- Entry Markup DOM
│ └── package.json <-- Package Metadata
└── .gitignore <-- Central Multi-Project Rules

5. API Endpoint Specifications
Controller
Context

HTTP
Method

Endpoint Destination Access Control
AuthController POST /api/auth/login Public Access
CustomerController POST /api/customer/register Public Access
DriverController POST /api/driver/register-vehicle Public Access
BookingController POST /api/bookings/book Authenticated (Customer)
BookingController PUT /api/bookings/cancel

Authenticated (Customer/
Driver)

VehicleController GET /api/vehicles/available Authenticated (Customer)
PaymentController POST /api/payments/upi-pay Authenticated (Customer)

6. Core Environment Configurations
Backend (`application.properties`):

Frontend Setup:
Ensure that Axios or native fetch base URLs target the matching local execution server context (typically
http://localhost:8080 ).
spring.datasource.url=jdbc:mysql://localhost:3306/flashride_db?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

2

7. Initialization Instructions
Running the Backend (Eclipse Development Environment):
Import the Flashride-Backend module via File -> Import -> Existing Maven Projects.
Ensure local XAMPP/MySQL environments are active and databases are running.
Right-click FlashRideApplication.java -> Run As -> Java Application.
Running the Frontend (VS Code Development Environment):
Open terminal context inside Flashride-Frontend .
Execute npm install to restore project node dependencies.
Initiate local development node cluster via npm run dev .
