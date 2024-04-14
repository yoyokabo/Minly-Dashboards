import { useState } from "react";
import { router } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { icons } from "../../constants";
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";
import MediaCard from "../components/MediaCard";
import { posts_create } from "../api/posts_api";

const Post = () => {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    caption: "",
    media: null,
    type: "",
  });

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/*", "video/*"],
    });

    if (!result.canceled) {
      const type = result.assets[0].mimeType.split("/")[0];  // Parse for type
      setForm({
        ...form,
        media: result.assets[0],
        type: type,
      });
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const submit = async () => {
    if (!form.caption | !form.media) {
      return Alert.alert("Please provide all fields");
    }

    setUploading(true);
    try {
      let tokenget = await AsyncStorage.getItem(token)
        .then(async (token) => {
          console.log(form);
          let response = await posts_create(form, token);
          console.log(response);
        })
        .then(() => {
          Alert.alert("Success", "Post uploaded successfully");
          router.push("/home");
          setForm({
            caption: "",
            video: null,
            type: "",
          });

          setUploading(false);
        })
        .catch((error) => {
          console.log(error);
          setUploading(false);
        });
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Media</Text>

        <FormField
          title="Caption"
          value={form.caption}
          placeholder="Caption"
          handleChangeText={(e) => setForm({ ...form, caption: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>

          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.media ? (
              <MediaCard
                video={form.type === "video" && form.media.uri}
                image={form.type === "image" && form.media.uri}
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Post;
