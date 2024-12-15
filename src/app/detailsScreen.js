import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Video from "react-native-video";

const DetailsScreen = () => {
    const item = useLocalSearchParams();

    return (
        <View className="flex-1">

            {/* Video Section */}
            <View className="flex-1">
                <Video
                    source={{ uri: item.uri }}
                    paused={false}
                    style={{ width: '100%', height: '100%', backgroundColor: 'black' }} // Inline styles for video
                    controls={true}
                    muted={false}
                    resizeMode="contain"
                />
            </View>

            {/* Details Section */}
            <View className="flex-1 bg-gray-400 p-4">
                <Text className="text-lg">Name: {item.name}</Text>
                <Text className="text-lg">Description: {item.description}</Text>
                <Text className="text-lg ">Created Time: {item.createdAt}</Text>
            </View>
        </View>
    );
};

export default DetailsScreen;
