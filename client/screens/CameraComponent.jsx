import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { MaterialIcons } from "react-native-vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useRoute } from "@react-navigation/native";

const CameraComponent = () => {
  
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const openImagePickerAsync = async () => {

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const data = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (route.params?.updateProfile) {
      navigation.navigate("profile", { image: data.uri });
    } else {
      navigation.navigate("register", { image: data.uri });
    }

  };

  const clickPicture = async () => {

    const data = await camera.takePictureAsync();
    
    if (route.params?.updateProfile) {
      navigation.navigate("profile", { image: data.uri });
    } else {
      navigation.navigate("register", { image: data.uri });
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        type={type}
        style={styles.camera}
        ratio="1:1"
        ref={(e) => setCamera(e)}
      />
      <View style={styles.iconsContainer}>
        <MaterialIcons
          name="image"
          size={40}
          color="white"
          onPress={openImagePickerAsync}
        />
        <MaterialIcons
          name="camera"
          size={40}
          color="white"
          onPress={clickPicture}
        />
        <MaterialIcons
          name="flip-camera-android"
          size={40}
          color="white"
          onPress={() =>
            setType(
              type === CameraType.back ? CameraType.front : CameraType.back
            )
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
  },
  iconsContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    justifyContent: "space-evenly",
    width: "100%",
  },
});

export default CameraComponent;
