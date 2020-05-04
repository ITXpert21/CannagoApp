const functions = require('firebase-functions');
 const admin = require('firebase-admin');
 const nodemailer = require('nodemailer');

 var serviceAccount = require("./serviceAccountKey.json");

 admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: "https://cannago-ba078.firebaseio.com"
 });
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const stripe = require('stripe')('sk_test_dCBAClJnEZ9Fms8r4AQQzgVz00JKkQgVZj');

exports.payWithStripe = functions.https.onRequest((request, response) => {
    var cartId = request.body.cartId;
    var driverRef = admin.database().ref('drivers');

console.log(cartId);

     return stripe.charges.create({
        amount: request.body.amount,
        currency: request.body.currency,
        source: request.body.token
      }).then((charge) => {
        // asynchronously called
        const payload = {
          notification : {
              title : "Cannago new order.",
              body : "This is new delivery order in Cannago app"
              //data : snapshot.val()
          },
          data : {
            cartId : cartId
          }
        };
        driverRef.on("value", function(snapshot){
          snapshot.forEach(function(snap){
            console.log("12121212121212", snap.val())

            admin.messaging().sendToDevice(snap.val().deviceToken, payload);
          });
        });

        return response.send(charge);
      })
      .catch(err =>{
          return console.log(err);
      });





    //  return stripe.charges.create({
    //     amount: request.body.amount,
    //     currency: request.body.currency,
    //     source: request.body.token
    // }).then((charge) => {
    //     // asynchronously called
    //     return response.send(charge);
    // })
    // .catch(err =>{
    //      return console.log(err);
    // });

/*

    const  payload = {
        notification: {
          title: 'test',
          body: 'content',
          sound: 'default',
          badge: '1',
        },
      };
  
    return admin
      .messaging()
      .then (querySnapShot => {
        let token = 'c1twFmmVAgA:APA91bE4aLQKQICXADYddrdPiF1N8amqE-Tzq17P8dHujO2eCP7jKWLXIVYKkLTjGOXFeo6WEv9fZs5dzoX_NtPRamMdaQBgRl6qouizQHnoJvTTWu5oYUF2doLZ8hsczeALBVvsrvmn';
        admin.messaging ().sendToDevice (token, payload);

        return stripe.charges.create({
            amount: request.body.amount,
            currency: request.body.currency,
            source: request.body.token
        }).then((charge) => {
            // asynchronously called
            return response.send(charge);
        })
        .catch(err =>{
             return console.log(err);
        });


      });

*/


});

