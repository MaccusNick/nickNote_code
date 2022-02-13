const fs = require("fs");
const path = require("path");

// const mockBaseURL = "http://localhost:3000";
const mockBaseURL = "https://note-server.hunger-valley.com/"; //本地Mock地址
const realBaseURL = "https://note-server.hunger-valley.com/"; //服务器地址

exports.config = function({ isDev = true } = { isDev: true }) {
  let fileTxt = `
    module.exports = {
        baseURL:"${isDev ? mockBaseURL : realBaseURL}"
    }
    `;

  fs.writeFileSync(
    path.join(__dirname, "../src/helpers/config-baseURL.js"),
    fileTxt
  );
};
