import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function ButtonCadastrar() {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => router.push("/")}
    >
      <Text style={styles.buttonText}>Não tem uma conta? Criar</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#1573ed",
    fontSize: 16,
    fontWeight: "500",
  },
});