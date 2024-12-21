const express = require("express");
const app = express();

// Définir le port
const PORT = process.env.PORT || 3000;

// Route principale (page d'accueil)
app.get("/", (req, res) => {
  res.send("Microservice d'horodatage : utilisez l'API avec /api/:date?");
});

// API route
app.get("/api/:date?", (req, res) => {
  const dateParam = req.params.date;

  let date;
  if (!dateParam) {
    // Cas 7 et 8 : Pas de paramètre -> Date actuelle
    date = new Date();
  } else if (!isNaN(dateParam)) {
    // Cas 4 : Paramètre est un horodatage Unix
    date = new Date(parseInt(dateParam));
  } else {
    // Cas 5 : Tenter de convertir une chaîne de date
    date = new Date(dateParam);
  }

  // Cas 6 : Vérifier si la date est invalide
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Réponse en JSON avec unix et utc
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Le serveur tourne sur http://localhost:${PORT}`);
});
