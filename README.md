# 🎫 TicketApp (Twig Version)

## Overview
A Twig + Vanilla JS implementation of TicketApp with localStorage-based simulated authentication.

---

## 🧩 Frameworks & Libraries
- **Twig** (templating engine)
- **Vanilla JavaScript**
- **localStorage** (for session simulation)
- **Nodejs** (for routing & template rendering)

---

## Setup

1️⃣ Install dependencies
```bash
npm install
```
2️⃣ Run the app
```bash
node app.js
```

3️⃣ Visit in browser
http://localhost:3000

## 🧠 Pages
/ → Landing

/auth/login → Login

/auth/signup → Signup

/dashboard → Dashboard

/tickets → Ticket Management

## 🔐 Authentication
Simulated using localStorage:

Key: ticketapp_session

Unauthorized access redirects to /auth/login

Logout clears session and returns to landing

## 🧪 Test Credentials
Username	Email	Password
testuser	test@example.com	123456

## ♿ Accessibility Notes
Semantic HTML tags

Keyboard navigation supported

Inline error feedback and focus management

## ⚠️ Known Issues
Auth is purely client-side

Session can be manually cleared in dev tools
