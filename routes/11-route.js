const express = require("express");
const router = express.Router();
const controller = require("../controllers/controllers");
// No modifiques nada arriba de esta línea

// Escribe la lógica de las rutas acá

router.post("/accessories", (req, res) => {
  let obj = req.body;

  try {
    controller.addAccessory(obj);
    res
      .status(201)
      .send({ message: `El accesorio ${obj.type} fue agregado correctamente` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// No modifiques nada debajo de esta línea
module.exports = router;
