const functions = require('firebase-functions');
const RandExp = require('randexp');
const admin = require('firebase-admin');
admin.initializeApp();


const NonStringQuerry = {
  mes: "Request querry was not a string"
  code: 410
}
const AccountNotFound = {
  mes: "Account does not exsist"
  code: 420
}
const IDNotUnique = {
  mes: "Account ID not Unique"
  code: 430
}


let db = admin.firestore();
let users = db.collection('User Accounts')


exports.addAcount = functions.https.onRequest((req, res) => {
  var un = req.query.username;
  var id = req.query.ID
  if( QueryCatch([un, id]) )
    return res.status(NonStringQuerry.code).send(NonStringQuerry.mes);

  if(id === "") {
    var data = {
      "username": un,
      "ID": genID(res),
      "session": null,
    }

    users.add(data)
    .then(docRef => {
      console.log('Added Document ', docRef.id, 'to Database: ', 'username: ', un, ', ID: ', id);
      return docRef
    }).then(() => {
      console.log('Finshed adding user');
      return res.status(200).send(id);
    }).catch(err => {
      console.error(err);
      return res.status(500).send(err);
    });
  }
  else {
    users.where('ID', '==', id).get()
    .then(querySnap => {
      return querySnap.docs[0].ref;
    }).then(docRef => {
      docRef.update({ "username" : un });
      return docRef;
    }).then(docRef =>{
      console.log(`Username of account ${docRef.ID} updated to ${un}`);
      return res.status(200).send(id);
    }).catch(err => {
      console.error(err);
      return res.status(500).send(err);
    });
  }
})


exports.remAccount = functions.https.onRequest((req, res) => {
  var id = req.querry.ID;
  if(input === {} || !(input instanceof String))
    return res.status(NonStringQuerry.code).send(NonStringQuerry.mes);

  users.where('ID', '==', id).get()
  .then(querySnap => {
    var docs = querySnap.docs;
    if(len(docs) != 1) {
      if(len(docs) < 1)
        return res.status(AccountNotFound.code).send(AccountNotFound.mes);
      else if(len(docs) > 1)
        return res.status(IDNotUnique.code).send(IDNotUnique.mes);
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


const QueryCatch (queries) => {
  for(query of queries) {
    if( !(Object.prototype.toString.call(query) === "[object String]") ) {
      return true;
    }
  }
  return false;
}

const genID(res) => {
  var unique = false

  while(!unique) {
    var id = new RandExp([bcdfghjklmnpqrstvwxyz0-9]{4}, i).gen()

    unique = users.where('ID', '==', id).get()
    .then(querySnap => {
      if(len(querySnap.docs) != 0) {
        return false
      }
      return true
    }).catch(err => {
      console.error(err);
      return res.status(500).send(err);
    });
  }
}
