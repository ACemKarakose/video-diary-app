import {create} from "zustand";
import AsyncStorage from '@react-native-async-storage/async-storage';



export const videosStore = create((set) =>({
    videos : [],
    addVideos: async (item) => {
        try {
            set((state) => {
                const newVideos = [...state.videos, item];

                AsyncStorage.setItem('videos', JSON.stringify(newVideos));
                return { videos: newVideos };
            });
        } catch (error) {
            console.error('Error saving videos to AsyncStorage:', error);
        }
    },
    loadVideos: async () => {
        try {
            const storedVideos = await AsyncStorage.getItem('videos');
            if (storedVideos) {
                set({ videos: JSON.parse(storedVideos) });
            }
        } catch (error) {
            console.error('Error loading videos from AsyncStorage:', error);
        }
    },
    clearVideos: async () => {
        try {
            await AsyncStorage.removeItem('videos');
            set({ videos: [] });
        } catch (error) {
            console.error('Error clearing videos in AsyncStorage:', error);
        }
    },
}))




