// import express from "express";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";
// import morgan from "morgan";
// import cors from "cors";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";
// import routes from "./app.js";
// import multer from "multer";
// import cookieParser from "cookie-parser";
// import './cron/dailyEmailSender.js';

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(cookieParser());

// // ✅ Fix `__dirname` for ES Module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// // ✅ Define `uploadDir` correctly
// const uploadDir = path.join(__dirname, "uploads");

// // ✅ Ensure "uploads" folder exists
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true }); // ✅ Create if not exists
//     console.log("✅ Uploads folder created!");
// } else {
//     console.log("✅ Uploads folder exists!");
// }


// // ✅ Serve static files from "uploads" folder
// app.use("/uploads", express.static(uploadDir));

// // ✅ Multer Configuration for Multiple File Uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadDir); // ✅ Use the existing "uploads" folder
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname)); // ✅ Unique filename
//     }
// });

// const upload = multer({ storage: storage });

// // ✅ Proper CORS Configuration
// app.use(
//     cors({
//         origin: "*", // Sabhi origins allowed hain
//         methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // ✅ Specific HTTP methods allow kar rahe hain
//         allowedHeaders: ["Content-Type", "Authorization"], // ✅ Required headers allow karein
//         credentials: true, // ✅ Agar cookies allow karni hain
//     })
// );

// app.use(morgan("dev"));
// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// app.use(cookieParser());

// app.use(routes);

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });





import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./app.js";
import multer from "multer";
import cookieParser from "cookie-parser";
import './cron/dailyEmailSender.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// -----------------------------------------------------
// ✅ ICS Proxy + Health Check (added safely, nothing touched)
// -----------------------------------------------------

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: "ok", message: "ICS Proxy Server is running" });
});

// ICS Proxy endpoint
app.get('/api/ics-proxy', async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        error: "Missing required parameter: url",
        message: "Please provide ICS URL using /api/ics-proxy?url=YOUR_URL"
      });
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return res.status(400).json({
        error: "Invalid URL",
        message: "Provided URL is not valid"
      });
    }

    console.log(`Fetching ICS from: ${url}`);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "text/calendar, text/plain, */*",
        "User-Agent": "Mozilla/5.0"
      },
      timeout: 30000,
    });

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Failed to fetch ICS file",
        message: `HTTP ${response.status}: ${response.statusText}`,
        url
      });
    }

    const text = await response.text();

    if (!text || text.trim().length === 0) {
      return res.status(500).json({
        error: "Empty ICS file",
        message: "ICS file returned is empty"
      });
    }

    res.setHeader("Content-Type", "text/calendar; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "public, max-age=300");

    res.send(text);

  } catch (error) {
    console.error("ICS Fetch Error:", error);

    if (error.code === "ETIMEDOUT") {
      return res.status(504).json({
        error: "Timeout",
        message: "Fetching ICS file timed out"
      });
    }

    res.status(500).json({
      error: "Internal server error",
      message: error.message
    });
  }
});

// -----------------------------------------------------
// 🔥 YOUR ORIGINAL CODE (NOT TOUCHED)
// -----------------------------------------------------

app.use(cookieParser());

// Fix dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("✅ Uploads folder created!");
} else {
  console.log("✅ Uploads folder exists!");
}

// Serve static uploads
app.use("/uploads", express.static(uploadDir));

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// CORS Config
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// Main routes
app.use(routes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📅 ICS Proxy: http://localhost:${PORT}/api/ics-proxy?url=YOUR_ICS_URL`);
});
