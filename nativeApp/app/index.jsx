import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "./components/CustomButton";
import isLogged from "./utils/isLogged";

export default function App() {
  let isLoggedIn = false;
  isLogged()
    .then((res) => {
      isLoggedIn = res;
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(isLogged());
  if (isLoggedIn === true) return <Redirect href="home"></Redirect>;
  return (
    <SafeAreaView className="bg-primary h-full items-center justify-center">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full px-4">
          <Text className="text-3xl text-white  text-center">
            Discover Your Potential with {}
          </Text>
          <Text className="text-3xl text-bold text-center  text-secondary-200">
            Minly Dashboards
          </Text>

          <Text className="text-2xl font-pregular text-gray-100 mt-7 text-center">
            Join our strong community of over 2 users!
          </Text>
          <CustomButton
            title="Sign in"
            handlePress={async () => {
              if (await isLogged()) {
                router.push("/home");
              } else {
                router.push("/login");
              }
            }}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}
