import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import twig from "twig";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("view engine", "twig");
app.set("views", path.join(__dirname, "templates"));
app.use(express.static(path.join(__dirname, "public")));

// Landing page
app.get("/", (req, res) => {
  res.render("landing/index.twig");
});

// Auth pages
app.get("/auth/login", (req, res) => {
  res.render("auth/login.twig");
});

app.get("/auth/signup", (req, res) => {
  res.render("auth/signup.twig");
});

// Dashboard
app.get("/dashboard", (req, res) => {
  res.render("dashboard/index.twig");
});

// Tickets
app.get("/tickets", (req, res) => {
  res.render("tickets/index.twig");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
