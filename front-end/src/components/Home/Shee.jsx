import React, { useEffect, useMemo, useRef ,useState } from 'react'
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CommentsModal from './CommentsModel';
import { IoMdClose, IoMdSend, IoMdVolumeMute } from 'react-icons/io';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import PauseIcon from '@mui/icons-material/Pause';
import Comment from './Coment';
import { Form } from 'react-bootstrap';
import { getAuth, getComments, getUser, pushComment, pushFollow, pushLike, pushSave  } from '../../RequMethods';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom';
import SheePoster from './SheePoster';
import { BsSend } from 'react-icons/bs';
import ShareToList from './ShareToList';



function Shee({  post   , mute , setMute  }) {
   const [play , setPlay] = useState(true)
   const [open , setOpen] = useState(false)
   const [show  , setShow] = useState(false)
   const [user , setUser] = useState({})
   const [poster , setPoster] = useState({})
   const ref = useRef()
   const vidRef = useRef()
   const isInView = useIsInViewport(ref)
   const commentRef = useRef()
   const [comments , setComments] = useState([])
  const emptyRef = useRef()
  const [likers , setLikers] =useState( post?.likers)
  const [savers , setSavers] =useState( post?.savers)
  const [followers , setFollowers] =useState([])

  





useEffect(()=>{
  if (isInView) {
  vidRef.current.play()
  setPlay(true)
  }else{
   vidRef.current.pause()
  setPlay(false)
  } 

   let mount  = true
   if(mount) {
    ///posteer
    getUser(post?.username)
    .then((res)=>{
        setPoster(res.user)
        setFollowers(res.user.followers)
    })
    ///comments
    getComments(post.id)
    .then((resp)=>{
      resp.status == 'ok' ? setComments(resp?.data) : console.log(resp.message)
    })
  }
   return ()=>{
     mount = false}
 
},[isInView])


//////////////////////////////////////////////// auth

useEffect(()=>{
  getAuth()
  .then((res)=>{
      setUser(res.result)
  })
} ,[])




///// foloow handelll

const isFollowedByMe = followers?.includes(user?.username)
const followHandel = ()=>{
  pushFollow(followers , poster?.username,user?.username)
  if (!isFollowedByMe) {
    setFollowers([...followers, user?.username])
    // pushFollow([...followers, user?.username] , poster?.username)
  }else{
      const arr = followers?.filter((id)=>{
        return id !== user.username
      })
      setFollowers(arr)
      // pushFollow(arr ,poster?.username )
  }
  
}

//////////////////////////////////////////////////////////// comment andel

function  commentHandel  (e){
  e.preventDefault()
  const c = {
    content : commentRef.current.value ,
    author : user.username ,
    post : post.id , 
    time :Date.now()
  }
if (commentRef.current.value.length>0) {
  setComments([...comments , c])
  pushComment(c)
  commentRef.current.value = ''
}
}
/////////////////////////////////////////////////////////Like handell

  const isLikedByMe  =likers?.includes(user?.username)
function likeHandel (){
  const id = user.username
  if (!likers?.includes(id)) {
    setLikers([...likers , id])
    pushLike([...likers , id] , post.id)
    
  }else{
    let arr = likers?.filter((i)=>{
      return i!=id
    })
    setLikers(arr)
    pushLike(arr , post.id)
    
  }  
 
}

/////////////////////////////////////////////////////////  Save handeol

const isSavedByMe = savers?.includes(user?.username)
function saveHandel (){
  const id = user.username
  if (!savers?.includes(id)) {
    setSavers([...savers , id])
    pushSave([...savers , id] , post.id)
    
  }else{
    let arr = savers?.filter((i)=>{
      return i!=id
    })
    setSavers(arr)
    pushSave(arr , post.id)
    
  }  
 
}

//////////////////////////////////////////////////////video controls

const playHandel = ()=>{
  vidRef.current.play()
  setPlay(true)
}

const pauseHandel = ()=>{
  vidRef.current.pause()
  setPlay(false)
}


// const mouseDown = ()=>{
//  const muteInt =  setTimeout(()=>{
//     console.log('mute')
//   }, 1000)

//   return ()=> clearTimeout(muteInt)
// }





const size = 'medium'
  return (
    <>
   
    <div className="shee col-  d-fle x justify-content-center align-items-center position-relative  "ref={ref}  onDoubleClick={likeHandel} >
      <div   className="  bg-dan  position-relative  window "       >

         
        <video style={{aspectRatio : '9/16'}} className='videoTag bg-drk'  ref={vidRef} autoPlay={false} loop muted={mute}  >
          <source src={ `${post?.url}`} type='video/mp4' />
        </video>
       
          <div className=" p position-absolute onshee bg-succes d-flex w-100 h-100  " >
            <div className="position-absolute w-100 p-1 d-flex justify-content-between text-white controls  " >
              
                <div>
                { play ?  
                  <PauseIcon fontSize={size} onClick={pauseHandel}   />
                  : <PlayArrowIcon fontSize={size} onClick={playHandel}  />}
                </div>

                <div  onClick={()=>{
                  setMute(!mute)
                }}>
                { !mute ?  
                  <VolumeMuteIcon fontSize={size}  />
                  : <VolumeOffIcon fontSize={size} />}
                </div>
            </div>
          <div className='align-self-end bg-dange d-flex h-10  justify-content-between w-100 position-relative bg-ino' >
            <div className='align-self-end text-light'>
          
            <SheePoster  isList={true}  isFollowedByMe={isFollowedByMe} followHandel={followHandel} poster={poster} user={user}   />
                    <div className=' text-light px-2 py-1'>
                      <small>
                      {post?.caption}
                      </small>
                    </div>
            </div>
            
              
            <div className=' control-btns bg-dr text-light d-flex  py-2 '>
                

                  <div className="reacts d-flex flex-column  align-self-end mb- gap-4 px-2 mb-5">
                      


                      <div className="react-btn  "  > 
                       <div onClick={likeHandel} >
                       {!isLikedByMe ? 
                        <FavoriteBorderOutlinedIcon fontSize={size}  /> 
                         : <FavoriteIcon style={{ scale :'1.1'}}    fontSize={size}  className='text-light'   />
                      }
                       </div>
                          <small>{likers?.length}</small>
                      </div>

                      <div className="react-btn  " onClick={()=>setOpen(true)} > 
                          <ChatBubbleOutlineOutlinedIcon  fontSize={size}   /> 
                          <small>{comments.length}</small>
                      </div>
                
                      <div className="react-btn  "  onClick={()=>setShow(true)}   > 
                          <SendIcon  fontSize={size} style={{transform : 'rotate(-45deg)'}}  /> 
                          <small>Share</small>
                      </div>

                      <div className="react-btn   "> 
                          <div onClick={saveHandel}> 
                          {isSavedByMe ?
                            <BookmarkIcon  style={{ scale :'1.1'}}  fontSize={size}  className='text-white'/> :
                           <TurnedInNotOutlinedIcon   fontSize={size}   /> }
                          </div>
                          <small>Save</small>
                      </div>

                      

                      {/* <div className="react-btn  "> 
                          <MoreHorizOutlinedIcon  fontSize={size}   /> 
                      </div> */}
                  </div>
              </div>


          </div>
          </div>
      </div>

  
    </div>


 { open &&     <div className=' px- comment-area position-absolute d-flex flex-column justify-content-between ' >
        <div className='d-flex p-3 border-bottom  text- justify-content-between align-items-center'>
            <div>Comments</div>
            <IoMdClose fontSize='20px'  onClick={()=>setOpen(false)}    />
        </div>

        
        
        <div className=' com-area h-100'>
            {comments?.map((comment)=>{
              return <Comment comment={comment}  key={comment?._id} />
            })}
            <div  ref={emptyRef}  />

        </div>
      
            <Form className='d-flex align-items-center gap-1 px-2' onSubmit={commentHandel}>
                <input ref={commentRef}  placeholder='type your comment..' size='sm' className=' px-2 borde border- rounded-pll' />
                <div className="rounded-pll p-2 border bg-white"   onClick={commentHandel} >
                   <IoMdSend className='text-2'fontSize='25px' />
                </div>
                
            </Form>
        

    </div>}


    <ShareToList auth={user} onHide={()=>setShow(false)} url ={post?.id}  show={show}  />

  </>
    
  )
}

export default Shee


function useIsInViewport(ref) {
    const [isIntersecting, setIsIntersecting] = useState(false);
  
    const observer = useMemo(
      () =>
        new IntersectionObserver(([entry]) =>
          setIsIntersecting(entry.isIntersecting),
        ),
      [],
    );
  
    useEffect(() => {
      observer.observe(ref.current);
  
      return () => {
        observer.disconnect();
      };
    }, [ref, observer]);
  
    return isIntersecting;
  }