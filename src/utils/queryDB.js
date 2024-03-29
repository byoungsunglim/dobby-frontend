import { db, storage } from "./Firebase";

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
      } else if (type === "recent_files") {
        db.collection("docs").where("owner", "==", doc_id).orderBy("viewedAt", "desc").limit(data).get().then(function(querySnapshot) {
          resolve(queryDocs(querySnapshot));
        })
        .catch(function (error) {
          alert(error);
        });
      } else if (type === "recents") {
        db.collection("docs").where("owner", "==", doc_id).orderBy(data.orderBy, "desc").limit(data.limit).get().then(function(querySnapshot) {
          resolve(queryDocs(querySnapshot));
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
        db.collection("users").doc(doc_id).set(data, {merge: true}).then(function () {
          console.log(`${doc_id} updated successfully!`);
          resolve(true);
        })
        .catch(function (error) {
          alert(error);
        })
      }
      else if (type === "doc") {
        db.collection("docs").add({
          title: "문서 제목",
          owner: doc_id,
          type: "presentation",
          shared: [],
          modifiedByMeAt: new Date(),
          modifiedAt: new Date(),
          viewedAt: new Date(),
          createdAt: new Date(),
          is_important: false
        }).then(function (docRef) {
          console.log(`${docRef.id} created successfully!`)
          resolve(docRef.id);
        })
        .catch(function (error) {
          alert(error);
        })
      }
      else if (type === "img") {
        storage.child(`images/${doc_id}/${new Date()}`).put(data).then(function(snapshot) {
          console.log('Uploaded Image!');
          snapshot.ref.getDownloadURL().then(function(downloadURL) { 
            console.log('File available at', downloadURL);
            let img = new Image;
            img.src = downloadURL;
            img.onload = function() {
              resolve({
                src: downloadURL,
                width: img.width,
                height: img.height
              })
            }
          })
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