const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const port = 3001;

const publicFolderPath = "../public";

app.use(cors());

app.get("/api/images", (req, res) => {
  fs.readdir(publicFolderPath, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    const imageFiles = files.filter((file) => /\.(jpg|jpeg|png)$/i.test(file));
    return res.json(imageFiles);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
