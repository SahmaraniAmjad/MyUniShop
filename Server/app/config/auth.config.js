module.exports = {
  JWT_KEY: "MyUniShopKey",
  EXPIRES_IN: "1h", //1 hour
  PASSWORD_RULES: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$&*])[0-9a-zA-Z!@#$&*]{8,}$/, //8 min length , one small, one capital one digit and one special char at least
};
