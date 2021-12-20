//export const API = 'http://myunishop.eu-central-1.elasticbeanstalk.com';
require("dotenv").config();

const port = process.env.SERVER_PORT || 8080;
export const API = `http://localhost:${port}`;
