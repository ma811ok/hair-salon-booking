# Snip & Style - Hair Salon Booking System

A premium, responsive hair salon booking website with modern UI and robust Spring Boot backend.

![Snip & Style](https://img.shields.io/badge/Status-In%20Development-green)
![Java](https://img.shields.io/badge/Java-17+-blue)
![React](https://img.shields.io/badge/React-18-blue)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-green)

## Features

✅ **User Authentication**
- Login & Registration with JWT tokens
- Password change functionality
- Profile management

✅ **Booking System**
- Step-by-step booking wizard
- Service selection
- Stylist selection with ratings
- Calendar date picker
- Time slot availability
- Booking confirmation

✅ **Admin Dashboard**
- User management
- Booking management
- Analytics & statistics
- Revenue tracking

✅ **Modern UI/UX**
- Fully responsive design (mobile-first)
- Smooth animations
- Dark gradient theme with accent colors
- Glass morphism effects
- Professional typography

## Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **date-fns** - Date utilities

### Backend
- **Spring Boot 3.2** - Framework
- **Spring Security** - Authentication
- **JWT** - Token-based auth
- **JPA/Hibernate** - ORM
- **MySQL** - Database
- **Lombok** - Boilerplate reduction

## Getting Started

### Prerequisites

- **Java 17+**
- **Node.js 18+**
- **MySQL 8.0+**
- **Maven 3.8+**

### Database Setup

1. Create a MySQL database:

```sql
CREATE DATABASE hair_salon CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. Update `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/hair_salon?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

### Backend Setup

```bash
cd backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will start on `http://localhost:8085`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

The frontend will start on `http://localhost:3000`

## Demo Credentials

| Role  | Email                  | Password    |
|-------|------------------------|-------------|
| Admin | admin@snipstyle.com    | admin123    |
| User  | demo@snipstyle.com     | password123 |

## API Endpoints

### Authentication
| Method | Endpoint             | Description        |
|--------|----------------------|--------------------|
| POST   | /api/auth/register   | Register new user  |
| POST   | /api/auth/login     | Login user        |
| GET    | /api/auth/me        | Get current user  |
| PUT    | /api/auth/profile   | Update profile    |

### Services
| Method | Endpoint             | Description          |
|--------|----------------------|----------------------|
| GET    | /api/services        | Get all services    |
| GET    | /api/services/{id}  | Get service by ID   |

### Stylists
| Method | Endpoint                      | Description              |
|--------|-------------------------------|--------------------------|
| GET    | /api/stylists                 | Get all stylists         |
| GET    | /api/stylists/{id}           | Get stylist by ID        |
| GET    | /api/stylists/{id}/slots     | Get available time slots |

### Bookings
| Method | Endpoint                   | Description         |
|--------|----------------------------|---------------------|
| GET    | /api/bookings              | Get all bookings    |
| GET    | /api/bookings/{id}         | Get booking by ID   |
| POST   | /api/bookings              | Create new booking |
| PUT    | /api/bookings/{id}         | Update booking     |
| DELETE | /api/bookings/{id}         | Cancel booking     |

### Admin (requires ADMIN role)
| Method | Endpoint                   | Description         |
|--------|----------------------------|---------------------|
| GET    | /api/admin/users           | Get all users      |
| PUT    | /api/admin/users/{id}     | Update user        |
| DELETE | /api/admin/users/{id}     | Delete user        |
| GET    | /api/admin/stats          | Get statistics     |

## Project Structure

```
hair-salon-booking/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── context/       # React context
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    └── src/
        └── main/
            ├── java/
            │   └── com/hairsalon/
            │       ├── config/       # Configuration classes
            │       ├── controller/  # REST controllers
            │       ├── dto/        # Data transfer objects
            │       ├── model/       # Entity classes
            │       ├── repository/  # JPA repositories
            │       └── service/     # Business logic
            └── resources/
                └── application.properties
```

## Screenshots

The application features:
- 🎨 Modern dark theme with gold accents
- 📱 Fully responsive mobile design
- ⚡ Smooth page transitions
- 🎭 Professional branding

## License

MIT License - feel free to use this project for your business!

---

Made with ❤️ for the hair salon industry
