
import Firebase from '../config/firebase'

class StoreService {

  getStores(uid){
    var ref = Firebase.database().ref('dispensaries');
    return ref.once("value").then((snapshot) => {
      return snapshot;
    }).catch(err=> console.log(err));
  }  
 
}
const storeService = new StoreService();
export default storeService;  