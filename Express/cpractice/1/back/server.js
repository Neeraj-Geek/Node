import express from "express";
import cors from "cors";
const app = express();

const port = 3000;
app.use(cors());
const userDate = [
  {
    username: "Sunny Kumar",
    email: "sunny@example.com",
    phone: "+91 12345 67890",
    location: "Patiala, India",
  },
  {
    username: "Amit Sharma",
    email: "amit.sharma@example.com",
    phone: "+91 98765 43210",
    location: "Chandigarh, India",
  },
  {
    username: "Riya Verma",
    email: "riya.verma@example.com",
    phone: "+91 87654 32109",
    location: "Delhi, India",
  },
  {
    username: "Karan Singh",
    email: "karan.singh@example.com",
    phone: "+91 76543 21098",
    location: "Mumbai, India",
  },
  {
    username: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "+91 65432 10987",
    location: "Ahmedabad, India",
  },
];

app.get("/api/users", (req, res) => {
  console.log("Request received at /api/user");
  res.json(userDate);
});

app.listen(port, () => {
  console.log(`server up! at ${port}`);
});
