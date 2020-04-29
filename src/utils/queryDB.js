import { db } from "./Firebase";

export const queryDB = (handle, type, doc_id, data) => new Promise(function (resolve, reject) {
  switch (handle) {
    case "get":
      if (type === "user") {
        db.collection("users").doc(doc_id).get().then((result) => {
          resolve(queryDoc(result));
        })
        .catch(function (error) {
          alert(error);
        });
      } else if (type === "docs") {
        db.collection("docs").where("owner", "==", doc_id).get().then(function(querySnapshot) {
          resolve(queryDocs(querySnapshot));
        })
        .catch(function (error) {
          alert(error);
        });
      } else if (type === "doc") {
        db.collection("docs").doc(doc_id).get().then((result) => {
          resolve(queryDoc(result));
        })
        .catch(function (error) {
          alert(error);
        });
      }
      break;
    case "set":
      if (type === "user") {
        db.collection("users").doc(doc_id).set(data, {merge: true}).then(function () {
          console.log(`${data.nickname} updated successfully!`);
          resolve(true);
        })
        .catch(function (error) {
          alert(error);
        })
      }
      else if (type === "doc") {
        db.collection("docs").doc(doc_id).set(data, {merge: true}).then(function () {
          console.log(`${doc_id} updated successfully!`);
          resolve(true);
        })
        .catch(function (error) {
          alert(error);
        })
      }
      break;
    case "put":
      if (type === "user") {

      }
      else if (type === "doc") {
        db.collection("docs").add({
          title: "문서 제목",
          owner: doc_id,
          shared: [],
          createdAt: new Date(),
          updatedAt: new Date()
        }).then(function (docRef) {
          console.log(`${docRef.id} created successfully!`)
          resolve(docRef.id);
        })
        .catch(function (error) {
          alert(error);
        })
      }
      break;
    default:
  }
});

const queryDoc = (result) => {
  if (result.exists) {
    return parseDoc(result);
  } else {
    return null;
  }
};

const queryDocs = (querySnapshot) => {
  if (querySnapshot.empty) {
    return null;
  } else {
    return parseCollection(querySnapshot);
  }
}

const parseDoc = (doc) => {
  let data = doc.data();
  data.id = doc.id;
  return data;
};

const parseCollection = (querySnapshot) => {
  let collection = [];
  querySnapshot.forEach(function(doc) {
    collection.push(parseDoc(doc));
  });
  return collection;
};