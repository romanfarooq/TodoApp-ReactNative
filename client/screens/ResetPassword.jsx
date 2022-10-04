import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../redux/action";

const ResetPassword = ({ navigation }) => {
  const { message, error } = useSelector((state) => state.message);

  const [otp, setOtp] = useState();
  const [newPassword, setNewPassword] = useState();
  const dispatch = useDispatch();

  const changePasswordHandler = async () => {
    await dispatch(resetPassword(otp, newPassword));
    navigation.navigate("login");
  };

  useEffect(() => {
    if (message) {
      alert(message);
      dispatch({ type: "clearMessage" });
    }
    if (error) {
      alert(error);
      dispatch({ type: "clearError" });
    }
  }, [alert, message, dispatch, error]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Change Password</Text>
      <View style={styles.inputConatiner}>
        <TextInput
          style={styles.input}
          placeholder="OTP"
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
        />
        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
        />
      </View>
      <Button style={styles.btn} onPress={changePasswordHandler} color="white">
        Reset Password
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
  inputConatiner: {
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

export default ResetPassword;
