export function login(email, password) {
  // Fake authentication
  if (email === "admin@example.com" && password === "admin123") {
    localStorage.setItem("admin-auth", "true");
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem("admin-auth");
}

export function isLoggedIn() {
  return (
    typeof window !== "undefined" &&
    localStorage.getItem("admin-auth") === "true"
  );
}
