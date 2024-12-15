import { useMutation } from '@tanstack/react-query';  // Make sure you're using the correct import
import { Alert } from 'react-native';
import { FFmpegKit } from 'ffmpeg-kit-react-native';  // Import FFmpegKit
import * as FileSystem from 'expo-file-system';  // Expo FileSystem for file paths
import {videosStore} from "../store";
// Your async function to crop the video
const cropVideoFFMPEG = async ({ uri, startTime, duration, name, description }) => {
    const currentTime = new Date();
    const timestamp = `${currentTime.getHours()}_${currentTime.getMinutes()}_${currentTime.getSeconds()}_${Date.now()}`;
    const output = `${FileSystem.documentDirectory}cropped_video_${timestamp}.mp4`;
    const command = `-i ${uri} -ss ${startTime} -t ${duration} -c:v mpeg4 -c:a aac -y ${output}`;

    try {
        const session = await FFmpegKit.execute(command);
        const returnCode = await session.getReturnCode();

        if (returnCode.isValueSuccess()) {
            return { success: true, output, name, description };  // Returning data
        } else {
            throw new Error('Error during cropping');
        }
    } catch (error) {
        throw new Error('Unexpected error during cropping');
    }
};

// Custom hook for video cropping
const useCropVideo = () => {
    const addVideo = videosStore((state) => state.addVideos);
    const fullDate = new Date();

    const year = fullDate.getFullYear();
    const month = String(fullDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are 0-indexed
    const day = String(fullDate.getDate()).padStart(2, '0');
    const hours = String(fullDate.getHours()).padStart(2, '0');
    const minutes = String(fullDate.getMinutes()).padStart(2, '0');
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;

    return useMutation({
        mutationFn: cropVideoFFMPEG,  // Define mutation function explicitly

        onSuccess: (data) => {
                addVideo({
                    uri: data.output,
                    name: data.name,
                    description: data.description,
                    createdAt : formattedDate
                });
        },
        onError: (error) => {
            console.error('Error in video cropping:', error);
            Alert.alert('Error', 'Something went wrong while cropping the video.');
        },
    });
};


export default useCropVideo;
