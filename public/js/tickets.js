function protectRoute() {
  const session = localStorage.getItem("ticketapp_session");
  if (!session) {
    window.location.href = "/auth/login";
  }
}


document.addEventListener("DOMContentLoaded", () => {
  protectRoute();

  const listContainer = document.querySelector("#ticket-list");
  const createBtn = document.querySelector("#create-ticket-btn");
  const logoutBtn = document.querySelector("#logout-btn");
  const modal = document.querySelector("#ticket-modal");
  const closeModal = document.querySelector("#close-modal");
  const form = document.querySelector("#ticket-form");
  const confirmModal = document.querySelector("#confirm-modal");
  const cancelDelete = document.querySelector("#cancel-delete");
  const confirmDelete = document.querySelector("#confirm-delete");
  const toastContainer = document.querySelector("#toast-container");

  let tickets = JSON.parse(localStorage.getItem("ticketapp_tickets") || "[]");
  let editingId = null;
  let deleteId = null;

  const showToast = (msg, type = "info") => {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = msg;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

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
      </div>`
      )
      .join("");

    document.querySelectorAll(".edit-btn").forEach((btn) =>
      btn.addEventListener("click", (e) => {
        const id = +e.target.dataset.id;
        const t = tickets.find((x) => x.id === id);
        editingId = id;
        modal.querySelector("#modal-title").textContent = "Edit Ticket";
        form["ticket-title"].value = t.title;
        form["ticket-desc"].value = t.description;
        form["ticket-status"].value = t.status;
        form["ticket-priority"].value = t.priority;
        modal.classList.remove("hidden");
      })
    );

    document.querySelectorAll(".delete-btn").forEach((btn) =>
      btn.addEventListener("click", (e) => {
        deleteId = +e.target.dataset.id;
        confirmModal.classList.remove("hidden");
      })
    );
  };

  // ✅ Event handlers
  createBtn.addEventListener("click", () => {
    editingId = null;
    form.reset();
    modal.querySelector("#modal-title").textContent = "Create Ticket";
    modal.classList.remove("hidden");
  });

  closeModal.addEventListener("click", () => modal.classList.add("hidden"));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = form["ticket-title"].value.trim();
    const desc = form["ticket-desc"].value.trim();
    const status = form["ticket-status"].value;
    const priority = form["ticket-priority"].value;

    if (!title || !desc) {
      showToast("Please fill all fields", "error");
      return;
    }

    if (editingId) {
      tickets = tickets.map((t) =>
        t.id === editingId ? { ...t, title, description: desc, status, priority } : t
      );
      showToast("Ticket updated successfully", "success");
    } else {
      tickets.push({ id: Date.now(), title, description: desc, status, priority });
      showToast("Ticket created successfully", "success");
    }

    saveTickets();
    modal.classList.add("hidden");
  });

  cancelDelete.addEventListener("click", () =>
    confirmModal.classList.add("hidden")
  );

  confirmDelete.addEventListener("click", () => {
    tickets = tickets.filter((t) => t.id !== deleteId);
    saveTickets();
    confirmModal.classList.add("hidden");
    showToast("Ticket deleted", "info");
  });

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("ticketapp_session");
    showToast("Logged out successfully", "success");
    setTimeout(() => (window.location.href = "/auth/login"), 1000);
  });

  renderTickets();
});
