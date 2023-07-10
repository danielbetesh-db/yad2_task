import cron from "node-cron";
import cors from "cors";
import express from "express";
import axios from "axios";
import { ApiResponse } from "./types";
import { JsonFileManager } from "./db";

const app = express();
const port = 3001;

app.use(cors());

const db = new JsonFileManager("src/db/database.json");

//Read on start
readAttractions();

cron.schedule(
  "0 0 * * *",
  async () => {
    console.log("Updating the database...");

    const data = await readAttractions();
    if (data) {
      db.write(data);
    }
  },
  {
    scheduled: true,
    timezone: "Asia/Jerusalem",
  }
);

app.get("/", async (req, res) => {
  const data = db.read();
  res.json(data);
});

async function readAttractions() {
  const resource_id = "967a8a23-c08c-4c47-b39d-ce350537821b";
  const limit = 40;
  try {
    const result = await axios.get(
      `https://data.gov.il/api/3/action/datastore_search?resource_id=${resource_id}&limit=${limit}`
    );

    return result.data as ApiResponse;
  } catch (e) {
    console.log("Error", e);
  }
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
