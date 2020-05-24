import credentials from './credentials.json';

export const googleDrive = (handle) => new Promise(function(resolve, reject) {
  switch (handle) {
    case "get":
      window.gapi.load('client:auth2', () => {
        window.gapi.client.init({
          apiKey: credentials.apiKey,
          clientId: credentials.clientId,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(function () {
          // if (!window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
            window.gapi.auth2.getAuthInstance().signIn();
          // }
      
          window.gapi.client.drive.files.list({
            'pageSize': 1000,
            'fields': "*"
          }).then(function(response) {
            console.log(response);
            var files = response.result.files;
            if (files && files.length > 0) {
              resolve(response.result.files);
              // for (var i = 0; i < files.length; i++) {
              //   var file = files[i];
              //   console.log(file);
              // }
            } else {
              alert('No files found.');
            }
          });
        }, function(error) {
          alert(error);
        });
      });
      break;
    default:
  }
  
});

const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
const SCOPES = 'https://www.googleapis.com/auth/drive';

function initClient() {
  return new Promise(resolve => {
    window.gapi.client.init({
      apiKey: credentials.apiKey,
      clientId: credentials.clientId,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(function () {
      if (!window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
        window.gapi.auth2.getAuthInstance().signIn();
      }
  
      resolve(listFiles());
    }, function(error) {
    });
  })
}

function listFiles() {
  window.gapi.client.drive.files.list({
    'pageSize': 1000,
    'fields': "*"
  }).then(function(response) {
    console.log(response);
    var files = response.result.files;
    if (files && files.length > 0) {
      return response.result.files;
      // for (var i = 0; i < files.length; i++) {
      //   var file = files[i];
      //   console.log(file);
      // }
    } else {
      alert('No files found.');
    }
  });
}