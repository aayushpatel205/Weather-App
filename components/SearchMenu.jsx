import React from "react";
import { Text ,TouchableOpacity } from "react-native";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


const SearchMenu = ({data,setLocationName,setTextInput}) => {
  return (
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            marginHorizontal: 8,
            marginTop: 15,
            marginBottom: 15,
            fontSize: 18,
            color: "#000",
            borderBottomColor: "#bdbdbd",
            borderBottomWidth: 2,
            padding: 5,
            display: 'flex',
            flexDirection: "row",
            gap: 1,
            alignItems: "center"
          }}
          onPress={()=>{
            setLocationName(`${data?.name},${data?.country}`);
            setTextInput("");
          }}
        >
          <FontAwesomeIcon icon={faMapMarkerAlt} size={20} color="#000" />
          <Text style={{fontSize: 18,overflow: "scroll"}}>{data?.name +", "+ data?.country + " "}</Text>
        </TouchableOpacity >
  );
};

export default SearchMenu;
