NailSpot Dublin

Live Application (AWS EC2 Deployment) http://52.7.171.54:3000/
Backup Deployment (Render) https://nailspotv2.onrender.com
GitHub Repository https://github.com/lovelygregorio/nailspot2.git

==================================================
PROJECT OVERVIEW
==================================================

NailSpot Dublin is a full-stack web application designed to help users discover nail salons and nail services around Dublin. The platform allows users to create accounts, browse salons, explore available services, save favourite salons, upload nail inspirations, leave reviews, and manage salon bookings through an interactive community-based system.

This project was developed for the SETU Full Stack Web Development module. While some structural concepts and testing configurations were inspired by the Playtime 0.9 project demonstrated during lectures, the application idea, user experience, data models, APIs, database structure, features, and user interface were fully redesigned and customised for a modern nail salon discovery and booking platform.

==================================================
MAIN FEATURES
==================================================

- User registration and secure authentication
- JWT authentication and session management
- Firebase and Google OAuth login integration
- Create, edit, and manage nail salons
- Browse salons and available nail services
- Favourite and save salons functionality
- Booking management system
- Ratings, reviews, and comments
- Community nail gallery and discussions
- Interactive Dublin salon map using Leaflet.js
- REST API for salons, services, bookings, and users
- API and model testing using Mocha and Chai
- Basic and enhanced Playwright end-to-end testing
- MongoDB and MongoDB Atlas integration
- Admin dashboard for managing users, salons, and bookings
- AWS EC2 cloud deployment with Render backup deployment

==================================================
TECHNOLOGIES USED
==================================================

Backend
- Node.js
- Hapi.js

Frontend
- Handlebars
- Bulma CSS
- Leaflet.js

Database
- MongoDB
- Mongoose
- MongoDB Atlas

Authentication
- JWT (JSON Web Token)
- hapi-auth-jwt2
- Firebase Authentication
- Google OAuth

Testing
- Mocha
- Chai
- Axios
- Playwright

Validation and Utilities
- Joi
- dotenv
- uuid

DevOps and Deployment
- AWS EC2
- Render
- PM2
- Git Flow
- Elastic IP

==================================================
INSTALLATION
==================================================

Clone the repository:

git clone https://github.com/lovelygregorio/nailspot.git

Navigate to the project folder:

cd nailspot

Install dependencies:

npm install

==================================================
ENVIRONMENT VARIABLES
==================================================

Create a .env file in the root directory and configure the following variables:

PORT=3000
COOKIE_NAME=nailspot
COOKIE_PASSWORD=your_secure_cookie_password
JWT_SECRET=your_jwt_secret
MONGO_URL=your_mongodb_connection_string

==================================================
RUNNING THE APPLICATION
==================================================

Start the server:

npm start

The application will run on:

http://localhost:3000

==================================================
RUNNING TESTS
==================================================

To run automated tests:

npm test

The test suite includes:

- Authentication API tests
- Salon API tests
- Booking API tests
- Service API tests
- User API tests
- Model tests for Salon, Service, Booking, and User
- Basic and enhanced Playwright end-to-end testing

==================================================
AWS EC2 DEPLOYMENT
==================================================

The NailSpot Dublin application is deployed on Amazon Web Services (AWS) EC2, allowing the application to run on a cloud server and be accessed online.

An AWS Elastic IP address was allocated and associated with the EC2 instance to ensure the public IP address remains permanent and does not change after instance restarts.

PM2 was used for process management to keep the application running continuously in the background.

==================================================
RENDER DEPLOYMENT (BACKUP)
==================================================

Due to deployment configuration and permission issues encountered during the EC2 setup, the application was also deployed on Render as a backup hosting solution.

This ensured continuous availability of the application while demonstrating deployment across multiple cloud platforms.

==================================================
ENHANCEMENT FEATURES
==================================================

Level 1
- Private dashboard functionality
- Reviews and comments system
- Validation and sanitisation using Joi
- Unit and model testing

Level 2
- Public salon discovery platform
- Community gallery sharing
- API testing and coverage
- Secure password hashing and authentication
- Git Flow branching workflow

Level 3
- Ratings and booking system
- Community gallery and interactions
- Playwright end-to-end testing
- Firebase and Google OAuth login
- AWS EC2 and Render cloud deployment

Level 4
- Favourite and saved salon functionality
- Firebase Authentication service integration
- PM2 deployment setup
- MongoDB Atlas cloud database integration
- Enhanced admin dashboard and booking management
- Enhanced Playwright testing and user interaction testing

Level 5 (Future Enhancements)
- AI-powered salon recommendations
- Smart booking assistant
- CI/CD automation pipeline
- Load balancing and auto scaling
- Analytics and reporting dashboard

==================================================
FUTURE ENHANCEMENTS
==================================================

- Full TypeScript migration
- AI-powered salon recommendations
- Smart booking assistant
- CI/CD automation pipeline
- Load balancer and auto scaling support
- Mobile application version
- Analytics and reporting dashboard
- Advanced customer notification system

==================================================
AUTHOR
==================================================
Lovely Gregorio
SETU Higher Diploma in Computer Science
May 2026