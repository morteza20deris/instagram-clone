import { Button, LinearProgress } from "@mui/material";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import "./App.css";
import instagramLogo from "./Assets/instagramLogo.png";
import Post from "./Components/Post";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import SignInModal from "./Components/SignInModal";
import SignUpModal from "./Components/SignUpModal";
import { authentication, database } from "./Services/firebase";
import NewPostModal from "./Components/NewPostModal";
import uploadFileToCloud from "./Services/uploadFileToCloud";

function App() {
  const [posts, setPosts] = useState([])
  const [signUpModalOpen, setSignUpModalOpen] = useState(false)
  const [signInModalOpen, setSignInModalOpen] = useState(false)
  const [newPostModalOpen, setNewPostModalOpen] = useState(false)
  const [, setStateChange] = useState()
  const [progressBar, setProgressBar] = useState(0)
  
  const newPostButtonHandler = ({setCaption,image,postButtonRef,caption,setImage}) => {
    if (postButtonRef.current) postButtonRef.current.textContent = "Please Wait ...";
    uploadFileToCloud({ image: image ,setProgress:setProgressBar,postButtonRef:postButtonRef,caption:caption,setImage:setImage,setCaption:setCaption,setModalOpen:setNewPostModalOpen});
            
  }
  
  useEffect(() => {
    const postsCollection = collection(database, "Posts");
    const orderedPosts =  query(postsCollection,orderBy("timeStamp","desc"))
    onSnapshot(orderedPosts, snapShot => {
      setPosts(snapShot.docs.map(doc=>({post:doc.data(), id:doc.id})))
    })
  }, [])
  
  useEffect(() => {
    onAuthStateChanged(authentication, user => {
      setStateChange(user)
    })
},[])

  
  

  return (
    <div className="app">
      <NewPostModal progressbar={progressBar} newPostButtonHandler={newPostButtonHandler} modalOpen={newPostModalOpen} setModalOpen={setNewPostModalOpen}/>
      <SignUpModal modalOpen={signUpModalOpen} setModalOpen={setSignUpModalOpen} />
      <SignInModal modalOpen={signInModalOpen} setModalOpen={setSignInModalOpen} />
      <div className="app__header">
        {authentication.currentUser && <div className="app__newPost">new Post<AddCircleRoundedIcon onClick={()=>setNewPostModalOpen(true) } /></div>}
        <img className="app__headerImage" src={instagramLogo} alt="logo" />
        {authentication.currentUser ? (<Button onClick={() => signOut(authentication)}>LogOut</Button>) : (
          <div>
            <Button onClick={() => setSignUpModalOpen(true)}>Register</Button>
            <Button onClick={() => setSignInModalOpen(true)}>LogIn</Button>
          </div>
        )}
      </div>
      {
        progressBar > 0 && !newPostModalOpen &&
        <LinearProgress variant="determinate"  className='app__headerProgress' value={progressBar} max={100} />}
      
      <div className="app__posts">
        <div className="app__postsLeft">
          {posts.length > 0 && posts.map(({ post, id }) =>
            <Post
              key={id}
              id={id}
              senderEmail={post.user}
              imageUrl={post.imageUrl}
              postCaption={post.postCaption}
              userAvatar={post.userAvatar}
              userName={post.userName}
            />)}
        </div>
        <div className="app__postsRight">
          
        </div>
      </div>
    </div>
  );
}

export default App;
