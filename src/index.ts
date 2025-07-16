import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from "express";
import router from "./routes";

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
// Error handler
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error("Error:", err.message);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
  });
});

app.listen(PORT, () => {
  console.log(`🐕 WalkMate API Server is running on port ${PORT}`);
});
