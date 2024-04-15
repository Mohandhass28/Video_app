import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmpytState";

const home = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text className="text-white text-3xl">{item.id}</Text>
          </View>
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

              {/* <Trending posts={latestPosts ?? []} /> */}
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
