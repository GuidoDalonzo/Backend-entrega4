const express = require("express");
const { Router } = express;
const router = Router();
const fs = require("fs");
const Productos = require("./Productos.js");

/* -------------------------------------------------------------------------- */
/*                                     Routes                                 */
/* -------------------------------------------------------------------------- */
router
  .route("/productos")
  .get((req, res) => {
    try {
      Productos.getAll().then((data) => {
        res.send(data);
      });
    } catch (err) {
      console.log(err);
    }
  })
  .post((req, res) => {
    try {
      const newProducto = req.body;
      Productos.save(newProducto);
      res.json(newProducto);
    } catch (err) {
      console.log(err);
    }
  });

router
  .route("/productos/:id")
  .get((req, res) => {
    try {
      Productos.getById(req.params.id).then((data) => {
        res.send(data);
      });
    } catch (err) {
      console.log(err);
    }
  })

  .put((req, res) => {
    let id = req.params.id - 1;
    try {
      const baseDatos = JSON.parse(
        fs.readFileSync("./listaProductos.json", "utf8")
      );
      baseDatos[id]["modelo"] = req.body.modelo;
      baseDatos[id]["marca"] = req.body.marca;
      baseDatos[id]["precio"] = req.body.precio;
      console.log(baseDatos[req.params.id]);
      fs.writeFileSync(
        "./listaProductos.json",
        JSON.stringify(baseDatos, null, 2)
      );
      fs.writeFileSync(
        "./listaProductos.txt",
        JSON.stringify(baseDatos, null, 2)
      );
      res.send(baseDatos);
    } catch (err) {
      console.log(err);
    }
  })
  .delete((req, res) => {
    try {
      Productos.deleteById(req.params.id - 1);
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
