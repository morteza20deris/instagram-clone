import { deleteObject, ref } from "firebase/storage";
import { storage } from "./firebase";

function deleteFileFromCloud({ imageUrl }) {
  return deleteObject(
    ref(
      storage,
      "images/" +
        imageUrl
          .split("images")[1]
          .split("?")[0]
          .substring(3)
          .replace("%20", " ")
    )
  ).catch((err) => alert("post delete was unsuccessful:" + err));
}

export default deleteFileFromCloud;
