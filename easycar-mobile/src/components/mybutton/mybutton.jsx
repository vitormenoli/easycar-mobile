import { Text, TouchableOpacity } from "react-native"
import { styles } from "./mybutton.style"

function MyButton(props) {
  return (
    <TouchableOpacity
      style={ props.theme == 'red' ? styles.btnRed : styles.btnYellow }
      onPress={() => props.onClick()}>
      <Text style={
        props.theme == 'red' ? styles.textLight : styles.textDark
      }>{props.text}</Text>
    </TouchableOpacity>
  )
}

export default MyButton