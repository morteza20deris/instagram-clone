import { Box, Button, Input, Modal, Typography } from "@mui/material";
import { useRef, useState } from "react";
import instagramLogo from "../Assets/instagramLogo.png";
import "./newPostModal.css";

function NewPostModal({ modalOpen, setModalOpen,newPostButtonHandler,progressbar }) {
    const mediaTypes = ["jpg", "png", "apng", "avif", "gif", "jpeg", "jfif", "pjpeg", "pjp", "svg", "webp", "bmp", "ico", "cur","mp4", "webm", "3gp", "ogg", "mpeg", "quicktime"];
    const [caption, setCaption] = useState('')
    const [image, setImage] = useState(null)
    const [imageSize, setImageSize] = useState(0)
    // const [progress, setProgress] = useState(0)
    const postButtonRef = useRef(null)



    const handleSelectedFile = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
            setImageSize(e.target.files[0].size)
        } else {
            setImageSize(0)
        }
    }

    const handleUpload = () => {
        if (imageSize < (100 * 1024 * 1024) && mediaTypes.includes(image.type.split("/")[1])) {
            newPostButtonHandler({ image: image ,postButtonRef:postButtonRef,caption:caption,setImage:setImage,setCaption:setCaption,setModalOpen:setModalOpen})
            
        } else {
            alert("selected media is either not supported or bigger than 100MB")
        }
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

  return (
    <Modal
        open={modalOpen}
          onClose={() => {
              setModalOpen(false)
              setImageSize(0)
          }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <img className="newPostModal__headerImage" src={instagramLogo} alt="instagram" />
          </Typography>
          
          <form className="newPostModal__newPost" action="submit">
            <progress className='postUpload__progress' value={progressbar} max={100}/>
            <Input className='postUpload__caption' placeholder='Enter a Caption' value={caption} onChange={e=>setCaption(e.target.value)}  type="text" />
                      <Input className='postUpload__file' onChange={handleSelectedFile} type='file' inputProps={{ accept: "image/* , video/*" }} />
                  {imageSize > (100 * 1024 * 1024) && <p style={{ color: "red" }}>Pick a smaller file</p>}
            <Button disabled={imageSize > (100 * 1024 * 1024)} ref={postButtonRef} className='postUploader__uploadButton' onClick={handleUpload}>Upload</Button>
          </form>
          
        </Box>
      </Modal>
  )
}

export default NewPostModal