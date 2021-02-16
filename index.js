import express from "express";
import killerContent from "./killer-content.js";

const app = express();
const port = 3000;

app.get("/", (request, response) => {
  const searchTerm = request.query.search?.toLowerCase() || "";
  const minRating = Number(request.query.minrating) || 0;
  const maxRating = Number(request.query.maxrating) || 5;
  let filteredContent = [...killerContent];

  // if (isNaN(minRating) || isNaN(maxRating)) {
  //   response.status(400).json({
  //     message: `${minRating || maxRating} is not a valid rating`,
  //     results: [],
  //   });
  //   return;
  // }

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

  if (minRating && maxRating) {
    filteredContent = filteredContent.filter(
      (content) => content.rating >= minRating && content.rating <= maxRating
    );
  }

  response.json({ results: filteredContent });
});

app.listen(port, () => console.log(`API is running on port ${port}`));
