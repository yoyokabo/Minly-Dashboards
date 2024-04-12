import styles from '../styles/Post.module.css'
import { Button, Card } from "react-bootstrap";
import { Post as PostModel } from "../models/post"
import { formatDate } from '../utils/formatDate';
import axios from 'axios';
import { useState } from 'react';


interface PostProps {
    post: PostModel,
    className?: string,
}



const Post = ({ post , className}: PostProps) => {
    let {
        username,
        _id,
        likes,
        caption,
        createdAt,
        mediatype
        

    } = post;

    const [updatedLikes, setUpdatedLikes] = useState(likes);

    const likeHandler = async () => {
        try {
            const response = await axios.patch(`api/posts/${_id}` , {token : localStorage.getItem("token")})
            console.log(response)
            setUpdatedLikes(response.data.toString())
        } catch (error) {
          if (axios.isAxiosError(error)) {
              let message : string = error.request.response
              message = message.substring(message.indexOf(':') + 2 , message.length - 2)
              console.log(message)      }

    }
    }

    let date:string = formatDate(createdAt);
    return (
    <Card className={`${styles.postCard} ${className}`}>
        <Card.Body className={styles.cardBody}>
            <Card.Title className={styles.postText}>
            {username}
            </Card.Title>
            {(mediatype === "image") && <Card.Img src={`api/media/${_id}`} className={styles.cardContent}/>}
            {(mediatype === "video") && <video  width='500' height='600' controls autoPlay>
        <source src={`api/media/${_id}`}></source>
    </video>}
            <Card.Title className={styles.postText}>
                {caption}
            </Card.Title>
            <Card.Footer className={styles.postText}>
                {updatedLikes} Likes  <Button className={styles.button} onClick={(e) => {
                    console.log(e)
                    likeHandler()}} >Like</Button>
            </Card.Footer>
            <Card.Footer className={styles.postText}>
                {date}
            </Card.Footer>
            
        </Card.Body>
    </Card>)

}

export default Post;