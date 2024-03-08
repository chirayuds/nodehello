import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
// Set up Global configuration access
dotenv.config();
import i18n from 'i18n';
import { authenticateToken } from './src/helpers/jwt.js';

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(
  express.json({
    limit: "200mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
app.use(bodyParser.urlencoded({ extended: true })); // To parse URL-encoded data


// Configure i18n
i18n.configure({
  locales: ["en", "fr"], // Supported languages
  directory: "src/locales",
  defaultLocale: "en", // Default language
  queryParameter: "lang", // URL query parameter for changing language (?lang=en)
  cookie: "language", // Cookie name to set the language
  autoReload: true,
  objectNotation: true,
});

app.use(i18n.init); // Initialize i18n for the app

// Importing route files
import testRoutes from './src/routes/test.js';

// Using the imported routes
app.use("/v1/test", testRoutes);

// Middleware to handle 404 errors
app.use(authenticateToken, (req, res, next) => {
  res.status(404).json({ message: "Resource not found" });
});

process.on("uncaughtException", function (err) {
  // Handle the error safely
  console.log(err);
});

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT} ...`);
});
