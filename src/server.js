const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());

// routes
app.use("/", require("./routes"));

app.listen(PORT, () =>
	console.log(`Server running at http://localhost:${PORT}`)
);
