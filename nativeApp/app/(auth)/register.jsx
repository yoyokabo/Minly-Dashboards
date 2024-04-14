import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { Link } from "expo-router";
import { user_register } from "../api/user_api";
import { router } from "expo-router";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const registerHandler = async () => {
    setIsSubmitting(true);
    user_register(email, username, password)
      .then(async (result) => {
        if (result.status == 201) {
          setSuccess("Registered successfully");
          setError(null);
          console.log(result.data);
          token = result.data;

          setIsSubmitting(false);
          router.navigate("/home");
        } else {
          console.log(result);
          let message = result.request.response;
          message = message.substring(
            message.indexOf(":") + 2,
            message.length - 2,
          );
          console.log(message);
          setIsSubmitting(false);
          setError(message);
          setSuccess(null);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
        setSuccess(null);
      });
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <Text className="text-3xl text-white text-semibold mt-10 font-psemibold">
            Login to Minly Dashboards
          </Text>
          <FormField
            title="Email"
            value={email}
            handleChangeText={(e) => setEmail(e)}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Username"
            value={username}
            handleChangeText={(e) => setUsername(e)}
            otherStyles="mt-7"
          />
          <FormField
            title="Password"
            value={password}
            handleChangeText={(e) => setPassword(e)}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Register"
            containerStyles="mt-7"
            isLoading={isSubmitting}
            handlePress={registerHandler}
          />
          {error && (
            <Text className="text-xl text-red-500 font-pregular justify-center ">
              {error}
            </Text>
          )}
          {success && (
            <Text className="text-xl text-green-500 font-pregular justify-center ">
              {success}
            </Text>
          )}
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/login"
              className="text-lg font-psemibold text-cyan-300"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
