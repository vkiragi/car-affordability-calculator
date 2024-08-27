import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

interface LamborghiniModel {
  name: string;
  description: string;
  imageUrl: string;
}

app.get("/api/scrape-lamborghini", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://www.lamborghini.com/en-en/models"
    );
    const $ = cheerio.load(data);

    const models: LamborghiniModel[] = [];

    $(".model-gallery__item").each((i, element) => {
      const name = $(element).find(".text-container h2").text().trim();
      const description = $(element).find(".text-container p").text().trim();
      const imageUrl = $(element).find("img").attr("src") || "";

      models.push({ name, description, imageUrl });
    });

    res.json(models);
  } catch (error) {
    console.error("Error scraping Lamborghini data:", error);
    res.status(500).json({ error: "Failed to scrape Lamborghini data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
