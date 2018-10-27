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

const UserAlreadyActive = {
  mes: "User already in an active session",
  code: 420
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


// TODO: test
exports.craeteSession = functions.https.onRequest((req, res) => {
  var sesName = req.query.sesName;
  var uid = req.query.UID;
  var time = req.query.time;
  var radius = req.query.radius;
  var lat = req.query.lat;
  var long = req.query.long;
  console.log(sesName, uid, time, radius, lat, long);
  if(QueryCatch([sesName, uid, time, radius, lat, long]))
    return res.status(NonStringQuerry.code).send(NonStringQuerry.mes);

  var now = admin.firestore.Timestamp.now();

  var data = {
    "name" : sesName,
    "UID" : uid,
    "time" : time,
    "radius" : radius,
    "lat" : lat,
    "long" : long,
    "created" : now,
  };

  var username = users.where('ID', '==', uid).get()
  .then(querySnap => {
    var p1 = querySnap.docs[0].get('username');
    var p2 = querySnap.docs[0].get('session');
    if (p2 !== null)
      return Promiser.reject(new Error(UserAlreadyActive.mes))
    var p3 = querySnap.docs[0].ref.update({ "lastActive" : now, "session" : uid });
    return Promise.all([p1, p2, p3]);
  }).then(promises => {
    return promises[0]
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
  console.log(username);

  return games.add(data)
  .then(docRef => {
    console.log('Creating Session: ', sesName);
    return docRef
  }).then(docRef => {
    console.log('Finshed creating session');
    docRef.collection('Seeker').add({ "username" : username, "UID" : uid });
    return res.status(200).send(docRef.id);
  }).catch(err => {
    console.error(err);
    return res.status(500).send(err);
  });
})


exports.closeSession = functions.https.onRequest((req, res) => {
  var uid = req.query.ID;
  console.log(uid);
  if(QueryCatch([uid]))
    return res.status(NonStringQuerry.code).send(NonStringQuerry.mes);

  return games.where('UID', '==', uid).get()
  .then(querySnap => {
    if(querySnap.docs.length === 0)
      return Promise.reject(new Error('Session does not exist'));
    var p1 = querySnap.docs[0].ref.delete();
    var p2 = users.where('session', '==', uid)
    return Promise.all([p1, p2])
  }).then(promises => {
    console.log(uid, '\'s session has ended');
    var plyrs = promises[1].docs
    var proms = []
    for (let plyr of plyrs) {
      prom.push(plyr.ref.update({ "session" : null }));
    }
    return Promise.all(proms);
  }).then(promises => {
    return res.status(200).send();
  }).catch(err => {
    console.error(err);
    return res.status(500).send(err);
  });
})


exports.joinSession = functions.https.onRequest((req, res) => {
  var id = req.query.ID;
  var sesId = req.query.session;
  console.log(id, sesId);
  if(QueryCatch([id, sesId]))
    return res.status(NonStringQuerry.code).send(NonStringQuerry.mes);

  var now = admin.firestore.Timestamp.now();

  var username = users.where('ID', '==', id).get()
  .then(querySnap => {
    var p1 = querySnap.docs[0].get('username');
    var p2 = querySnap.docs[0].get('session');
    if (p2 !== null)
      return Promiser.reject(new Error(UserAlreadyActive.mes))
    var p3 = querySnap.docs[0].ref.update({ "lastActive" : now, "session" : sesId });
    return Promise.all([p1, p2, p3]);
  }).then(promises => {
    return promises[0]
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
  console.log(username);

  return games.where('UID', '==', sesId).get()
  .then(querySnap => {
    if(querySnap.docs.length === 0)
      return Promise.reject(new Error('Session does not exist'));
    var gameRef = querySnap.docs[0].ref
    gameRef.collection('Hiders').add({ "username" : username, "UID" : uid })
    return gameRef
  }).then(docRef => {
    console.log(username, ' added to ', uid, '\'s session');
    return res.status(200).send(docRef.id)
  }).catch(err => {
    console.error(err);
    return res.status(500).send(err);
  });
})


exports.leaveSession = functions.https.onRequest((req, res) => {
  var id = req.query.ID;
  console.log(id);
  if(QueryCatch([id]))
    return res.status(NonStringQuerry.code).send(NonStringQuerry.mes);

  return users.where('ID', '==', id).get()
  .then(querySnap => {
    var ses = querySnap.docs[0].get('session');
    if(ses === null)
      return Promise.reject(new Error('User is not in a session'));
    if(ses === id)
      return Promise.reject(new Error('User is the Seeker in this session'));
    var p1 = querySnap.docs[0].ref.update({ "session" : null });
    var p2 = games.where('UID', '==', ses).get()
    return Promise.all([p1, p2]);
  }).then(promises => {
    console.log(id, 'removed from session');
    var hiders = promises[1].docs[0].ref.collection('Hiders');
    return hiders.where('UID', '==', id).get()
  }).then(querySnap => {
    return querySnap.docs[0].ref.delete()
  }).then(() => {
    return res.status(200).send()
  }).catch(err => {
    console.error(err);
    return res.status(500).send(err);
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
