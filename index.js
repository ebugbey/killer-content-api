import express from "express";
import killerContent from "./killer-content.js";

const app = express();
const port = 3000;

app.get("/", (request, response) => {
  const searchTerm = request.query.search?.toLowerCase() || "";
  let minRating = Number(request.query.minrating);
  let maxRating = Number(request.query.maxrating);
  let filteredContent = [...killerContent];

  if (request.query.minrating !== undefined && isNaN(minRating)) {
    response.status(400).json({
      message: `Invalid minrating: ${request.query.minrating}`,
      results: [],
    });
    return;
  }
  if (request.query.maxrating !== undefined && isNaN(maxRating)) {
    response.status(400).json({
      message: `Invalid maxrating: ${request.query.maxrating}`,
      results: [],
    });
    return;
  }

  minRating = minRating || 0;
  maxRating = maxRating || 5;

  if (searchTerm) {
    filteredContent = filteredContent.filter(
      (content) =>
        content.title.toLowerCase().includes(searchTerm) ||
        content.description.toLowerCase().includes(searchTerm)
    );
  }

  if (minRating) {
    filteredContent = filteredContent.filter(
      (content) => content.rating >= minRating
    );
  }

  if (maxRating) {
    filteredContent = filteredContent.filter(
      (content) => content.rating <= maxRating
    );
  }

  response.json({ results: filteredContent });
});

app.listen(port, () => console.log(`API is running on port ${port}`));
