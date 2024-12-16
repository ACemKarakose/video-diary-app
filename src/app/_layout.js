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
                    headerStyle: "bg-[#f8f8f8]",
                    headerTintColor: "#333",
                    headerTitleStyle: "font-bold",
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{
                        headerStyle: "bg-[#f8f8f8]",
                        headerTintColor: "#333",
                        headerTitle: 'Video Diary',
                        headerTitleStyle: "font-bold",
                        headerBackTitle: 'Go Back',
                        headerRight: () => (
                            <Ionicons
                                name="trash"
                                size={30}
                                className="text-black"
                                onPress={() => clearVideo()}
                            />
                        ),
                    }}
                />

                <Stack.Screen name="detailsScreen" options={{
                    headerStyle: "bg-[#f8f8f8]",
                    headerTintColor: "#333",
                    headerTitle: 'Video Details',
                    headerTitleStyle: "font-bold",
                    headerBackTitle: 'Go Back'
                }} />
            </Stack>
        </QueryClientProvider>
    );
}
