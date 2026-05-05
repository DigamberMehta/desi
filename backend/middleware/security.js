import express from "express";
import helmet from "helmet";
import compression from "compression";

const app = express();

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        scriptSrc: ["'self'"],
        connectSrc: ["'self'", "https://api.desilocks.com"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    crossOriginEmbedderPolicy: false,
  }),
);

// Compression middleware
app.use(compression());

// Static file serving with caching headers
app.use(
  express.static("public", {
    maxAge: "1d",
    setHeaders: (res, path) => {
      if (path.endsWith(".css") || path.endsWith(".js")) {
        res.setHeader("Cache-Control", "public, max-age=31536000");
      }
    },
  }),
);

export default app;
