const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
let db = admin.firestore();
let users = db.collection('User Accounts');
let games = db.collection('Game Sessions');

const RandExp = require('randexp');


const NonStringQuerry = {
  mes: "Request querry was not a string",
  code: 410
}


exports.addAccount = functions.https.onRequest((req, res) => {
  var un = req.query.username;
  console.log(un)
  if( QueryCatch([un]) )
    return res.status(NonStringQuerry.code).send(NonStringQuerry.mes);

  id = accountID(res)
  var data = {
    "username": un,
    "ID": id,
    "session": null,
    "lastActive": admin.firestore.Timestamp.now(),
  }

  return users.add(data)
  .then(docRef => {
    console.log('Adding Document ', docRef.id, 'to Database username: ', un, ', ID: ', id);
    return docRef;
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

  var now = admin.firestore.Timestamp.now();
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
      return Promise.reject(new Error('Account does not exist'));
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
  var now = admin.firestore.Timestamp.now().toMillis();
  var yesterday = admin.firestore.Timestamp.fromMillis(now - 86400000) // 24 * 60 * 60 * 1000; milliseconds in a day

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


// TODO:
exports.craeteSession = functions.https.onRequest((req, res) => {
  var id = req.query.ID;
  var length = req.query.length;
  var radius = req.query.radius;
  var lat = req.query.lat;
  var long = req.query.long;
  console.log(id, length, radius, lat, long);
  if(QueryCatch([id, length, radius, lat, long, sessionId]))
    return res.status(NonStringQuerry.code).send(NonStringQuerry.mes);

  var sessionId = sessionID();
  var data = {
    "sessionID" : sessionId,
    "length" : length,
    "radius" : radius,
    "lat" : lat,
    "long" : long,
  };

  return games.add(data)
  .then(docRef => {
    console.log('Creating Session ', sessionId);
    return docRef
  }).then(docRef => {
    console.log('Finshed creating session');
    return docRef.collection('Unassigned').add({ "PlayerId" : id , "return" : req.ip });
  }).then(docRef => {
    console.log('Added host ', id);
    return res.status(200).send(sessionId);
  }).catch(err => {
    console.error(err);
    return res.status(500).send(err);
  });
})


exports.closeSession = functions.https.onRequest((req, res) => {
  var sessionId = req.query.session;
  console.log(sessionId);
  if(QueryCatch([sessionId]))
    return res.status(NonStringQuerry.code).send(NonStringQuerry.mes);

  return games.where('ID', '==', sessionId).get()
  .then(querySnap => {
    if(querySnap.docs.length === 0)
      return Promise.reject(new Error('Session does not exist'));
    return querySnap.docs[0].ref.delete();
  }).then(() => {
    console.log(sessionId, ' game has ended');
    return res.status(200).send();
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
})


exports.joinSession = functions.https.onRequest((req, res) => {
  var id = req.query.ID;
  var sessionId = req.qerry.session;
  console.log(id, sessionId);
  if(QueryCatch([id, sessionId]))
    return res.status(NonStringQuerry.code).send(NonStringQuerry.mes);
})


exports.leaveSession = functions.https.onRequest((req, res) => {

})


function QueryCatch(queries) {
  for(query of queries) {
    if( !(Object.prototype.toString.call(query) === "[object String]") ) {
      return true;
    }
  }
  return false;
}

function accountID(res) {
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

function sessionID(res) {
  var unique = false

  while(!unique) {
    var id = new RandExp(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]{4}/).gen()

    unique = gamess.where('sessionID', '==', id).get()
    .then(querySnap => {
      return (querySnap.docs.length === 1);
    }).catch(err => {
      console.error(err);
      return res.status(500).send(err);
    });
  }

  return id;
}
