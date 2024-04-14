import { View, Text, FlatList , Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { posts_get } from '../api/posts_api'
import Video, {VideoRef} from 'react-native-video';
import { formatDate } from '../utils/formateDate';
import MediaCard from '../components/MediaCard';

const Home = () => {

  const[posts,setPosts] = useState([]);

  useEffect(()=>{
    getPosts();
  },[])

  const getPosts = () => {
    posts_get().then((data)=>{
      console.log(data.data)
      setPosts(data.data)
    })
    
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList  className="w-full h-full px-4 my-6"
      data= {posts}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
          
            <MediaCard
            user={item.username}
            thumbnail={`http://10.0.2.2:5000/api/media/${item._id}`}
            video={(item.mediatype === "video")&& `http://10.0.2.2:5000/api/media/${item._id}`}
            image={(item.mediatype === "image")&& `http://10.0.2.2:5000/api/media/${item._id}`}
            date={formatDate(item.createdAt)}
            caption={item.caption}
            id = {item._id}
            likes={item.likes}
          
          />
          
      )}
      />
    </SafeAreaView>
  )
}

export default Home