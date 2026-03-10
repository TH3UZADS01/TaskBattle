import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TaskBattle</Text>
      <Text style={styles.subtitle}>Seu painel</Text>

      <View style={styles.main}>
        <Text style={styles.sectionTitle}>Suas tarefas</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Treinar</Text>
          <Text style={styles.cardXp}>+20 XP</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Estudar programação</Text>
          <Text style={styles.cardXp}>+30 XP</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Arrumar o quarto</Text>
          <Text style={styles.cardXp}>+10 XP</Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>+ Nova tarefa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f0f0f0",
  },

  main: {
    backgroundColor: "#ffffff",
    width: "90%",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },

  title: {
    color: "#1573ed",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: "#686868",
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },

  card: {
    backgroundColor: "#f7f7f7",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cardTitle: {
    fontSize: 16,
  },

  cardXp: {
    color: "#1573ed",
    fontWeight: "bold",
  },

  button: {
    marginTop: 10,
    backgroundColor: "#1573ed",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});