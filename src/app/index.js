import { useRouter } from 'expo-router';
import {
    Alert,
    Button,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect, useRef } from 'react';
import Video from 'react-native-video';
import {videosStore} from "../store";
import useCropVideo from "../utils/videoCropper";
import VideoModel from "../components/VideoModel";
import CustomBttn from "../components/CustomBttn";




export default function HomeScreen() {
    const router = useRouter();
    const [name,setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [startTime, setStartTime] = useState(0);
    const [duration, setDuration] = useState(5);
    const [videoDuration, setVideoDuration] = useState(0);
    const [croppedUri, setCroppedUri] = useState(null);
    const [isCropModalVisible, setIsCropModalVisible] = useState(false);
    const videos = videosStore(state => state.videos)
    const displayVideo = videosStore(store => store.loadVideos)
    const { mutate, isLoading, isError, isSuccess, error, data } = useCropVideo();


    const pickMedia = async () => {
        try {

            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'We need permission to access your media library.');
                return;
            }


            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['videos'],
            });

            if (!result.canceled) {

                setSelectedVideo(result.assets[0].uri);
                setVideoDuration(result.assets[0].duration);
                setIsCropModalVisible(true);
            }
        } catch (error) {
            console.error("Error picking media: ", error);
        }
    };

    useEffect(() => {
        displayVideo();
    }, [displayVideo]);
    const handleCrop = async () => {
        if (!selectedVideo) {
            Alert.alert('Video Not Selected', 'Please select a video to crop.');
            return;
        }
        const cropParams = {
            uri: selectedVideo,
            startTime: startTime,
            duration: duration,
            name: name,
            description: description
        };
        mutate(cropParams);
        setIsCropModalVisible(false);
        setName("");
        setDescription("");
        setStartTime(0);
        setDuration(5);
    };
    const cancelVideEdit = () => {
        setIsCropModalVisible(false);
        setName("");
        setDescription("");
        setStartTime(0);
        setDuration(5);
    }


    const renderItem = ({ item }) => (
        <View className="w-full items-center justify-center">
            <TouchableOpacity className="bg-[#646262] h-48 w-[90%] m-1.5 flex-row" onPress={() => router.push({pathname: '/detailsScreen' , params: item})}>
            <Video
                source={{ uri: item.uri }}
                paused={true}
                muted={true}
                style={{ width: '30%', height: "100%", maxHeight:'100%',backgroundColor:'black' }}
                controls={false}
                resizeMode={'contain'}
                onLoad={(event) => setVideoDuration(event.duration)}
            />
                <View className="flex-1 ml-4">
                    <Text className="text-sm sm:text-base md:text-lg lg:text-xl text-ellipsis overflow-hidden">Name :{item.name}</Text>
                    <Text className="text-sm sm:text-base md:text-lg lg:text-xl text-ellipsis overflow-hidden">Description:{item.description}</Text>
                    <Text className="text-sm sm:text-base md:text-lg lg:text-xl text-ellipsis overflow-hidden">Created Time : {item.createdAt}</Text>
                </View>
            </TouchableOpacity>
        </View>

    );


    return (
        <View className="flex-1">
            <VideoModel
                isVisible={isCropModalVisible}
                selectedVideo={selectedVideo}
                onLoad={(event) => setVideoDuration(event.duration)}
                startTimeValue={startTime}
                startMaxValue={videoDuration}
                startOnChange={setStartTime}
                durationOnChange={setDuration}
                durationValue={duration}
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
                onPress={() => handleCrop()}
                onCancel={() => cancelVideEdit()}
            />
            {videos.length === 0 ? (
                <View className="flex-1 justify-center items-center">
                    <Text className="text-center text-lg">There are no saved cropped videos.</Text>

                </View>
            ) : (
                <FlatList
                    className="w-full h-full"
                    data={videos}
                    renderItem={renderItem}
                />

            )}
            <CustomBttn onPress={() => pickMedia()} />
        </View>
    );

}


