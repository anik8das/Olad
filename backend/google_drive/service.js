const { google } = require("googleapis");
const path = require("path");

const getDriveService = () => {
  const KEYFILEPATH = path.join(__dirname, "service.json");
  const SCOPES = ["https://www.googleapis.com/auth/drive"];

  const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
  });
  const driveService = google.drive({ version: "v3", auth });
  return driveService;
};

module.exports = getDriveService;
