const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();


const NonStringQuerry = {
  mes: "Request querry was not a string"
  code: 410
}
const AccountNotFound = {
  mes: "Request querry was not a string"
  code: 420
}
const IdNotUnique = {
  mes: "Request querry was not a string"
  code: 430
}


let db = admin.firestore();
let users = db.collection('User Accounts')


exports.addAcount = functions.https.onRequest((req, res) => {
  var un = req.query.username;
  if(input === {} || !(input instanceof String))
    return res.status(NonStringQuerry.code).send(NonStringQuerry.mes);

  // TODO: Add function to create unique id
  // var id = genId().toString;

  var data = {
    "username": un,
    "id": 000.toString(),
    // "id": id,
    "session": null,
  }

  users.add(data)
  .then(docRef => {
    console.log('Added Document ', docRef.id, 'to Database: ',
                  'username: ', un, ', id: ', id);
    return docRef
  }).then(() => {
    console.log('Finshed adding user');
    return res.status(200).send();
  }).catch(err => {
    console.error(err);
    return res.status(500).send(err);
  });
})


exports.remAccount = functions.https.onRequest((req, res) => {
  var id = req.querry.id;
  if(input === {} || !(input instanceof String))
    return res.status(NonStringQuerry.code).send(NonStringQuerry.mes);

  users.where('id', '==', id).get()
  .then(querySnap => {
    var docs = querySnap.docs;
    if(len(docs) != 1) {
      if(len(docs) < 1)
        return res.status(AccountNotFound.code).send(AccountNotFound.mes);
      else if(len(docs) > 1)
        return res.status(IdNotUnique.code).send(IdNotUnique.mes);
    }
    console.log('Account: ', docs[0].ref.id, ' found');
    return docs[0].ref;
  }).then(docRef => {
    return docRef.delete();
  }).then(() => {
    console.log('Account Deleted');
    return res.status(200);
  }).catch(err => {
    console.error(err);
    return res.status(500).send(err);
  })
})
