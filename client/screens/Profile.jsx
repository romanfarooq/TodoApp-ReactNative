import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { Avatar, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logout, updateProfile } from "../redux/action";
import { useNavigation, useRoute } from "@react-navigation/native";
import Loader from "../components/Loader";
import mime from "mime";

const Profile = () => {

  const { user, loading } = useSelector((state) => state.auth);

  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar.url);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const handleSubmit = async () => {
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("avatar", {
      uri: avatar,
      type: mime.getType(avatar),
      name: avatar.split("/").pop(),
    });
    await dispatch(updateProfile(myForm));
    dispatch(loadUser());
  };

  const handleImage = () => {
    navigation.navigate("camera", {
      updateProfile: true,
    });
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (route.params?.image) {
      setAvatar(route.params.image);
    }
  }, [route.params?.image]);

  return loading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <Avatar.Image
        size={100}
        source={{ uri: avatar ? avatar : null }}
        style={styles.avatar}
      />
      <TouchableOpacity onPress={handleImage}>
        <Text style={styles.text}>Change Photo</Text>
      </TouchableOpacity>
      <View style={styles.inputConatiner}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      </View>
      <Button style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.updateText}>Update</Text>
      </Button>
      <Button
        color="rgb(50,50,50)"
        onPress={() => navigation.navigate("changepassword")}
      >
        Change Password
      </Button>
      <Button color="rgb(50,50,50)" onPress={handleLogout}>
        Logout
      </Button>
      {user.verified ? null : (
        <Button onPress={() => navigation.navigate("verify")}>Verify</Button>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    backgroundColor: "#900",
  },
  text: {
    color: "#900",
    margin: 20,
  },
  inputConatiner: {
    width: "70%",
  },
  updateText: {
    color: "white",
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#b5b5b5",
    padding: 10,
    paddingLeft: 15,
    borderRadius: 5,
    marginVertical: 15,
    fontSize: 15,
  },
  btn: {
    backgroundColor: "#900",
    padding: 5,
    width: "70%",
  },
});
