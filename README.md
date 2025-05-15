```markdown
# UberClone Microservices

A lightweight, microservices-based ride-booking platform inspired by Uber, built with Node.js and Express.

## Architecture Overview

This application is divided into three main microservices:

1. **User Service** - Handles user authentication and ride requests
2. **Captain Service** - Manages driver (captain) operations and availability
3. **Ride Service** - Coordinates ride creation, matching, and status management

## Technical Features

- **Microservices Architecture** - Modular services for better scalability and maintenance
- **RabbitMQ** - Asynchronous communication between two services
- **Real-time Communication** - Uses long polling for ride status updates and notifications
- **JWT Authentication** - Secure authentication middleware for both users and captains
- **RESTful API Design** - Clean, consistent API endpoints across services



## API Endpoints

## User Service

POST /api/user/register - Register a new user
POST /api/user/login - User login
GET /api/user/profile - Get user profile (authenticated)
GET/POST /api/user/logout - User logout (authenticated)
GET /api/user/wait-for-ride-accept - Long polling endpoint to wait for ride acceptance (authenticated)


### Captain Service

POST /api/captain/register - Register a new captain/driver
POST /api/captain/login - Captain login
GET /api/captain/profile - Get captain profile (authenticated)
GET /api/captain/logout - Captain logout (authenticated)
PATCH /api/captain/toggle-availability - Toggle captain availability status (authenticated)
GET /api/captain/wait-for-ride - Long polling endpoint to wait for new ride requests (authenticated)


### Ride Service

POST /api/ride/create-ride - Create a new ride request (user authenticated)
GET /api/ride/accept-ride - Accept a ride request (captain authenticated)
```


```markdown
## Key Implementation Details

1. **Long Polling** - Used for real-time communication between services without WebSockets overhead
2. **Authentication Middleware** - Custom middleware for both user and captain authentication
3. **Service Isolation** - Each service operates independently with its own responsibilities
```


```markdown
## Installation and Setup

1. Clone the repository

git clone https://github.com/SatyamThakur0/uber-microservices.git
cd uber-microservices

2. Install dependencies for each service

**In each service directory (user-service, captain-service, ride-service)
cd service-directory(ride, user, captain)
npm install

3. Configure environment variables

**Create .env files in each service directory with the following variables
JWT_SECRET
MONGO_URI
RABBIT_MQ_URL
BASE_URL

4. Start each service
npm start
```
```markdown
## Technologies Used

- Node.js
- Express.js
- MongoDB
- RabbitMQ
- JSON Web Tokens (JWT)
- RESTful API principles
- Long polling for real-time updates

```
