const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let pedidos = [];

app.post("/comprar", (req, res) => {
    const { carrito } = req.body;

    if (!carrito || carrito.length === 0) {
        return res.status(400).json({ mensaje: "El carrito está vacío." });
    }

    pedidos.push({ id: pedidos.length + 1, productos: carrito });
    
    res.json({ mensaje: "Compra realizada con éxito", pedido: pedidos });
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => console.log("Servidor en http://localhost:3000"));