import { ThemeContext } from "@/src/context/ThemeContext";
import { darkTheme, lightTheme } from "@/src/theme/colors";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Tarefas() {
  const { dark } = useContext(ThemeContext);
  const theme = dark ? darkTheme : lightTheme;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background },
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <Text style={{ color: theme.text, fontSize: 18, fontWeight: "bold" }}>
        Lista completa de tarefas
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
});
