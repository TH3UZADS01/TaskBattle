import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Dashboard() {
  const [tarefas, setTarefas] = useState<any[]>([]);
  const [texto, setTexto] = useState("");
  const [importancia, setImportancia] = useState("media");
  const [usuario, setUsuario] = useState<any>(null);

  useEffect(() => {
    carregarUsuario();
  }, []);

  async function carregarUsuario() {
    const user = await AsyncStorage.getItem("userLogado");
    const userParse = user ? JSON.parse(user) : null;

    if (userParse) {
      setUsuario(userParse);
      carregarTarefas(userParse.email);
    }
  }

  async function carregarTarefas(email: string) {
    const dados = await AsyncStorage.getItem(`tarefas_${email}`);
    if (dados) setTarefas(JSON.parse(dados));
  }

  async function salvar(lista: any[]) {
    setTarefas(lista);

    if (usuario) {
      await AsyncStorage.setItem(
        `tarefas_${usuario.email}`,
        JSON.stringify(lista),
      );
    }
  }

  function calcularXP(nivel: string) {
    if (nivel === "alta") return 30;
    if (nivel === "media") return 20;
    return 10;
  }

  async function adicionarTarefa() {
    if (!texto) return;

    const nova = {
      id: Date.now(),
      titulo: texto,
      importancia,
      concluida: false,
      xp: calcularXP(importancia),
    };

    const lista = [...tarefas, nova];
    salvar(lista);
    setTexto("");
  }

  async function toggleTarefa(id: number) {
    const lista = tarefas.map((t) =>
      t.id === id ? { ...t, concluida: !t.concluida } : t,
    );
    salvar(lista);
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.sectionTitle}>
          Suas tarefas {usuario ? `(${usuario.username})` : ""}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nova tarefa..."
          value={texto}
          onChangeText={setTexto}
        />

        <View style={styles.row}>
          <TouchableOpacity onPress={() => setImportancia("baixa")}>
            <Text
              style={[styles.tag, importancia === "baixa" && styles.active]}
            >
              Baixa
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setImportancia("media")}>
            <Text
              style={[styles.tag, importancia === "media" && styles.active]}
            >
              Média
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setImportancia("alta")}>
            <Text style={[styles.tag, importancia === "alta" && styles.active]}>
              Alta
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={adicionarTarefa}>
          <Text style={styles.buttonText}>+ Nova tarefa</Text>
        </TouchableOpacity>

        <FlatList
          data={tarefas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.card, item.concluida && { opacity: 0.5 }]}
              onPress={() => toggleTarefa(item.id)}
            >
              <Text
                style={{
                  textDecorationLine: item.concluida ? "line-through" : "none",
                }}
              >
                {item.titulo}
              </Text>

              <Text style={styles.xp}>+{item.xp} XP</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 16,
  },

  main: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 20,
    borderRadius: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },

  input: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },

  tag: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#ddd",
  },

  active: {
    backgroundColor: "#1573ed",
    color: "#fff",
  },

  card: {
    backgroundColor: "#f7f7f7",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  xp: {
    color: "#1573ed",
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#1573ed",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
