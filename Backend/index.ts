import env from "./src/config/env";
import express, { Request, Response } from "express";
import { connectToDB } from "./src/config/dbConnect";
import routes from "./src/routes/v1";
import { errorResponse } from "./src/utils/HttpResponse";
import { globalErrorHandler } from "./src/Middleware/globalErrorHandler";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import deSerializeUser from "./src/Middleware/deSerializeUser";
import http from "http";
import { Server } from "socket.io";
import { verifyJwt } from "./src/utils/Jwt";

(async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });
  app.use(bodyParser.json());
  const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
  };
  app.use(cors(corsOptions));

  app.use(express.static(path.join(__dirname, "uploads")));

  app.use(deSerializeUser);

  app.use("/api/v1", routes);

  io.use((socket, next) => {
    const token = socket.handshake.query.token as string;
    if (token) {
      const decodedToken = verifyJwt(token, "accessToken");
      if (!decodedToken) next(new Error("Authentication Error"));
      (socket as any).decoded = decodedToken;
      next();
    } else {
      next(new Error("Authentication Error"));
    }
  });

  io.on("connection", (socket) => {
    console.log("A user is connected");

    socket.on("newComment", (data) => {
      const { comment, productId } = data;
      console.log(`New comment for product ${productId}`, comment);
      const commentData = {
        user: (socket as any).decoded.username,
        profile:(socket as any).decoded.profileImage,
        comment,
        productId,
      };
      // socket.to(`product_${productId}`).emit("newComment", commentData); //i will not see my own msg
      io.to(`product_${productId}`).emit("newComment", commentData); 
    });

    socket.on("joinProduct", (productId) => {
      socket.join(`product_${productId}`);
      console.log("client joined to product", productId);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  app.all("*", (req: Request, res: Response) => {
    errorResponse({
      response: res,
      message: "Path not found",
      status: 404,
    });
  });

  app.use(globalErrorHandler);

  httpServer.listen(env.port, async () => {
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
