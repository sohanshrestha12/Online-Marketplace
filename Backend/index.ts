import env from "./src/config/env";
import express, { Request, Response } from "express";
import { connectToDB } from "./src/config/dbConnect";
import routes from "./src/routes/v1";
import { errorResponse } from "./src/utils/HttpResponse";
import { globalErrorHandler } from "./src/Middleware/globalErrorHandler";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";

(async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.json());
  const corsOptions = {
    origin: true,
    credentials: true,
  };
  app.use(cors(corsOptions));

  app.use(express.static(path.join(__dirname, "uploads")));
  app.use("/api/v1", routes);

  app.all("*", (req: Request, res: Response) => {
    errorResponse({
      response: res,
      message: "Path not found",
      status: 404,
    });
  });

  app.use(globalErrorHandler);

  app.listen(env.port, async () => {
    await connectToDB();
    console.log(`http://localhost:${env.port}`);
  });

  process.on("SIGINT", () => {
    console.log("Shutting down server gracefully...");
    process.exit();
  });

  process.on("unhandledRejection", (reason, promise) => {
    console.log(
      JSON.stringify({
        message: `Unhandled Rejection at:,${promise}`,
        error: reason,
      })
    );
  });

  process.on("uncaughtException", (error) => {
    console.log(JSON.stringify({ message: `Uncaught Exception:,  ${error}` }));
  });
})();
