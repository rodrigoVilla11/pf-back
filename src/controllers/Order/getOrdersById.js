const Order = require("../../models/Order");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const getOrdersById = async (req, res) => {
  const { token } = req.params;
  try {
    const userId = jwt.verify(token, process.env.SECRET_KEY_JWT);
    if (!userId) throw Error("No estas logueado");

    const order = await Order.find({ user: userId.userId }).populate(
      "shoppingCart",
      {
        title: 1,
        image: 1,
        punctuations: 1,
        price: 1,
        stock: 1,
        condition: 1,
        enable: 1,
      }
    );
    let finalOrders = [];
    for (element of order) {
      let eachOrder = {};
      const SC = element.shoppingCart;
      const user = element.user;
      const created = element.createdAt;
      const id = element._id;

      let contador = {};
      for (let i = 0; i < SC.length; i++) {
        let elemento = JSON.stringify(SC[i]);
        contador[elemento] = (contador[elemento] || 0) + 1;
      }

      const allShoppingCart = [];

      for (element of SC) {
        let elementoString = JSON.stringify(element);
        let elementoObjeto = JSON.parse(elementoString);
        elementoObjeto.cantidadCarrito = contador[elementoString];
        allShoppingCart.push(elementoObjeto);
      }

      const ShoppingCartToShow = [];

      for (const element of allShoppingCart) {
        let isDuplicate = ShoppingCartToShow.some(
          (item) => item._id === element._id
        );
        if (!isDuplicate) {
          ShoppingCartToShow.push(element);
        }
      }
      eachOrder._id = id;
      eachOrder.user = user;
      eachOrder.created = created;
      eachOrder.shoppingCart = ShoppingCartToShow;
      finalOrders.push(eachOrder);
    }

    res.status(200).json({ orders: finalOrders });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = getOrdersById;
