import { TouchableOpacity, Text, StyleSheet } from "react-native";

export function ButtonCriar({ onPress, title = "Continuar" }) {
  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#1573ed",
    fontSize: 16,
    fontWeight: "bold",
  },
});