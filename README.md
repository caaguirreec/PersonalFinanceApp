# Personal Finance App

A personal finance application built with React, Flask, and SQLite.

## Features

- Add and view transactions
- Categorize transactions by type (expense/income)
- Track payment methods
- View transaction history

## Project Structure

- `frontend/`: React application built with Vite
- `backend/`: Flask API server
- `database/`: SQLite database configuration

## Prerequisites

- Docker
- Docker Compose
- Node.js (for local development)
- Python 3.9+ (for local development)

## Running the Application

### Using Docker (Recommended)

1. Clone the repository
2. Run the following command in the project root:
   ```bash
   docker-compose up --build
   ```
3. Access the application at:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

### Local Development

#### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

#### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the Flask server:
   ```bash
   python app.py
   ```

## API Endpoints

- `GET /api/transactions`: Get all transactions
- `POST /api/transactions`: Add a new transaction

## License

MIT
