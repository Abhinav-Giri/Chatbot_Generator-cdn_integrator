🚀 Chatbot Embed Generator — Full-Stack Application

Generate SDN tokens, CDN embed scripts, and chatbot widget embed.js files for any website.

This project contains:

Frontend (React) — Form UI, validation, copy buttons, and embed code preview

Backend (Node.js + Express) — Generates SDN token, embed script, and embed.js content

CDN-style Script (embed.js) — Loads chatbot widget into the client website

Widget Preview (widget.html) — Simple embeddable chatbot UI

Modular architecture with separate components, utilities, and API layers

Edge-case handling, form validation, clipboard fallback, URL validation, API failures, token generation

📁 Project Structure
chatbot-generator/
  backend/
    src/
      server.js
      routes/
        generator.js
      utils/
        token.js
    public/
      embed.js
      widget.html
    package.json
    .env

  frontend/
    src/
      App.jsx
      App.module.css
      index.js
      api/
        client.js
      components/
        Layout/
        GeneratorForm/
        ResultPanel/
        CopyButton/
    package.json

  README.md

🧠 What This Project Does

This full-stack application allows users to generate:

✔ Unique SDN Token

Used to identify a customer/website.

✔ CDN Embed Script

Users paste this into their website:

<script src="https://yourcdn.com/embed.js" data-sdn="sdn_xxxxx" async></script>

✔ embed.js (Auto-Inject Iframe Widget)

This script injects a chatbot iframe into the customer’s site.

✔ Widget Preview

The chatbot loads in an iframe and displays a demo UI.

🌐 Live Flow of the System

1️⃣ User opens the React frontend
2️⃣ Enters:

Email

Website URL

3️⃣ Backend validates input
4️⃣ Backend generates:

SDN Token

CDN <script> snippet

embed.js file content

Widget preview URL

5️⃣ Frontend displays:

SDN Token (copyable)

Embed snippet (copyable)

Full embed.js content (copyable)

6️⃣ User copies embed code into their website
7️⃣ When website loads:

embed.js runs

It injects an iframe → chatbot widget appears

🔧 Backend (Node.js + Express)
🛠 Installation
cd backend
npm install

▶ Start server
npm run dev


Runs on:
👉 http://localhost:4000

🔑 Available API
POST /api/generate-chatbot
Request Body:
{
  "email": "user@example.com",
  "websiteUrl": "https://yourwebsite.com"
}

Response:
{
  "sdnToken": "sdn_a1b2c3d4",
  "embedScript": "<script src='http://localhost:4000/embed.js' data-sdn='sdn_a1b2c3d4'></script>",
  "embedJsContent": "(function(){...})();",
  "widgetPreviewUrl": "http://localhost:4000/chat?sdn=sdn_a1b2c3d4"
}

🎨 Frontend (React)
🛠 Installation
cd frontend
npm install
npm start


Runs on:
👉 http://localhost:3000

✔ Features

Beautiful layout using CSS Modules

Full validation:

Email format

URL format

Required fields

Fully modular React components:

Layout

GeneratorForm

ResultPanel

CopyButton

Error handling on:

Invalid email

Invalid URL

API unreachable

Clipboard failures

Automatic and manual copy buttons

Full embed.js preview and SDN token preview

📦 CDN Script (embed.js)

This file behaves like a real CDN script:

Injects an iframe chatbot widget

Reads the SDN token from data-sdn

Applies styling, position & z-index

Works when pasted into ANY HTML website

Path:

backend/public/embed.js

💬 Chatbot Widget (frontend for iframe)

Path:

backend/public/widget.html


A simple UI with:

Header

Messages panel

Input box

Can be replaced with real chatbot.

🚀 Production Deployment Notes
Backend

Move CDN assets to a real CDN (AWS S3, CloudFront, Vercel Blob)

Serve embed.js from HTTPS domain

Add rate limiting & logging

Frontend

Build and host on Netlify, Vercel, or static S3 bucket

Set environment variable:

REACT_APP_API_BASE_URL=https://your-api.com

🧩 Future Enhancements

Add analytics dashboard

Store tokens & user websites in DB

JWT-based API auth

Multi-theme chatbot widget

Live conversation backend

Admin portal

👨‍💻 Author

Abhinav Giri
This project is fully designed and implemented modularly with all necessary validations and edge cases.