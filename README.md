# Quiz App

This is a full-stack application that allows users to create quizzes with multiple questions, view them, and delete them. It consists of a frontend built with Next.js and a backend powered by Node.js with a MongoDB database.

## 🧠 Features

- Create new quizzes
- View quiz details and list of questions
- Delete quizzes
- Fully styled with Tailwind CSS
- MongoDB database integration

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Yarn or npm
- MongoDB instance (local or remote)

---

1. Navigate to the backend folder:

   ```bash
   cd backend

   ```

2. Install dependencies:

yarn install

# or

npm install

3. Create a .env file:
   cp .env.example .env

4. Fill in your MongoDB URI inside .env:
   MONGODB_USER=
   MONGODB_PASSWORD=
   MONGODB_URL=
   MONGODB_DB=
   PORT=3001

🌐 Frontend Setup

1. cd frontend
2. yarn install

# or

npm install 3. The frontend will run at http://localhost:3000

🛠 Tech Stack
Frontend: Next.js, Tailwind CSS

Backend: Express.js, MongoDB, Mongoose

API: RESTful endpoints
