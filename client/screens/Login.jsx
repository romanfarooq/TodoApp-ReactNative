import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/action";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch({ type: "clearError" });
    }
  }, [error, dispatch, alert]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome</Text>
      <View style={styles.inputContainer}>
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
        disabled={!email || !password}
        style={styles.btn}
        onPress={handleLogin}
      >
        <Text style={styles.textLogin}>Login</Text>
      </Button>
      <Text style={styles.textOr}>OR</Text>
      <TouchableOpacity onPress={() => navigation.navigate("register")}>
        <Text style={styles.textRegister}>Sign Up</Text>
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
  heading: {
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
    marginVertical: 10,
    fontSize: 15,
  },
  btn: {
    backgroundColor: "#900",
    padding: 5,
    width: "70%",
  },
  textLogin: {
    color: "white",
  },
  textOr: {
    marginTop: 20,
  },
  textRegister: {
    color: "#900",
    height: 30,
    margin: 20,
  },
});

export default Login;
