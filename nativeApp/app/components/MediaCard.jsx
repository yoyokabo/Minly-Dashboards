import React, { useEffect, useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { View, Text, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomButton from "./CustomButton";
import { posts_like } from "../api/posts_api";

const MediaCard = ({ user, date, caption, image, video, likes, id }) => {
  const [play, setPlay] = useState(true);
  const [likesUpdated, setLikes] = useState();

  useEffect(() => {
    setLikes(likes);
  }, []);

  return (
    <>
      <View className="flex flex-col items-center px-4 mb-8 border-4 border-blackrounded rounded-3xl justify bg-black-200">
        <View className="flex flex-row gap-5 items-start">
          <View className="flex justify-center items-center flex-row flex-1">
            <View className=" rounded-lg  flex justify-center items-center p-0.5 gap-1"></View>

            <View className="flex justify-center flex-1 ml-3 gap-y-1">
              <Text
                className="font-psemibold text-sm text-white"
                numberOfLines={1}
              >
                {user}
              </Text>
              <Text
                className="text-xs text-gray-100 font-pregular"
                numberOfLines={1}
              >
                {date}
              </Text>
            </View>
          </View>
        </View>

        {image && (
          <Image source={{ uri: image }} style={{ width: 400, height: 500 }} />
        )}
        {video && (
          <Video
            style={{ width: 400, height: 500 }}
            source={{ uri: video }}
            className="w-full h-60 rounded-xl mt-3"
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate={(status) => {
              if (status.didJustFinish) {
                setPlay(false);
              }
            }}
          />
        )}

        <View className=" items-start flex-row rounded-lg  flex justify-center items-center p-0.5 gap-1">
          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text className="font-pregular text-lg text-white">{caption}</Text>

            <CustomButton
              title="Like"
              handlePress={async () => {
                token = await AsyncStorage.getItem(token);
                response = await posts_like(id, token);
                setLikes(response.data);
              }}
              containerStyles="w-1/4 mt-7"
            />
            <Text className="font-pregular text-lg text-white flex-row">
              Likes : {likesUpdated}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default MediaCard;
