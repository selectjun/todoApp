module.exports = {
  isEmpty: (value) => {
    return value.trim() === "" || value === null;
  },
  isEmail: (email) => {
    return /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(email);
  },
  isPassword: (password) => {
    let condition = 0;

    if (/[$@$!%*?&]{1}/.test(password)) { condition++; }
    if (/[A-Z]{1}/.test(password)) { condition++; }
    if (/[a-z]{1}/.test(password)) { condition++; }
    if (/\d{1}/.test(password)) { condition++; }

    console.log(condition);

    return condition >= 2 && password.length >= 8;
  }
}