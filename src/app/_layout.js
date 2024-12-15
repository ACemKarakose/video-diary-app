import '../../global.css'
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { videosStore } from "../store";

export default function Layout() {
    const queryClient = new QueryClient();
    const clearVideo = videosStore(store => store.clearVideos)

    return (
        <QueryClientProvider client={queryClient}>

            <Stack
                screenOptions={{
                    headerStyle: "bg-[#f8f8f8]",  // Background color
                    headerTintColor: "#333",  // Header text color
                    headerTitleStyle: "font-bold",  // Font weight for title
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{
                        headerStyle: "bg-[#f8f8f8]",  // Background color
                        headerTintColor: "#333",  // Header text color
                        headerTitle: 'Video Diary',
                        headerTitleStyle: "font-bold",  // Font weight for title
                        headerBackTitle: 'Go Back',
                        headerRight: () => (
                            <Ionicons
                                name="trash"
                                size={30}
                                className="text-black"  // Icon color using NativeWind
                                onPress={() => clearVideo()} // Action when button is pressed
                            />
                        ),
                    }}
                />

                <Stack.Screen name="detailsScreen" options={{
                    headerStyle: "bg-[#f8f8f8]",  // Background color
                    headerTintColor: "#333",  // Header text color
                    headerTitle: 'Video Details',
                    headerTitleStyle: "font-bold",  // Font weight for title
                    headerBackTitle: 'Go Back'
                }} />
            </Stack>
        </QueryClientProvider>
    );
}
