document.addEventListener("DOMContentLoaded", () => {
    const session = localStorage.getItem("ticketapp_session");
    if (!session) {
      window.location.href = "/auth/login";
      return;
    }
  
    const listContainer = document.querySelector("#ticket-list");
    const createBtn = document.querySelector("#create-ticket-btn");
    const logoutBtn = document.querySelector("#logout-btn");
  
    let tickets = JSON.parse(localStorage.getItem("ticketapp_tickets") || "[]");
  
    const saveTickets = () => {
      localStorage.setItem("ticketapp_tickets", JSON.stringify(tickets));
      renderTickets();
    };
  
    const renderTickets = () => {
      if (tickets.length === 0) {
        listContainer.innerHTML = `<p>No tickets yet. Create one to get started!</p>`;
        return;
      }
  
      listContainer.innerHTML = tickets
        .map(
          (t) => `
          <div class="ticket-card ${t.status}">
            <h3>${t.title}</h3>
            <p>${t.description}</p>
            <p><strong>Status:</strong> ${t.status}</p>
            <p><strong>Priority:</strong> ${t.priority}</p>
            <div class="ticket-actions">
              <button class="edit-btn" data-id="${t.id}">Edit</button>
              <button class="delete-btn" data-id="${t.id}">Delete</button>
            </div>
          </div>
        `
        )
        .join("");
  
      document.querySelectorAll(".delete-btn").forEach((btn) =>
        btn.addEventListener("click", (e) => {
          const id = +e.target.dataset.id;
          tickets = tickets.filter((t) => t.id !== id);
          saveTickets();
        })
      );
  
      document.querySelectorAll(".edit-btn").forEach((btn) =>
        btn.addEventListener("click", (e) => {
          const id = +e.target.dataset.id;
          const ticket = tickets.find((t) => t.id === id);
          const title = prompt("Edit title:", ticket.title);
          const description = prompt("Edit description:", ticket.description);
          if (title && description) {
            ticket.title = title;
            ticket.description = description;
            saveTickets();
          }
        })
      );
    };
  
    createBtn.addEventListener("click", () => {
      const title = prompt("Enter ticket title:");
      const description = prompt("Enter ticket description:");
      const status = prompt("Enter status (open/in_progress/closed):", "open");
      const priority = prompt("Enter priority (low/medium/high):", "low");
  
      if (!title || !description) return alert("All fields are required.");
  
      const newTicket = {
        id: Date.now(),
        title,
        description,
        status,
        priority,
      };
      tickets.push(newTicket);
      saveTickets();
    });
  
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("ticketapp_session");
        alert("Logged out successfully.");
        window.location.href = "/auth/login";
      });
    }
  
    renderTickets();
  });
  