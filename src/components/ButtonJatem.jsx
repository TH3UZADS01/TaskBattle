import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function ButtonJatem() {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => router.push("/entrar")}
    >
      <Text style={styles.buttonText}>Já tem uma conta? Entrar</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    marginTop: 10,
    color: "#1573ed",
    fontSize: 16,
    fontWeight: "500",
  },
});