import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { updatePassword } from "../redux/action";

const ChangePassword = () => {

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();

  const handleChangePassword = () => {
    dispatch(updatePassword(oldPassword, newPassword));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Change Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder="Old Password"
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
        />
      </View>
      <Button style={styles.btn} onPress={handleChangePassword} color="white">
        Change
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    margin: 20,
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
    marginVertical: 15,
    fontSize: 15,
  },
  btn: {
    backgroundColor: "#900",
    padding: 5,
    width: "70%",
  },
});

export default ChangePassword;
