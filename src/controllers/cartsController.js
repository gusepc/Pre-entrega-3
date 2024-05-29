import cartsServices from "../services/cartService.js";
import userServices from "../services/usersService.js";

async function addCart(req, res) {
  try {
    let carts = await cartsServices.addCart();
    res.send({ result: "succes", payload: carts });
  } catch (error) {
    res.send("no se pudo completar tu peticion");
  }
}

async function cartById(req, res) {
  try {
    const cId = req.params.cid;
    console.log(cId);
    let cartById = await cartsServices.cartById(cId);
    if (cartById) {
      console.log(cartById);
      res.send(cartById);
    } else {
      res.send(`Lo sentimos, el carrito con id:"${req.params.cid}" no existe`);
    }
  } catch (error) {
    res.send("no se pudo completar tu peticiooooon");
  }
}

async function updateCart(req, res) {
  try {
    const user = String(req.session.passport.user);

    const cId = req.params.cid;
    const pId = req.params.id;
    const newQuantity = req.body.quantity;

    let updatedCart = await cartsServices.updateCart(cId, pId, newQuantity, user);
    res.send(updatedCart);
  } catch (error) {
    res.send("no se pudo completar tu petición");
  }
}

async function addToCart(req, res) {
  try {
    const user = await userServices.findOne({ email: `${req.session.user.email}` });
    const cId = req.params.cid;
    const products = req.body;
    let updatedCart = await cartsServices.addToCart(cId, products, user);
    res.send(updatedCart);
  } catch (error) {
    res.send("no se pudo completar tu petición");
  }
}

async function deleteProduct(req, res) {
  try {
    const cId = req.params.cid;
    const pId = req.params.pid;
    let deletedProduct = await cartsServices.deleteProduct(cId, pId);
    res.send(deletedProduct);
  } catch (error) {
    res.send("no se pudo completar tu petición");
  }
}

async function emptyCart(req, res) {
  try {
    const cId = req.params.cid;
    let emptyCart = await cartsServices.emptyCart(cId);
    res.send("Se vació tu carrito: " + emptyCart);
  } catch (error) {
    res.send("no se pudo completar tu petición");
  }
}

export default {
  addCart,
  cartById,
  updateCart,
  addToCart,
  deleteProduct,
  emptyCart,
};
