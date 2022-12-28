import React, { useState } from 'react';
import { KeyboardAvodingView, StyleSheet, Text, View, SafeAreaView, Modal, Alert, Platform, TextInput, TouchableOpacity, Keyboard, Image, KeyboardAvoidingView } from 'react-native';
import Task from './components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [source, setSource] = useState(require('./assets/gachastill.png'))
  const [ModalVisibility, setModalVisibility] = useState(false);
  const [selectedTask, setSelectedTask] = useState();

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('token', jsonValue)
    console.log(jsonValue)
  } catch (e) {
    console.log(e)
  }
}

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('token')
      console.log(jsonValue)
      if (jsonValue !== null){
        const data = JSON.parse(jsonValue)
        setTaskItems(data)
      }
    } catch(e) {
      console.log(e)
    }
  }

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (taskItems.length === 5){
      Alert.alert("MAX TASK!!")
      return;
    }
    if (task && task.trim() !== '') {
      setTaskItems([...taskItems, task])
      setTask(null)
    }
  }

  const getTask = () => {
    if (taskItems.length !== 0){
      setSource(require('./assets/gacha.gif'))
      setTimeout(() => {
        setSource(require('./assets/gachastill.png'))
        pressModal();
      }, 2250);  
    } else {
      alert("No task available, please write some");
    }
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  } 

  const pressModal = () => {
    setModalVisibility(!ModalVisibility)
    let randomTask = Math.floor(Math.random()*taskItems.length);
    if(!ModalVisibility){
      setSelectedTask(taskItems[randomTask]);
      completeTask(randomTask);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
    <Modal
      transparent={true}
      animationType='fade'
      visible={ModalVisibility}
      nRequestClose={() => {
        setModalVisibility(!ModalVisibility);
      }}
    >
    <View style={styles.modalContainer}>
      <TouchableOpacity >
        <Text style={styles.modalText}>{selectedTask}</Text>
      </TouchableOpacity>
      <TouchableOpacity >
        <Text style={styles.modalText} onPress={() => pressModal()}>{"task finished"}</Text>
      </TouchableOpacity>
    </View>
    </Modal>
      <View>
        <TouchableOpacity onPress={() => getTask()}>
          <Image 
            source={source}
          />
        </TouchableOpacity>
      </View>   
      <Text style={{fontWeight: 'bold',fontSize:32}}>Roll your task!</Text>
      <View style={styles.taskWrapper}>
      {
              taskItems.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                    <Task text={item} />
                  </TouchableOpacity>
                )
              })
            }
      </View>      
      <View style={styles.storageButtonContainer}>
        <TouchableOpacity>
              <View style={styles.storageButtons}>
                <Text style={styles.save} onPress={() => storeData(taskItems)}>SAVE</Text>
              </View>
            </TouchableOpacity> 
        <TouchableOpacity>
          <View style={styles.storageButtons}>
            <Text style={styles.load} onPress={() => getData()}>LOAD</Text>
          </View>
        </TouchableOpacity>  
        </View>
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.writeTaskWrapper}
     > 
        <TextInput style={styles.input} placeholder={'Write a task...'} value={task} onChangeText={text => setTask(text)}/>
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>  
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
    alignItems: 'center',
  },
  taskWrapper: {
    width:250,
  },
  writeTaskWrapper:{
    width:'100%',
    position: 'absolute',
    bottom:60,
    flexDirection:'row',
    justifyContent:'space-around',
    padding:20
  },
  input: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    width:250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems:'center',
  },
  modalContainer: {
    top:150,
    bottom:150,
    left:50,
    right:50,
    position: 'absolute',
    backgroundColor: '#ebdac7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    borderColor: '#c5baaf',
    borderWidth:'1',
  },
  modalText:{
    fontSize:32,
    color:'#424b54',
    marginTop:115,
  },
  modalButton:{
    top:125,
    fontSize:32,
    width:300,
  },
  storageButtonContainer:{
    position: 'absolute',
    bottom:130,
    flexDirection:'row',
    justifyContent:'space-around',
    width: 330
    
  },
  storageButtons:{
    backgroundColor: '#FFF',
    width: 160,
    height: 30,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems:'center',
  }
});
