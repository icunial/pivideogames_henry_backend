const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// Initialized Express Server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
})