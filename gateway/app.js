import express from "express";
import expressProxy from "express-http-proxy";
const app = express();
// app.use("/user", expressProxy("http://localhost:3001/user"));
// app.use("/captain", expressProxy("http://localhost:3002/captain"));
// app.use("/ride", expressProxy("http://localhost:3003/ride"));
app.use(
    "/user",
    expressProxy("http://localhost:3001", {
        proxyReqPathResolver: (req) => `/user${req.url}`,
    })
);
app.use(
    "/captain",
    expressProxy("http://localhost:3002", {
        proxyReqPathResolver: (req) => `/captain${req.url}`,
    })
);
app.use(
    "/ride",
    expressProxy("http://localhost:3003", {
        proxyReqPathResolver: (req) => `/ride${req.url}`,
    })
);

app.listen(3000, () =>
    console.log("Gateway service is running on port 3000....")
);
