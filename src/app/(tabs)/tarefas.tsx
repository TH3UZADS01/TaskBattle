import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

import { ThemeContext } from "@/src/context/ThemeContext";
import { lightTheme, darkTheme } from "@/src/theme/colors";

export default function Tarefas() {
  const [tarefas, setTarefas] = useState<any[]>([]);
  const [texto, setTexto] = useState("");
  const [usuario, setUsuario] = useState<any>(null);
  const [editando, setEditando] = useState<number | null>(null);
  const [importancia, setImportancia] = useState("media");

  const { dark } = useContext(ThemeContext);
  const theme = dark ? darkTheme : lightTheme;

  useEffect(() => {
    carregarUsuario();
  }, []);

  async function carregarUsuario() {
    const user = await AsyncStorage.getItem("userLogado");
    const parsed = user ? JSON.parse(user) : null;

    if (parsed) {
      setUsuario(parsed);
      carregarTarefas(parsed.email);
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

  function adicionarOuEditar() {
    if (!texto) return;

    if (editando) {
      const lista = tarefas.map((t) =>
        t.id === editando
          ? {
              ...t,
              titulo: texto,
              importancia,
              xp: calcularXP(importancia),
            }
          : t,
      );
      salvar(lista);
      setEditando(null);
      setTexto("");
      setImportancia("media");
    } else {

      const nova = {
        id: Date.now(),
        titulo: texto,
        importancia,
        concluida: false,
        xp: calcularXP(importancia),
      };
      salvar([...tarefas, nova]);
      setTexto("");
      setImportancia("media");
    }
  }

  function toggle(id: number) {
    const lista = tarefas.map((t) =>
      t.id === id ? { ...t, concluida: !t.concluida } : t,
    );
    salvar(lista);
  }

  function excluir(id: number) {
    Alert.alert("Excluir", "Tem certeza?", [
      { text: "Cancelar" },
      {
        text: "Sim",
        onPress: () => {
          const lista = tarefas.filter((t) => t.id !== id);
          salvar(lista);
        },
      },
    ]);
  }

  function editar(item: any) {
  setTexto(item.titulo);
  setEditando(item.id);
  setImportancia(item.importancia);
}

  function calcularXP(nivel: string) {
    if (nivel === "alta") return 30;
    if (nivel === "media") return 20;
    return 10;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.main, { backgroundColor: theme.card }]}>
        <Text style={[styles.title, { color: theme.text }]}>Suas tarefas</Text>

        <TextInput
          style={[
            styles.input,
            { backgroundColor: theme.background, color: theme.text },
          ]}
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

        <TouchableOpacity style={styles.button} onPress={adicionarOuEditar}>
          <Text style={styles.buttonText}>
            {editando ? "Salvar edição" : "+ Adicionar"}
          </Text>
        </TouchableOpacity>

        <FlatList
          data={tarefas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: theme.background }]}>
              <TouchableOpacity onPress={() => toggle(item.id)}>
                <Text
                  style={{
                    color: theme.text,
                    textDecorationLine: item.concluida
                      ? "line-through"
                      : "none",
                  }}
                >
                  {item.titulo}
                </Text>
              </TouchableOpacity>

              <View style={styles.actions}>
                <Text style={styles.xp}>+{item.xp} XP</Text>
                <TouchableOpacity onPress={() => editar(item)}>
                  <Ionicons name="pencil" size={20} color={theme.text} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => excluir(item.id)}>
                  <Ionicons name="trash" size={20} color={theme.text} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },

  main: {
    padding: 20,
    borderRadius: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  input: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#1573ed",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#f7f7f7",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  actions: {
    flexDirection: "row",
    gap: 10,
  },

  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },

  tag: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#141414",
    color: "#ffffff",
  },

  active: {
    backgroundColor: "#1573ed",
    color: "#fff",
  },

  xp: {
    color: "#1573ed",
    fontWeight: "bold",
    justifyContent: "flex-end",
  },
});
