import APP from "./src/app.js";

const port = process.env.APP_PORT || 9001;

APP.listen(port, () => {
  console.log(`App is running on port http://localhost:${port}`);
});

