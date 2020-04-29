
import Firebase from '../config/firebase'

class CartService {
  registerCart(addParam){
    console.log("addparam", addParam);
    let cartRef;
    if(addParam.cartId != '')
      cartRef = Firebase.database().ref('carts/' + addParam.cartId);
    else{
      const newCartRef = Firebase.database().ref().child('carts').push();
      addParam.cartId = newCartRef.key;
      cartRef = Firebase.database().ref('carts/' + newCartRef.key);
    }
    return cartRef.set(addParam).then((res)=>{
      return addParam;
    }).catch();
  }

  updateCart(productlist, cartId){
    let cartRef = Firebase.database().ref('carts/' + cartId + '/products') ;
    return cartRef.set(productlist).then((res)=>{
      return productlist;
    }).catch();
  }
  updateProduct(addParam){
    let productRef = Firebase.database().ref('products/' + addParam.productId);
    return productRef.set(addParam).then((res)=>{
      return addParam;
    }).catch();
  }  
  
  updateCheckOutStatus(param){
    let cartRef = Firebase.database().ref('carts/' + param.cartId ) ;
    return cartRef.set(param).then((res)=>{
      return param;
    }).catch();
  }  
  getProducts(uid){
    var ref = Firebase.database().ref('products');
    return ref.once("value").then((snapshot) => {
      return snapshot;
    }).catch(err=> console.log(err));
  }  

  getProductsInCart(uid){
    var ref = Firebase.database().ref('carts');
    return ref.orderByChild('cart_uid').equalTo(uid).once("value").then((snapshot) => {
      return snapshot;
    }).catch(err=> console.log(err));
  }  
}
const cartService = new CartService();
export default cartService;  