import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import createDocOnDB from "./createDocOnDB";
import { storage } from "./firebase";

function uploadFileToCloud({
  image,
  setProgress,
  postButtonRef,
  caption,
  setImage,
  setCaption,
  setModalOpen,
}) {
  const imageRef = ref(storage, `images/${image.name}`);
  const uploadTask = uploadBytesResumable(imageRef, image).on(
    "state_changed",
    (snapshot) => {
      setProgress(
        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      );
    },
    (err) => {
      alert(err.code);
      if (postButtonRef.current) postButtonRef.current.textContent = "Upload";
    },
    () => {
      getDownloadURL(imageRef).then((downloadUrl) => {
        createDocOnDB({
          downloadUrl: downloadUrl,
          caption: caption,
        }).then(() => {
          setProgress(0);
          setCaption("");
          setImage(null);
          setModalOpen(false);
          if (postButtonRef.current)
            postButtonRef.current.textContent = "Upload";
        });
      });
    }
  );

  return uploadTask;
}

export default uploadFileToCloud;
