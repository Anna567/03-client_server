import express from "express";  
import cors from "cors";  
import dotenv from "dotenv"; 
import helloRoutes from "./routes/hello.routes"; 

dotenv.config(); 
const app = express();  
const PORT = process.env.PORT || 3000;  

// Middleware 
app.use(cors()); 
app.use(express.json());  

// Routen
app.use("/api", helloRoutes); 
app.get("/", (req, res) => {
  res.send("Server läuft! Willkommen beim Projekt '03-client_server'");
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
  });


  // Test1
