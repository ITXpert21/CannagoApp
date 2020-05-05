
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
  
  updateCheckOutStatus(param, currentLat, currentLng){
    param.currentLat = currentLat;
    param.currentLng = currentLng;
    param.driverInfo = '';
    param.duration = '';
    let cartRef = Firebase.database().ref('carts/' + param.cartId ) ;
    return cartRef.set(param).then((res)=>{
      return param;
    }).catch();
  }  
  updateCartByDriver(cartId, drivereInfo, duration){
    let cartRef = Firebase.database().ref('carts/' + cartId ) ;
    return cartRef.set({driverInfo : drivereInfo, duration : duration, status : 'driverAccepted'});
  }  

  getProducts(uid){
    var ref = Firebase.database().ref('products');
    return ref.once("value").then((snapshot) => {
      return snapshot;
    }).catch(err=> console.log(err));
  }

  getDeliveryInfo(cartId){
    var ref = Firebase.database().ref('carts/' + cartId);
    return ref.once("value").then((snapshot) => {
      var consumerRef = Firebase.database().ref('consumers');
      return consumerRef.orderByChild('uid').equalTo(snapshot.val().cart_uid).once("value").then((consumerInfo) => {
        return consumerInfo;
      })
   
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