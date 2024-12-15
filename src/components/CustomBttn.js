import {TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";


const CustomBttn = ({onPress}) => {

    return(
        <TouchableOpacity
            onPress={onPress}
            className="w-16 h-16 bg-gray-500 z-10 absolute right-4 bottom-4 rounded-full flex items-center justify-center"
        >
            <Ionicons
                name="add"
                size={30}
                color="#333"
                style={{fontSize:30,color:'white'}}
            />
        </TouchableOpacity>
    )
}


export default CustomBttn;
