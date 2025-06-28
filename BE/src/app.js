import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import morgan from "morgan";

config();

import { connectDB } from "./config/db.js";
import { createProduct } from "./controllers/products.js";
import { createVariant, removeVariant } from "./controllers/variant.js";
import routerAddress from "./routers/Address.js";
import routerOrder from "./routers/Order.js";
import attributeRouter from "./routers/attribute.router.js";
import attributeValueRouter from "./routers/attributevalue.js";
import routerCart from "./routers/cart.js";
import routerCategory from "./routers/category.js";
import productRouter from "./routers/product.router.js";
import routerVoucher from "./routers/voucher.js";

import http from "http"; // Sử dụng http để kết nối Express và Socket.IO
import { setupSocketIO } from "./controllers/socket.js";
import logoRouter from "./routers/Logo.js";
import NotificationRouter from "./routers/Notification.js";
import PaymentRouter from "./routers/PaymentRouter.js";
import userRouter from "./routers/Users.js";
import BlogRouter from "./routers/blog.js";
import commentRouter from "./routers/comment.js";
import conversationRouter from "./routers/conversation.js";
import dashboardRouter from "./routers/dashboard.js";
import sendEmailRouter from "./routers/send-email.js";
import sliderRouter from "./routers/slider.js";
import wishlistRouter from "./routers/wishlist.js";

const app = express();

// Tạo HTTP server từ app Express
const server = http.createServer(app);

// Khởi tạo Socket.IO và cấu hình CORS thông qua module socket.js
setupSocketIO(server, app);

//Middleware
app.use(express.json());

app.use(cors());

app.use(morgan("dev"));
/// connect DB
connectDB(process.env.DB_URI);
//Router
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// ================ tạo địa chỉ  ===========
app.use("/api", routerAddress);
// ================ order ===========
app.use("/api", routerOrder);

//routers
app.use("/api", productRouter);
app.use("/api", attributeRouter);
app.use("/api", attributeValueRouter);
app.use("/api", PaymentRouter);
app.use("/api", routerCategory);
app.use("/api", routerCart);
app.use("/api", routerVoucher);
app.post("/api/products/add", createProduct);
app.post("/api/variant/add", createVariant);
app.delete("/api/variant/:id", removeVariant);
// Sử dụng Router gửi email
app.use("/api", sendEmailRouter);
app.use("/api/sliders", sliderRouter);
app.use("/api/logo", logoRouter);
app.use("/api/blogs", BlogRouter);
app.use("/api/notifications", NotificationRouter);
app.use("/api/users", userRouter);
app.use("/api/comment", commentRouter);
app.use("/api", wishlistRouter);
app.use("/api/dashboard", dashboardRouter);

app.use("/api/conversation", conversationRouter);

app.get("/wakeup", (req, res) => {
  res.status(200).send("wakeup");
});

// Khởi động server
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
