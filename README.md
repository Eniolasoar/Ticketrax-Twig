# 🎫 TicketApp (Twig Version)

## Overview
A Twig + Vanilla JS implementation of TicketApp with localStorage-based simulated authentication.

---

## 🧩 Frameworks & Libraries
- **Twig** (templating engine)
- **Vanilla JavaScript**
- **localStorage** (for session simulation)
- **PHP** (for routing & template rendering)

---

## ⚙️ Setup
1. Install dependencies:
   ```bash
   composer require twig/twig
Start a PHP local server:

bash
Copy code
php -S localhost:8080
Visit:

arduino
Copy code
http://localhost:8080
🧠 Pages
/ → Landing

/auth/login → Login

/auth/signup → Signup

/dashboard → Dashboard

/tickets → Ticket Management

🔐 Authentication
Simulated using localStorage:

Key: ticketapp_session

Unauthorized access redirects to /auth/login

Logout clears session and returns to landing

🧪 Test Credentials
Username	Email	Password
testuser	test@example.com	123456

♿ Accessibility Notes
Semantic HTML tags

Keyboard navigation supported

Inline error feedback and focus management

⚠️ Known Issues
Auth is purely client-side

No backend or API integration

Session can be manually cleared in dev tools