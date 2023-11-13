import { Box, Button, Input, Modal, Typography } from "@mui/material";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from 'react';
import instagramLogo from "../Assets/instagramLogo.png"
import { authentication } from "../Services/firebase";
import "./signUpModal.css"


function SignUpModal({modalOpen,setModalOpen}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    
    
    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(authentication, email, password)
            .then((e) => {
                updateProfile(e.user, { displayName: username })
                setModalOpen(false)
            })
            .catch((error) => alert(error.code))
        
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
        onClose={()=>setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <img className="app__headerImage" src={instagramLogo} alt="instagram" />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <form className="signUpModal__signUp" action="submit">
            <Input placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} type="text"  />
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
            <Input placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" />
            <Button onClick={signUp}>Register</Button>
          </form>
          </Typography>
        </Box>
      </Modal>
  )
}

export default SignUpModal