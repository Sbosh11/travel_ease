import express from "express";

const app = express();

// get a list of all users
app.get("/users", (req, res) => {
  res.send([
    {
      id: 1,
      name: "Test 1",
      age: 20,
    },
    {
      id: 2,
      name: "Test 2",
      age: 22,
    },
  ]);
});
const port = process.env.PORT || 8080;
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
