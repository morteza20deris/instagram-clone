import { deleteDoc, doc } from "firebase/firestore";
import deleteFileFromCloud from "./deleteFileFromCloud";
import { authentication, database } from "./firebase";

function deleteDocFromDB({ postSenderEmail, documentID, imageUrl }) {
  if (authentication.currentUser.email === postSenderEmail) {
    deleteFileFromCloud({ imageUrl: imageUrl }).then(() =>
      deleteDoc(doc(database, "Posts", documentID)).catch((err) =>
        alert("post file delete was unsuccessful:" + err)
      )
    );
  } else {
    alert("you did not create this post");
  }
}

export default deleteDocFromDB;
