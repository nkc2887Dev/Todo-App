# Todo Application

This is a full-stack Todo application with a React TypeScript frontend and a Node.js backend.

## Setup and Running Instructions

### Client Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The client will run on `http://localhost:3000` by default.

### Server Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The server will run on `http://localhost:9876` by default.

## Features

- Create new todos
- Mark todos as complete/incomplete
- Edit todo titles
- Delete todos
- Real-time updates
- Clean and modern UI

## Tech Stack

### Frontend
- React
- TypeScript
- Axios for API calls
- CSS for styling

### Backend
- Node.js
- Express
- MongoDB

## Important Notes

- Make sure both client and server are running simultaneously for the application to work properly
- The server must be running on port 9876 as the client is configured to connect to this port
- Ensure you have MongoDB installed and running on your system 