# ⚡ FlashRide Application
### *A Scalable Web-Based Platform for Intelligent Ride Booking and Allocation*

---

## 📖 1. Project Overview
**FlashRide** is an advanced full-stack ride-booking web platform designed to optimize and automate real-time match allocation workflows between customers and drivers. 

Built with high concurrency and scalability in mind, the system integrates a robust **Spring Boot 3.x** enterprise backend with an interactive, highly responsive **React** user interface. The platform addresses fundamental technical dispatch challenges, ensuring optimal vehicle routing, location calculations, secure state transitions, and asynchronous payment ledgering.

---

## 🚀 2. Core System Features

### 👥 Dual-User Ecosystem
* **Customer Interface:** Dedicated registration, secure authentication, dynamic vehicle discovery, ride booking creation, booking cancellation, and UPI payment interfaces.
* **Driver Interface:** Specialized vehicle onboard enrollment, real-time location status management, incoming trip requests dispatch handling, and ride lifecycle completion tools.

### 🧠 Intelligent Allocation System
* **Proximity Computation:** Employs programmatic location monitoring and spherical coordinate processing to calculate precise distances between active customers and empty vehicles.
* **Dynamic Query Optimization:** Pulls available vehicles using customized database layers to ensure low latency under heavy customer demand.

### 🔐 Enterprise-Grade Security Architecture
* **Stateless Authentication:** Complete authorization integration backed by token-based session security utilizing stateless JSON Web Tokens (JWT).
* **Granular Role Access Control:** Intercepts endpoints through a custom `JwtFilter` to map strict access permissions based on user groups (`CUSTOMER`, `DRIVER`).

### 💼 Transaction & Lifecycle Tracking
* **Atomic State Engine:** Guards critical booking lifecycles (`PENDING` ➔ `ACCEPTED` ➔ `ON_RIDE` ➔ `COMPLETED` / `CANCELLED`) to rule out concurrency faults.
* **Integrated Payment Ledgering:** Native backend recording of transaction metadata, digital signature references, and UPI confirmations.


## 📂 3. Repository Directory Structure
The repository is deployed as a modular decoupled monorepo to isolate development concerns:

```text
Flashride/
├── Flashride-Backend/                  # Spring Boot Enterprise Architecture
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/alpha/FlashRide/
│   │   │   │   ├── controller/         # REST API Presentation Layer
│   │   │   │   ├── entity/             # Relational Database Models
│   │   │   │   ├── repository/         # Data Access Objects (JPA Abstractions)
│   │   │   │   ├── Service/            # Core Transactional Business Logic
│   │   │   │   ├── DTO/                # Decoupled Request/Response Data Shuttles
│   │   │   │   ├── exception/          # Global Intercepting Error Handlers
│   │   │   │   └── security/           # Token Filters & Security Policies
│   │   │   └── resources/
│   │   │       └── application.properties # Application Configuration Properties
│   └── pom.xml                         # Maven Dependencies & Lifecycle Build File
│
├── Flashride-Frontend/                 # React Single Page Application (SPA)
│   ├── src/
│   │   ├── assets/                     # Static media assets & vector illustrations
│   │   ├── main.jsx                    # Application bootstrapping root
│   │   └── App.jsx                     # Core application router component
│   ├── index.html                      # DOM Mounting Anchor
│   ├── vite.config.js                  # Compilation and dev-cluster configurations
│   └── package.json                    # Node dependency ecosystem declarations
│
└── .gitignore                          # Unified multi-environment exclusion definitions


### 4 .Environment Setup & Configuration

spring.datasource.url=jdbc:mysql://localhost:3306/flashride_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_mysql_secure_password

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

## Frontend Configuration:
// Example Base API Gateway Route Configuration
import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:8080' });

🚀 5. Run and Deployment Instructions

### Executing the Backend (Eclipse IDE / Console)
Database Runtime: Fire up your local database instance using the XAMPP Control Panel or native MySQL services. Ensure connection port 3306 is unblocked.

Project Import: Inside Eclipse, select File ➔ Import... ➔ Existing Maven Projects and target the directory path pointing directly to Flashride-Backend.

Application Boot: Allow the background dependencies compiler to index (pom.xml), then right-click FlashRideApplication.java ➔ Run As ➔ Java Application. The server will deploy context configurations over port 8080.

### 💻 Executing the Frontend (VS Code)

1 . Workspace Launch: Open your VS Code container directly inside the folder path: Flashride/Flashride-Frontend.

2 . Ecosystem Resolution: Launch your integrated terminal environment and execute the following dependency mapping routine:
      > npm install
3 . Development Compilation: Boot up the lightning-fast local developer build pipeline:
      > npm run dev
