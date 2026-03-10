import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

export function ButtonCriar({ onPress }) {
  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={() => router.push("/dashboard")}
    >
      <Text style={styles.buttonText}>Criar conta</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1573ed",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});