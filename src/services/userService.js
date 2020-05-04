
import Firebase from '../config/firebase'

class UserService {
  registerConsumer(addParam){
    const newConsumersRef = Firebase.database().ref().child('consumers').push();
    const newConsumertKey = newConsumersRef.key;
    addParam.consumerId = newConsumertKey;
    let consumerRef = Firebase.database().ref('consumers/' + newConsumertKey);
    return consumerRef.set(addParam).then((res)=>{
      return addParam;
    }).catch();
  }
  registerDispensary(addParam){

    const newDispensaryRef = Firebase.database().ref().child('dispensaries').push();

    const newDispensarytKey = newDispensaryRef.key;
    addParam.dispensaryId = newDispensarytKey;
    
    let dispensaryRef = Firebase.database().ref('dispensaries/' + newDispensarytKey);
    return dispensaryRef.set(addParam).then((res)=>{
      return addParam;
    }).catch();
  }  
  updateConsumerProfile(param){
    let consumerRef = Firebase.database().ref('consumers/' + addParam.productId);
    return productRef.set(addParam).then((res)=>{
      return addParam;
    }).catch();
  }  
  updateDeviceToken(consumerId, deviceToken){
    let consumerRef = Firebase.database().ref('consumers/' + consumerId );
    return consumerRef.update({deviceToken : deviceToken}).then((res)=>{
      return deviceToken;
    }).catch();

  }
  updateDeviceDriverToken(driverId, deviceToken){
    let driverRef = Firebase.database().ref('drivers/' + driverId );
    return driverRef.update({deviceToken : deviceToken}).then((res)=>{
      return deviceToken;
    }).catch();

  }  
  registerDriver(addParam){

    const newDriverRef = Firebase.database().ref().child('drivers').push();

    const newDriverKey = newDriverRef.key;
    addParam.driverId = newDriverKey;
    
    let driverRef = Firebase.database().ref('drivers/' + newDriverKey);
    return driverRef.set(addParam).then((res)=>{
      return addParam;
    }).catch();
  }    
  getConsumerProfileInfo(uid){
    var ref = Firebase.database().ref('consumers');
    return ref.orderByChild('uid').equalTo(uid).once("value").then((snapshot) => {
      return snapshot;
    }).catch(err=> console.log(err));
  } 

  getCurrentUserInfo(uid){
    var ref = Firebase.database().ref('consumers');
    return ref.orderByChild('uid').equalTo(uid).once("value").then((snapshot) => {
      return snapshot;
    }).catch(err=> console.log(err));
  }   
  getCurrentDriverInfo(uid){
    var ref = Firebase.database().ref('drivers');
    return ref.orderByChild('uid').equalTo(uid).once("value").then((snapshot) => {
      return snapshot;
    }).catch(err=> console.log(err));
  }   
}
const userService = new UserService();
export default userService;  