import { Box, Button, Input, Modal, Typography } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from 'react';
import instagramLogo from "../Assets/instagramLogo.png";
import { authentication } from "../Services/firebase";
import "./signUpModal.css";

function SignInModal({modalOpen,setModalOpen}) {
    const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const buttonRef = useRef(null)
    
    
    const signIn = (e) => {
      e.preventDefault();
      buttonRef.current.textContent = "Please Wait..."
      signInWithEmailAndPassword(authentication, email, password)
        .then(() => {
          if(buttonRef.current) buttonRef.current.textContent = "Please Wait..."
          setModalOpen(false)
        })
      
        .catch((error) => {
          if(buttonRef.current) buttonRef.current.textContent = "LogIn"
          alert(error.code)
        })
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
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
            <Input placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" />
            <Button ref={buttonRef} onClick={signIn}>Login</Button>
          </form>
          </Typography>
        </Box>
      </Modal>
  )
}

export default SignInModal