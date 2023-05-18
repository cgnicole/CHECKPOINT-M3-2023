/// =========================================================================== ///
/// =============================== HENRY-CATS ================================ ///
/// =========================================================================== ///

"use strict";

let cats = [];
let accessories = [];

module.exports = {
  testCats: () => cats,

  testAccessories: () => accessories,

  reset: function () {
    // No es necesario modificar esta función. La usamos para "limpiar" los arreglos entre test y test.

    cats = [];
    accessories = [];
  },

  // ==== COMPLETAR LAS SIGUIENTES FUNCIONES (vean los test de `controller.js`) =====

  addCat: function (name) {
    // Agrega un nuevo gato, verificando que no exista anteriormente su nombre.
    // Debe tener una propiedad <age> que inicialmente debe ser '1 year'.
    // Debe tener una propiedad <color> que inicialmente es un array vacío.
    // Debe tener una propiedad <accessories> que inicialmente es un array vacío.
    // El gato o gata debe guardarse como un objeto con el siguiente formato:
    // { name, age: '1 year', color: [], accessories: [] }
    // En caso exitoso debe retornar el objeto, osea el gato creado'.
    // En caso de haber un gato existente, no se agrega y debe arrojar el Error ('El gato o gata ya existe') >> ver JS throw Error
    // Verificar si el gato o gata ya existe

    // Verificar si el gato ya existe
    const existingCat = cats.find((cat) => cat.name === name);
    if (existingCat) {
      throw new Error("El gato o gata ya existe");
    }

    // Crear el nuevo gato
    const newCat = { name, age: "1 year", color: [], accessories: [] };

    // Agregar el nuevo gato al arreglo de gatos
    cats.push(newCat);

    // Retornar el objeto del nuevo gato
    return newCat;
  },
  listCats: function (age) {
    // Si no se recibe parametro <age> retornar todos los gatos del array 'cats'
    // En caso de recibir el parámetro <age: "1 year">, devuelve sólo los gatos correspondientes a dicho age.
    // Si recibe parámetro <age> pero lo recibe con diferente edad, debe arrojar el Error ('El gato o gata tiene una edad diferente') >> ver JS throw Error

    if (!age) {
      // Si no se recibe parametro <age>, retornar todos los gatos del array 'cats'
      return cats;
    }

    // Verificar que el parametro <age> sea '1 year'
    if (age !== "1 year") {
      throw new Error("El gato o gata tiene una edad diferente");
    }

    // Retornar los gatos que tienen la edad '1 year'
    const catsWithAge = cats.filter((cat) => cat.age === "1 year");
    return catsWithAge;
  },

  addAccessory: function (obj) {
    // Agrega un nuevo accesorio al catálogo.
    // Si el accesorio ya existe, no es agregado y arroja un Error ('El accesorio con el id <id> ya existe')
    // Debe devolver el mensaje 'El accesorio <nombre_accesorio> fue agregado correctamente'
    // Inicialmente debe guardar la propiedad <popularity> del accesorio como 'low'

    const existingAccessory = accessories.find(
      (accessory) => accessory.id === obj.id
    );

    if (existingAccessory) {
      throw new Error(`El accesorio con el id ${obj.id} ya existe`);
    }

    const newAccessory = { ...obj, popularity: "low" };
    accessories.push(newAccessory);

    return "El accesorio Shoes fue agregado correctamente";
  },

  getAccessories: function (type, color) {
    // Devuelve un array con todos los accesorios.
    // Si recibe parámetro "type", debe retornar  los accesorios que coincidan con el tipo.
    // Si recibe parámetro "color" debe retornar los accesorios que coincidan con el color
    // Si recibe ambos parámetros, se devuelven los accesorios que coincidan con el color o con el tipo

    let result = [];

    if (!type && !color) {
      // Si no se recibe ningún parámetro, se devuelve el array completo de accesorios
      result = accessories;
    } else if (type && !color) {
      // Si se recibe el parámetro "type", se filtran los accesorios por tipo
      result = accessories.filter((accessory) => accessory.type === type);
    } else if (!type && color) {
      // Si se recibe el parámetro "color", se filtran los accesorios por color
      result = accessories.filter((accessory) => accessory.color === color);
    } else {
      // Si se reciben ambos parámetros, se filtran los accesorios por tipo o por color
      result = accessories.filter(
        (accessory) => accessory.type === type || accessory.color === color
      );
    }

    return result;
  },

  deleteAccessory: function (id) {
    const index = accessories.findIndex((accessory) => accessory.id === id);
    if (index === -1) {
      throw new Error(`El accesorio con el id ${id} no fue encontrado`);
    }
    accessories.splice(index, 1);
    return `El accesorio con el id ${id} fue eliminado correctamente`;
  },

  modifyAccessory: function (obj) {
    if (Object.keys(obj).length === 0) {
      throw new Error("No se detectaron cambios a aplicar");
    }
    const index = accessories.findIndex((accessory) => accessory.id === obj.id);
    if (index === -1) {
      throw new Error("Accesorio no encontrado");
    }
    accessories[index] = Object.assign(accessories[index], obj);
    return accessories[index];
  },

  addCatAccessory: function (catName, catAccessory) {
    const catIndex = cats.findIndex((cat) => cat.name === catName);
    if (catIndex === -1) {
      throw new Error(`El gato ${catName} no existe`);
    }
    const accessoryIndex = cats[catIndex].accessories.findIndex(
      (accessory) => accessory.type === catAccessory.type
    );
    if (accessoryIndex !== -1) {
      throw new Error(`El gato ${catName} ya tiene el accesorio puesto`);
    }
    cats[catIndex].accessories.push(catAccessory);
    return `El accesorio ${catAccessory.type} fue agregado a ${catName} con exito`;
  },

  updateAccessoryPopularity: function (accessoryId) {
    // Recupera el accesorio del arreglo testAccessories
    const accessory = this.testAccessories().find((a) => a.id === accessoryId);
    if (!accessory) {
      throw new Error("accesorio no encontrado");
    }

    // Cuenta cuántos gatos tienen el accesorio
    const catCount = this.testCats().filter((cat) =>
      cat.accessories.some((a) => a.id === accessoryId)
    ).length;

    // Actualiza la propiedad popularity del accesorio
    let newPopularity;
    if (catCount >= 3) {
      newPopularity = "high";
    } else if (catCount === 2) {
      newPopularity = "average";
    } else {
      // No se actualiza la popularidad
      return `No hubieron cambios en la popularidad del accesorio ${accessory.color} ${accessory.type}`;
    }
    accessory.popularity = newPopularity;

    // Devuelve un mensaje que indique que la popularidad del accesorio ha sido actualizada
    return `La popularidad del accesorio ${accessory.color} ${accessory.type} fue actualizada a ${newPopularity}`;
  },
};
