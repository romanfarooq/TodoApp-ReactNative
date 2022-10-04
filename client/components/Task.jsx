import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Checkbox } from "react-native-paper";
import { AntDesign } from "react-native-vector-icons";
import { useDispatch } from "react-redux";
import { loadUser, updateTask } from "../redux/action";

const Task = ({ task: { title, description, completed, _id } }) => {

  const dispatch = useDispatch();
  const [status, setStatus] = useState(completed);

  const handleCompleted = () => {
    setStatus(!status);
    dispatch(updateTask(_id));
  };

  const handleDelete = async () => {
    await dispatch(deleteTask(_id));
    dispatch(loadUser());
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Checkbox
        status={status ? "checked" : "unchecked"}
        color="#474747"
        onPress={handleCompleted}
      />
      <AntDesign
        name="delete"
        size={20}
        color="white"
        style={styles.icon}
        onPress={handleDelete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  textContainer: {
    width: "70%",
  },
  heading: {
    fontSize: 20,
    marginVertical: 7,
    color: "#900",
  },
  description: {
    color: "#4a4a4a",
  },
  icon: {
    backgroundColor: "#900",
    padding: 6,
    borderRadius: 100,
  },
});

export default Task;
