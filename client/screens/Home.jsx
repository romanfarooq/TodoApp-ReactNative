import { useState } from "react";
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

const Home = () => {

  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleDialog = () => setOpenDialog(!openDialog);

  const handleAddTask = () => {
    console.log("add task");
  };

  const tasks = [
    {
      title: "title 1",
      description: "sample 1",
      status: true,
      _id: 1,
    },
    {
      title: "title 2",
      description: "sample 2",
      status: false,
      _id: 2,
    },
  ];
  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <SafeAreaView>
            <Text style={styles.heading}>All Tasks</Text>
            {tasks && tasks.map((item) => <Task key={item._id} task={item} />)}
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
          <View style={styles.dialogContainer}>
            <TouchableOpacity onPress={handleDialog}>
              <Text>CANCEL</Text>
            </TouchableOpacity>
            <Button color="#900" onPress={handleAddTask}>
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
  dialogContainer: {
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
