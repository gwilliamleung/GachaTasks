import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Alert } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={{fontWeight: 'bold',fontSize:24}}>WHEEL</Text>
      </View> 
      <Text>Test</Text>
      <Text>Test</Text>
      <Text>Test</Text>
      <Text>Test</Text>
      <Text>Test</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
