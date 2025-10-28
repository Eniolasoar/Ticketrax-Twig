document.addEventListener("DOMContentLoaded", () => {
    const session = localStorage.getItem("ticketapp_session");
    if (!session) {
      window.location.href = "/auth/login";
      return;
    }
  
    const tickets = JSON.parse(localStorage.getItem("ticketapp_tickets") || "[]");
  
    const total = tickets.length;
    const open = tickets.filter((t) => t.status === "open").length;
    const progress = tickets.filter((t) => t.status === "in_progress").length;
    const closed = tickets.filter((t) => t.status === "closed").length;
  
    document.querySelector("#total-stat p").textContent = total;
    document.querySelector("#open-stat p").textContent = open;
    document.querySelector("#progress-stat p").textContent = progress;
    document.querySelector("#closed-stat p").textContent = closed;
  
    const logoutBtn = document.querySelector("#logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("ticketapp_session");
        alert("Logged out successfully.");
        window.location.href = "/auth/login";
      });
    }
  
    const menuToggle = document.querySelector("#menu-toggle");
    const sidebar = document.querySelector("#sidebar");
    if (menuToggle && sidebar) {
      menuToggle.addEventListener("click", () => {
        sidebar.classList.toggle("open");
      });
    }
  });
  