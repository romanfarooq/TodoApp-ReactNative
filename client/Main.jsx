import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/action";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Footer from "./components/Footer";
import Profile from "./screens/Profile";
import Register from "./screens/Register";
import Camera from "./screens/CameraComponent";
import Loader from "./components/Loader";
import ChangePassword from "./screens/ChangePassword";
import Verify from "./screens/Verify";
import ForgetPassword from "./screens/ForgetPassword";
import ResetPassword from "./screens/ResetPassword";

const Stack = createNativeStackNavigator();

const Main = () => {

  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? "home" : "login"}>
        <Stack.Screen
          name="home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="verify"
          component={Verify}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="camera"
          component={Camera}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="changepassword"
          component={ChangePassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="forgetpassword"
          component={ForgetPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="resetpassword"
          component={ResetPassword}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      {isAuthenticated && <Footer />}
    </NavigationContainer>
  );
};

export default Main;
