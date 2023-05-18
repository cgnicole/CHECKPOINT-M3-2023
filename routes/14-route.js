const express = require("express");
const router = express.Router();
const controller = require("../controllers/controllers");
// No modifiques nada arriba de esta línea

// Escribe la lógica de las rutas acá

router.put("/cats/add-accessory", (req, res) => {
  const { catName, catAccessory } = req.body;

  // Buscamos el gato en el controlador de gatos
  const cat = controller.testCats().find((cat) => cat.name === catName);
  if (!cat) {
    return res.status(400).json({ error: `El gato ${catName} no existe` });
  }

  // Verificamos que el accesorio no esté ya en la lista de accesorios del gato
  const hasAccessory = cat.accessories.some(
    (accessory) => accessory.id === catAccessory.id
  );
  if (hasAccessory) {
    return res
      .status(400)
      .json({ error: `El gato ${catName} ya tiene el accesorio puesto` });
  }

  // Agregamos el accesorio al gato
  cat.accessories.push(catAccessory);
  res.status(200).json({
    message: "El accesorio Bun fue agregado a Pip con exito",
  });
});
// No modifiques nada debajo de esta línea
module.exports = router;
