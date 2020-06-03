export const queryDrive = (handle, type, doc_id, data) => new Promise(function(resolve, reject) {
  switch (handle) {
    case "init":
      fetch(`https://dobby-is-free.appspot.com/imports/${type}/init`, {
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(response => response.json())
      .then(data => resolve(data.auth_url));
      break;
    case "auth":
      fetch(`https://dobby-is-free.appspot.com/imports/${type}/auth`, {
        method: 'POST',
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid: doc_id,
          authorization_response: window.location.href
        })
      }).then(response => response.json())
      .then(data => {
        resolve(data.user)
      });
      break;
    case "get":
      fetch(`https://dobby-is-free.appspot.com/imports/${doc_id}`, {
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(response => response.json())
      .then(data => {
        console.log(data);
        resolve(data.result);
      });
      break;
    default:
  }
});
