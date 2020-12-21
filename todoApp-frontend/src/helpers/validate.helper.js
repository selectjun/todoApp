module.exports = {
  isEmpty: (value) => {
    return value.trim() === "" || value === null;
  },
  isEmail: (email) => {
    return /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(email);
  }
}