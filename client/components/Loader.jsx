import { View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} size={100} color="#900" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loader;