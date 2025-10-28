function protectRoute() {
    const session = localStorage.getItem("ticketapp_session");
    if (!session) {
      window.location.href = "/auth/login";
    }
  }
  
  protectRoute();