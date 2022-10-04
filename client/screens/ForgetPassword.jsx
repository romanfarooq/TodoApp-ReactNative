import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../redux/action";

const ForgetPassword = ({ navigation }) => {

  const { loading } = useSelector((state) => state.message);

  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const forgetHandler = async () => {
    await dispatch(forgetPassword(email));
    navigation.navigate("resetpassword");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>WELCOME</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <Button
        style={styles.btn}
        onPress={forgetHandler}
        color="white"
        disabled={loading}
        loading={loading}
      >
        Send Email
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

export default ForgetPassword;
