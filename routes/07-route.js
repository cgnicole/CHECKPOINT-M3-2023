const express = require("express");
const router = express.Router();
const controller = require("../controllers/controllers");
// No modifiques nada arriba de esta línea

// Escribe la lógica de tu ruta GET /cats acá
router.get("/cats", (req, res) => {
  const ageQueryParam = req.query.age; // Obtener el valor del query parameter 'age'
  const allCats = controller.testCats(); // Obtener todos los gatos desde el controlador

  if (!ageQueryParam) {
    // Si no se proporcionó un valor para el query parameter 'age'
    res.status(200).json(allCats); // Devolver todos los gatos
  } else {
    // Si se proporcionó un valor para el query parameter 'age'
    const filteredCats = allCats.filter((cat) => cat.age === ageQueryParam); // Filtrar los gatos por edad

    if (filteredCats.length > 0) {
      // Si se encontraron gatos que cumplen con la edad proporcionada
      res.status(200).json(filteredCats); // Devolver los gatos filtrados
    } else {
      // Si no se encontraron gatos que cumplan con la edad proporcionada
      res
        .status(400)
        .json({ error: "El gato o gata tiene una edad diferente" }); // Devolver un error 400 con un mensaje adecuado
    }
  }
});

// No modifiques nada debajo de esta línea
module.exports = router;
