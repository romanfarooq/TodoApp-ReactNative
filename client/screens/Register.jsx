import { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Button } from "react-native-paper";

const Register = () => {

  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleImage = () => {
    navigation.navigate("Camera");
  };

  const handleRegister = () => {
    console.log("register");
  };

  return (
    <View style={styles.container}>
      <Avatar.Image
        size={100}
        source={{ uri: avatar ? avatar : null }}
        style={styles.avatar}
      />
      <TouchableOpacity onPress={handleImage}>
        <Text style={styles.textPhoto}>Change Photo</Text>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Button
        disabled={!name && !email && !password}
        style={styles.btn}
        onPress={handleRegister}
      >
        <Text style={styles.textRegister}>Login</Text>
      </Button>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.textLogin}>Already have a Account, Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "#900",
  },
  inputContainer: {
    width: "70%",
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#b5b5b5",
    padding: 10,
    paddingLeft: 15,
    borderRadius: 5,
    marginVertical: 10,
    fontSize: 15,
  },
  btn: {
    backgroundColor: "#900",
    padding: 5,
    width: "70%",
  },
  textRegister: {
    color: "white",
  },
  textLogin: {
    color: "#900",
    height: 30,
    margin: 20,
  },
});

export default Register;
