import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { authentication, database } from "./firebase";

function createDocOnDB({ downloadUrl, caption }) {
  return addDoc(collection(database, "Posts"), {
    timeStamp: serverTimestamp(),
    user: authentication.currentUser.email,
    imageUrl: downloadUrl,
    postCaption: caption,
    userAvatar: authentication.currentUser.photoURL || " ",
    userName: authentication.currentUser.displayName,
  }).catch((err) => alert(err.code));
}

export default createDocOnDB;
