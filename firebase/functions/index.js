const functions = require('firebase-functions');
const RandExp = require('randexp');
const admin = require('firebase-admin');
admin.initializeApp();

const NonStringQuerry = {
  mes: "Request querry was not a string",
  code: 410
}


let db = admin.firestore();
let users = db.collection('User Accounts')


exports.addAccount = functions.https.onRequest((req, res) => {
  var un = req.query.username;
  console.log(un)
  if( QueryCatch([un]) )
    return res.status(NonStringQuerry.code).send(NonStringQuerry.mes);

  id = genID(res)
  var data = {
    "username": un,
    "ID": id,
    "session": null,
    "lastActive": db.Timestamp.now(),
  }

  return users.add(data)
  .then(docRef => {
    console.log('Added Document ', docRef.id, 'to Database username: ', un, ', ID: ', id);
    return docRef
  }).then(() => {
    console.log('Finshed adding user');
    return res.status(200).send(id);
  }).catch(err => {
    console.error(err);
    return res.status(500).send(err);
  });
})


exports.updateAccount = functions.https.onRequest((req, res) => {
  var un = req.query.username
  var id = req.query.ID
  console.log(un, id)
  if( QueryCatch([un, id]) )
    return res.status(NonStringQuerry.code).send(NonStringQuerry.mes);

  var now = db.Timestamp.now();
  return users.where('ID', '==', id).get()
  .then(querySnap => {
    querySnap.docs[0].ref.update({ "username" : un, "lastActive" : now });
    return querySnap.docs[0];
  }).then(docSnap => {
    console.log('Account ', docSnap.get('ID'), ' has been updated to ', docSnap.get('username'));
    return res.status(200).send(id);
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
})


exports.remAccount = functions.https.onRequest((req, res) => {
  var id = req.query.ID;
  console.log(id);
  if(QueryCatch([id]))
    return res.status(NonStringQuerry.code).send(NonStringQuerry.mes);

  return users.where('ID', '==', id).get()
  .then(querySnap => {
    if(querySnap.docs.length === 0)
      return Promise.reject(new Error('Account Does not Exist'));
    return querySnap.docs[0].ref.delete();
  }).then(() => {
    console.log('Account ', id, ' has been delted');
    return res.status(200).send();
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
})


exports.nightlyCleanup = functions.https.onRequest((req, res) => {
  var now = db.Timestamp.now().toMillis();
  var yesterday = db.Timestamp.fromMillis(now - 86400000) // 24 * 60 * 60 * 1000; milliseconds in a day

  return users.orderBy('lastActive', 'asc').where('lastActive', '<=', yesterday).get()
  .then(querySnap => {
    querySnap.forEach(docSnap => {
      docSnap.ref.delete();
    });
    return res.status(200).send();
  }).catch(err => {
    console.log(err);
    return res.status(500).send();
  });
})


function QueryCatch(queries) {
  for(query of queries) {
    if( !(Object.prototype.toString.call(query) === "[object String]") ) {
      return true;
    }
  }
  return false;
}

function genID(res) {
  var unique = false

  while(!unique) {
    var id = new RandExp(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ0-9]{4}/).gen()

    unique = users.where('ID', '==', id).get()
    .then(querySnap => {
      return (querySnap.docs.length === 1);
    }).catch(err => {
      console.error(err);
      return res.status(500).send(err);
    });
  }

  return id;
}
