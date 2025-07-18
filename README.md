# 📝 MERN NoteMaker App

A full-stack note-taking application built with MongoDB, Express, React, and Node.js (MERN stack). Create, edit, and delete notes with a clean, user-friendly interface.

![NoteMaker Screenshot](./screenshot.png) *(Add a screenshot later)*

## ✨ Features
- 📌 Create, edit, and delete notes
- 🔍 View all notes in a clean card layout
- 📱 Responsive design (works on mobile & desktop)
- ⚡ Real-time updates
- 🎨 Modern UI with color-coded actions

## 🛠️ Technologies Used
- **Frontend**: React.js, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Deployment**: (Optional: Netlify/Vercel for frontend, Render/Heroku for backend)

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account (free tier works)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pullaramyasree/mern-notemaker.git
   cd mern-notemaker
   
2. **Set up Backend**

cd backend
npm install

3. **Set up Frontend**

cd ../frontend
npm install

4. **Configure Environment**

Create a .env file in backend with:

text
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=3001
## Running the App

**Start Backend Server**

cd backend
npm start
Server runs on http://localhost:3001

**Start Frontend**

cd ../frontend
npm start
App opens in browser at http://localhost:3000

## 📂 Project Structure

mern-notemaker/
├── backend/           # Server code
│   ├── server.js      # Express server
│   └── package.json
├── frontend/          # Client code
│   ├── public/
│   ├── src/
│   └── package.json
└── README.md
## 🤝 How to Contribute
Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request


