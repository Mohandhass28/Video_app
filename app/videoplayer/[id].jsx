import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ResizeMode, Video } from "expo-av";

const VideoPlayer = () => {
  const { title, creator, avatar, thumbnail, video } = useLocalSearchParams();
  return (
    <ScrollView className="bg-primary">
      <StatusBar style="light" />
      <SafeAreaView>
        <View className="relative">
          <Video
            source={{ uri: video }}
            className="w-full h-[280px]"
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            videoStyle={{ backgroundColor: "#000" }}
          />
        </View>
        <View className="px-5 mt-6">
          <View>
            <Text className="text-2xl font-semibold text-white">{title}</Text>
          </View>
          <View>
            <View className="flex-row mt-6 items-center">
              <Image
                source={{ uri: avatar }}
                className="h-[40px] w-[40px] rounded-3xl"
              />
              <Text className="ml-6 text-white font-semibold text-lg">
                {creator}
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default VideoPlayer;
