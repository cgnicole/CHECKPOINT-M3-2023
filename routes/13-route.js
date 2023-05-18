const express = require("express");
const router = express.Router();
const controller = require("../controllers/controllers");
// No modifiques nada arriba de esta línea

// Escribe la lógica de las rutas acá
router.put("/accessories/update-popularity", (req, res) => {
  try {
    const updateAccessoryPopularity = controller.updateAccessoryPopularity(
      req.body.id
    );
    res.status(200).json({ message: updateAccessoryPopularity });
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

// No modifiques nada debajo de esta línea
module.exports = router;
