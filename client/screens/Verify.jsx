import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { loadUser, verify } from "../redux/action";

const Verify = () => {

  const [otp, setOtp] = useState();
  const dispatch = useDispatch();

  const handleVerify = async () => {
    await dispatch(verify(otp));
    dispatch(loadUser());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Verification</Text>
      <View style={styles.inputConatiner}>
        <TextInput
          style={styles.input}
          placeholder="OTP"
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
        />
      </View>
      <Button style={styles.btn} color="white" onPress={handleVerify}>
        Verify
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

export default Verify;
