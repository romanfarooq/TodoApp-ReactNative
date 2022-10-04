import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
  TouchableOpacity,
} from "react-native";
import Task from "../components/Task";
import { Entypo } from "react-native-vector-icons";
import { Dialog, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { addTask, loadUser } from "../redux/action";

const Home = () => {
  
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading, message, error } = useSelector((state) => state.message);

  const handleDialog = () => setOpenDialog(!openDialog);

  const handleAddTask = async () => {
    await dispatch(addTask(title, description));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      alert(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, message, dispatch]);

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <SafeAreaView>
            <Text style={styles.heading}>All Tasks</Text>
            {user &&
              user.tasks.map((task) => <Task key={task._id} task={task} />)}
            <TouchableOpacity style={styles.addBtn} onPress={handleDialog}>
              <Entypo name="add-to-list" size={20} color="#900" />
            </TouchableOpacity>
          </SafeAreaView>
        </ScrollView>
      </View>
      <Dialog visible={openDialog} onDismiss={handleDialog}>
        <Dialog.Title>ADD A TASK</Dialog.Title>
        <Dialog.Content>
          <TextInput
            placeholder="Title"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            placeholder="Description"
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />
          <View style={styles.submitContainer}>
            <TouchableOpacity onPress={handleDialog}>
              <Text>CANCEL</Text>
            </TouchableOpacity>
            <Button
              color="#900"
              onPress={handleAddTask}
              disabled={!title || !description || loading}
            >
              ADD
            </Button>
          </View>
        </Dialog.Content>
      </Dialog>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  heading: {
    fontSize: 28,
    textAlign: "center",
    marginTop: 25,
    marginBottom: 20,
    color: "white",
    backgroundColor: "#474747",
  },
  addBtn: {
    backgroundColor: "white",
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    alignSelf: "center",
    marginVertical: 20,
    elevation: 5,
  },
  submitContainer: {
    flexDirection: "row",
    alignItems: "center",
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
});

export default Home;
