import { View, Text, FlatList, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmpytState";
import useAppwrite from "../../lib/UseAppWrite";
import VideoCard from "../../components/VideoCard";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import Trending from "../../components/Trending";

const home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className="px-4 space-y-6">
            <View className="flex-row items-center justify-between mb-6">
              <View>
                <Image
                  source={images.logo}
                  className="w-24 h-24"
                  resizeMode="contain"
                />
              </View>
              <View>
                <Image
                  source={images.logoSmall}
                  className="w-12 h-12"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Videos
              </Text>

              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        }
      />
    </SafeAreaView>
  );
};

export default home;
