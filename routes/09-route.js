const express = require("express");
const router = express.Router();
const controller = require("../controllers/controllers");
// No modifiques nada arriba de esta línea

// Escribe la lógica de las rutas acá
router.get("/accessories", (req, res) => {
  const { type, color } = req.query;
  res.status(200).json(controller.getAccessories(type, color));
});
// No modifiques nada debajo de esta línea
module.exports = router;

/*router.get("/accessories", (req, res) => {
  const { type, color } = req.query;

  if (type || color) {
    return res.status(200).send(controller.getAccessories(type, color));
  }
  res.status(200).send(controller.getAccessories());
});*/
