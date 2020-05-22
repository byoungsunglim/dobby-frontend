import { GoogleDrive } from "./GoogleDrive";

export const queryDrive = (handle) => new Promise(function(resolve, reject) {
  switch (handle) {
    case "init":
      const gFiles = GoogleDrive("get");
      resolve(gFiles);
      break;
    default:
  }
});
