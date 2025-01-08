import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import fetch from "node-fetch"; // Use node-fetch for making HTTP requests

dotenv.config(); // Load environment variables

const app = express();
app.use(cors({
  origin: "*", // Allows all origins, can replace "*" with a specific domain if needed
  methods: ["GET", "POST"], // Allow only certain HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Specify which headers are allowed
}));

app.use(bodyParser.json()); // Parse JSON body from requests

const JOOBLE_API_URL = "https://jooble.org/api/";
const JOOBLE_API_KEY = process.env.JOOBLE_API_KEY; // Store Jooble API key in a .env file
app.get("/", async (req, res) => {
  res.status(200).json({message:"succefful"})
  })
// Endpoint to fetch jobs from Jooble API
app.get("/api/jobs", async (req, res) => {
  const { keywords = "it", location = "america" } = req.query;

  const params = {
    keywords,
    location
  };

  try {
    // Make a POST request to the Jooble API using fetch
    const response = await fetch(`${JOOBLE_API_URL}${JOOBLE_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`Jooble API Error: ${response.statusText}`);
    }

    const data = await response.json(); // Parse the JSON response
    res.json(data); // Return the response to the client

  } catch (error) {
    console.error("Error fetching jobs from Jooble:", error);
    res.status(500).json({ error: "Error fetching jobs from Jooble" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
