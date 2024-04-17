import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ResizeMode, Video } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import useAppwrite from "../../lib/UseAppWrite";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import EmptyState from "../../components/EmpytState";
import VideoCard from "../../components/VideoCard";

const VideoPlayer = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const tabssocila = [
    {
      id: 1,
      text: "0",
      icon: () => <AntDesign name="like1" size={24} color="white" />,
    },
    {
      id: 2,
      text: "0",
      icon: () => <AntDesign name="dislike1" size={24} color="white" />,
    },
    {
      id: 3,
      text: "Share",
      icon: () => <AntDesign name="sharealt" size={24} color="white" />,
    },
    {
      id: 4,
      text: "Comment",
      icon: () => <FontAwesome name="comment" size={24} color="white" />,
    },
  ];
  const {
    title,
    creator,
    avatar,
    thumbnail,
    video,
    id,
  } = useLocalSearchParams();
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          console.log(item.$id);
          console.log(id);
          return (
            <>
              {item.$id != id && (
                <VideoCard
                  title={item.title}
                  thumbnail={item.thumbnail}
                  video={item.video}
                  creator={item.creator.username}
                  avatar={item.creator.avatar}
                  id={item.$id}
                  key={item.id}
                />
              )}
            </>
          );
        }}
        ListHeaderComponent={() => (
          <View className="mb-3">
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
                <Text className="text-2xl font-semibold text-white">
                  {title}
                </Text>
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
              <View className="justify-between flex-row">
                {tabssocila.map(({ id, icon, text }) => (
                  <TouchableOpacity key={id} className="mt-4">
                    <View
                      className="items-center gap-1 flex-row px-2 py-2 bg-black-200 mt-3 rounded-[9px]"
                      key={id}
                    >
                      {icon()}
                      <Text className="text-white text-sm font-psemibold">
                        {text}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default VideoPlayer;
