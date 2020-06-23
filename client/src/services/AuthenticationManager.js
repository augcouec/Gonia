export default {
  saveCredentials(credentials) {
    localStorage.setItem("user", JSON.stringify(credentials));
  },
  getRole() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.role : null;
  },
};
