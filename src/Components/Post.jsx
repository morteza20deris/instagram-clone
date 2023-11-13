import React, { useEffect, useRef, useState } from 'react'

import { Avatar, Button } from '@mui/material'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { authentication, database } from '../Services/firebase'
import DeleteIcon from '@mui/icons-material/Delete';
import getUrlExtension from '../Services/getUrlExtension'
import "./post.css"
import deleteDocFromDB from '../Services/deleteDocFromDB';
function Post({ userName, userAvatar, imageUrl, id, postCaption,senderEmail }) {
  const imageTypes = ["jpg", "png", "apng", "avif", "gif", "jpeg", "jfif", "pjpeg", "pjp", "svg", "webp", "bmp", "ico", "cur"];
  const videoTypes = ["mp4", "webm", "3gp", "ogg", "mpeg", "quicktime"];
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const imageRef = useRef(null)
  const newCommentButtonHandler = (e) => {
    e.preventDefault();
    const collectionRef = collection(database, "Posts", id, "Comments");
    addDoc(collectionRef, {
      username: authentication.currentUser.displayName,
      text: newComment,
      timeStamp:serverTimestamp()
    })
      .then(() => {
        setNewComment("")

      }).catch(err=>alert(err.code))
  }
  useEffect(() => {
    if (id) {
      const collectionRef = collection(database, "Posts", id, "Comments");
      const orderedComments = query(collectionRef,orderBy("timeStamp","asc"))
      onSnapshot(orderedComments, snapshot => {
        setComments(snapshot.docs.map(doc=>doc.data()));
      })
      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  useEffect(() => {
    // console.log(postCaption ,getUrlExtension(imageRef?.current.src));
  },[])

  

  return (
      <div className='post'>
          <div className="post__header">
            <div className='post__headerLeft'>
              <Avatar
                    className='post__avatar'
                    alt={userName}
                    src={userAvatar} />
              <h3 >{userName}</h3>
        </div>
        {authentication.currentUser?.email === senderEmail && <DeleteIcon onClick={()=>deleteDocFromDB({postSenderEmail:senderEmail,documentID:id,imageUrl:imageUrl})} />}
          </div>
      {imageTypes.indexOf((getUrlExtension(imageUrl)))>-1 && <img ref={imageRef} className="post__image" alt="post" src={imageUrl} />}
      {(videoTypes.indexOf(getUrlExtension(imageUrl)))>-1 && <video src={imageUrl} controls width="100%" height="100%"/>}
      <h4 className='post__text'><strong>{userName}:</strong> {postCaption}</h4>
      <div className="post__comments">
        {comments.map((comment,index) => <p key={index}>
          <strong>
            {comment.username + ": "}
          </strong>
          {comment.text}
        </p>)}
      </div>
      {authentication.currentUser && (
        <form className='post__commentBox' action="submit">
        <input
          type="text"
          placeholder='Add a comment'
          value={newComment}
          onChange={e=>setNewComment(e.target.value)}
          className="post__commentInput" />
        <Button
          disabled={!newComment}
          type='submit'
          onClick={newCommentButtonHandler}
          className='post__commentButton'>Send</Button>
      </form>
      )}
    </div>
  )
}

export default Post