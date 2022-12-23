import { View, Text, StyleSheet } from 'react-native'

const Task = (props) => {
    return (
        <View >
            <Text>{props.text}</Text>
        </View>
    )
}

export default Task;