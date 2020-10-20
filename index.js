const express = require('express');
const app = express();
const fs = require('fs');
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");

app.use(express.json());
app.set("json spaces", 2);
app.use("/users", usersRoute);
app.use("/posts", postsRoute);

app.listen(3000);

