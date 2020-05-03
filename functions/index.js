const functions = require('firebase-functions');
 const admin = require('firebase-admin');
 const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});

 admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const stripe = require('stripe')('sk_test_dCBAClJnEZ9Fms8r4AQQzgVz00JKkQgVZj');
let transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
      user: 'snowgirl1991718@gmail.com',
      pass: '*ITXpert2018*'
  }
});
exports.payWithStripe = functions.https.onRequest((request, response) => {
    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here: https://dashboard.stripe.com/account/apikeys

    // eslint-disable-next-line promise/catch-or-return

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
exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    
      // getting dest email by query string
      // const dest = req.query.dest;
      const mailOptions = {
          from: 'snowgirl1991718@hotmail.com', // Something like: Jane Doe <janedoe@gmail.com>
          to: 'contactcannago@gmail.com',
          subject: 'I\'M A PICKLE!!!', // email subject
          html: `<p style="font-size: 16px;">Pickle Riiiiiiiiiiiiiiiick!!</p>
                 <br />
                ` // email content in HTML
      };

      // returning result
      return transporter.sendMail(mailOptions, (erro, info) => {
          if(erro){
              return res.send(erro.toString());
          }
          return res.send('Sended');
      });
  });    
});
