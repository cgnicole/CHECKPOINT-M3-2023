const express = require("express");
const router = express.Router();
const controller = require("../controllers/controllers");
// No modifiques nada arriba de esta línea

// Escribe la lógica de las rutas acá
router.put("/accessories", (req, res) => {
  const modifiedAccessory = req.body;

  // Si no se proporciona información en el cuerpo de la solicitud, responde con un error
  if (Object.keys(modifiedAccessory).length === 0) {
    return res
      .status(404)
      .json({ error: "No se detectaron cambios a aplicar" });
  }

  // Encuentra el accesorio en la lista y actualiza sus valores
  const accessories = controller.testAccessories();
  const index = accessories.findIndex(
    (accessory) => accessory.id === modifiedAccessory.id
  );

  if (index === -1) {
    // Si el accesorio no se encuentra en la lista, responde con un error
    return res.status(404).json({ error: "Accesorio no encontrado" });
  } else {
    // Actualiza el accesorio con los valores proporcionados en el cuerpo de la solicitud
    accessories[index] = { ...accessories[index], ...modifiedAccessory };
    // Responde con el accesorio modificado
    return res.status(200).json(accessories[index]);
  }
});

// No modifiques nada debajo de esta línea
module.exports = router;
