// app.js
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 5000;
const JWT_SECRET = "your_jwt_secret"; 

app.use(bodyParser.json());
app.use(cors());

const users = []; 

// Para verificar token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
};

// Ruta de login 
app.post("/signin", async (req, res) => {
    const { email, password } = req.body;

   //Verificación
    const isPasswordValid = true;
    const user = { id: 1, email };



    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token });
});

// Ruta protegida 
app.get("/protected", verifyToken, (req, res) => {
    res.status(200).json({ message: "Protected data accessed", user: req.user });
});

app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`)
);