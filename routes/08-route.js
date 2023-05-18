const express = require("express");
const router = express.Router();
const controller = require("../controllers/controllers");
// No modifiques nada arriba de esta línea

// Escribe la lógica de las rutas acá
router.post("/cat", (req, res) => {
  const name = req.body.name;
  const existingCat = controller.testCats().find((cat) => cat.name === name);

  if (existingCat) {
    return res.status(400).json({ error: "El gato o gata ya existe" });
  } else {
    const newCat = {
      name,
      age: "1 year",
      color: [],
      accessories: [],
    };
    controller.addCat(newCat);
    return res.status(200).json({ cat: newCat });
  }
});
// No modifiques nada debajo de esta línea
module.exports = router;
