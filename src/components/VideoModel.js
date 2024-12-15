import { Button, Modal, Text, TextInput, View, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import Video from "react-native-video";
import Slider from "@react-native-community/slider";
import {useRef, useState} from "react";
import { z } from 'zod';

const VideoModel = (props) => {
    const {
        isVisible,
        selectedVideo,
        onLoad,
        startTimeValue,
        startMaxValue,
        durationValue,
        startOnChange,
        durationOnChange,
        name,
        setName,
        description,
        setDescription,
        onPress,
        onCancel,
    } = props;
    const videoPlayerRef = useRef(null);
    const [errors, setErrors] = useState({ name: "", description: "" });
    const formSchema = z.object({
        name: z
            .string()
            .min(1, { message: "Name is required" })
            .max(20, { message: "Name must be at most 20 characters" }),

        description: z
            .string()
            .min(10, { message: "Description must be at least 10 characters" })
            .max(100, { message: "Description must be at most 100 characters" }),
    });

    const handleSubmit = () => {
        const result = formSchema.safeParse({ name, description });
        if (!result.success) {
            const validationErrors = result.error.formErrors.fieldErrors;
            setErrors({
                name: validationErrors.name?.[0] || "",
                description: validationErrors.description?.[0] || "",
            });
        } else {
            setErrors({ name: "", description: "" });
            // proceed with form submission (e.g., API call)
            console.log("Form submitted", { name, description });
        }
    };

    return (
        <Modal visible={isVisible} animationType="slide" transparent={true}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"} // Different behavior for iOS and Android
                style={{ flex: 1 }}
            >
                <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                    <View className="bg-white p-5 rounded-lg w-4/5">
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                            <Video
                                source={{ uri: selectedVideo }}
                                ref={videoPlayerRef}
                                style={{ width: '100%', height: 200 }} // Inline styles for the Video component
                                controls={true}
                                onLoad={onLoad}
                            />
                            <Text className="mt-5">Select Start Time</Text>
                            <Slider
                                style={{ width: '100%' }}
                                minimumValue={0}
                                maximumValue={startMaxValue}
                                value={startTimeValue}
                                onValueChange={startOnChange}
                                step={1}
                            />
                            <Text className="mt-2">Start Time: {Math.round(startTimeValue)}s</Text>

                            <Text className="mt-5">Select Duration</Text>
                            <Slider
                                style={{ width: '100%' }}
                                minimumValue={0}
                                maximumValue={startMaxValue - startTimeValue}
                                value={durationValue}
                                onValueChange={durationOnChange}
                                step={1}
                            />
                            <Text className="mt-2">Duration: {Math.round(durationValue)}s</Text>

                            <TextInput
                                placeholder="Enter video name"
                                value={name}
                                onChangeText={setName}
                                className={`w-full border-b-2 p-2 my-3 h-20 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.name && <Text className="text-sm sm:text-base md:text-lg lg:text-xl text-ellipsis overflow-hidden text-red-500">{errors.name}</Text>}
                            <TextInput
                                placeholder="Enter video description"
                                value={description}
                                onChangeText={setDescription}
                                className={`w-full border-b-2 p-2 my-3 h-20 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                                multiline
                            />
                            {errors.description && <Text className="text-sm sm:text-base md:text-lg lg:text-xl text-ellipsis overflow-hidden text-red-500">{errors.description}</Text>}


                            <Button title="Crop Video"   onPress={() => {
                                const result = formSchema.safeParse({ name, description });
                                if (!result.success) {
                                    const validationErrors = result.error.formErrors.fieldErrors;
                                    setErrors({
                                        name: validationErrors.name?.[0] || "",
                                        description: validationErrors.description?.[0] || "",
                                    });
                                } else {
                                    setErrors({ name: "", description: "" });
                                    // Proceed with your onPress function logic if validation passes
                                    onPress(); // Call the onPress function passed via props
                                }
                            }}  />
                            <Button title="Cancel" onPress={()=> {
                                setErrors({ name: "", description: "" });
                                onCancel();
                            }} />
                        </ScrollView>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default VideoModel;
