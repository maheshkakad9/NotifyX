                                    🚀 NotifyX – Distributed Notification Platform

NotifyX is a production-grade distributed notification system built using microservices and event-driven architecture. It is designed to handle asynchronous notifications at scale, following real-world backend engineering practices.

🧠 Why NotifyX?

Modern applications need to send notifications reliably without blocking user requests. Traditional tightly coupled systems fail under load.

NotifyX solves this using:

- Asynchronous messaging

- Loosely coupled microservices

- Centralized API Gateway

- Containerized deployment

🏗️ System Architecture

Key Components:

- NGINX API Gateway – Single entry point

- Auth Service – JWT authentication

- User Service – User management

- Notification Producer – Publishes events

- Notification Consumer – Processes events asynchronously

- RabbitMQ – Message broker

- Redis – Caching & sessions

- Docker Compose – Service orchestration

🔄 Request Flow (Simplified)

1. Client → API Gateway (NGINX)

2. JWT verification via Auth Service

3. Event published to RabbitMQ

4. Notification Consumer processes event

5. Notification delivered asynchronously

6. Redis improves response performance

🧰 Tech Stack

Backend

- Node.js

- TypeScript

- Express.js
  

Architecture

- Microservices

- Event-Driven Architecture


Messaging & Cache

- RabbitMQ

- Redis
  

Security & Gateway

- JWT & Refresh Tokens

- NGINX (API Gateway)


DevOps & Cloud

- Docker

- Docker Compose

- GitHub Actions (CI/CD)

- AWS EC2 (deployment-ready)


🚀 Local Setup

Prerequisites

- Docker

- Docker Compose

Run the System

docker compose up -d --build

All services will start and communicate via Docker network.
