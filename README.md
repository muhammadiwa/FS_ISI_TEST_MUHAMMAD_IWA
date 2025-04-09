# Task Management Application

A fullstack todo list application built with React, Python (FastAPI), PostgreSQL, and TailwindCSS.

## Features

- Create new tasks
- Update existing tasks
- Delete tasks
- Mark tasks as completed
- Separate lists for ongoing and completed tasks
- Ongoing tasks sorted from oldest to newest
- Completed tasks sorted from newest to oldest
- Edit mode with pre-filled form and Update/Cancel buttons

## Tech Stack

- Frontend: React with TypeScript and TailwindCSS
- Backend: Python with FastAPI
- Database: PostgreSQL
- Containerization: Docker and Docker Compose

## Running the Application

1. Make sure you have Docker and Docker Compose installed on your system.

2. Clone the repository:
   ```
   git clone https://github.com/muhammadiwa/FS_ISI_TEST_MUHAMMAD_IWA.git task-management
   cd task-management
   ```

3. Start the application:
   ```
   docker-compose up
   ```

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api

## Project Structure

```
task-management/
├── frontend/                # React frontend
│   ├── public/              # Static files
│   ├── src/                 # Source code
│   ├── Dockerfile           # Frontend Docker configuration
│   └── package.json         # Frontend dependencies
├── backend/                 # FastAPI backend
│   ├── main.py              # Main application file
│   ├── models.py            # Database models
│   ├── schemas.py           # Pydantic schemas
│   ├── database.py          # Database connection
│   ├── Dockerfile           # Backend Docker configuration
│   └── requirements.txt     # Python dependencies
└── docker-compose.yml       # Docker Compose configuration
