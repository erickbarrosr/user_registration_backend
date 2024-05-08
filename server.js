import "dotenv/config";
import app from "./app";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log();
  console.log(`> Server connected on http://localhost:${port}`);
});
