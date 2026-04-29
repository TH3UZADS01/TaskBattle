import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ThemeContext } from "@/src/context/ThemeContext";
import { lightTheme, darkTheme } from "@/src/theme/colors";

export default function Perfil() {
  const [usuario, setUsuario] = useState<any>(null);
  const [xp, setXp] = useState(0);
  const [concluidas, setConcluidas] = useState<any[]>([]);

  const { dark } = useContext(ThemeContext);
  const theme = dark ? darkTheme : lightTheme;

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const user = await AsyncStorage.getItem("userLogado");
    const parsed = user ? JSON.parse(user) : null;

    if (!parsed) return;

    setUsuario(parsed);

    const tarefas = await AsyncStorage.getItem(`tarefas_${parsed.email}`);
    const lista = tarefas ? JSON.parse(tarefas) : [];

    const tarefasConcluidas = lista.filter((t: any) => t.concluida);
    setConcluidas(tarefasConcluidas);

    const xpTotal = tarefasConcluidas.reduce(
      (acc: number, t: any) => acc + t.xp,
      0,
    );

    setXp(xpTotal);
  }

  function nivel() {
    return Math.floor(xp / 100);
  }

  function patente() {
    if (xp < 100) return "Iniciante";
    if (xp < 300) return "Soldado";
    if (xp < 600) return "Elite";
    return "Lenda";
  }

  const renderItem = ({ item }: { item: any }) => (
    <Text style={[styles.tarefaConcluida, { color: theme.text }]}>
      +{item.xp} XP - {item.titulo}
    </Text>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.main, { backgroundColor: theme.card }]}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: "https://i.pinimg.com/736x/91/53/5b/91535bc90a800b532116028457cdd0f9.jpg",
            }}
            style={styles.avatar}
          />
        </View>

        <Text style={[styles.name, { color: theme.text }]}>
          {usuario?.username}
        </Text>

        <Text style={{ color: theme.text }}>Patente: {patente()}</Text>

        <Text style={{ color: theme.text }}>Nível: {nivel()}</Text>

        <Text style={styles.xp}>XP total: {xp}</Text>

        <View style={styles.tarefasContainer}>
          <Text style={[styles.subtitulo, { color: theme.text }]}>
            Últimas tarefas concluídas:
          </Text>

          {concluidas.length === 0 ? (
            <Text style={{ color: theme.text, marginTop: 10 }}>
              Nenhuma tarefa concluída ainda
            </Text>
          ) : (
            <FlatList
              data={concluidas}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 16 },

  main: {
    width: "100%",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
  },

  avatarContainer: {
    borderWidth: 3,
    borderColor: "#1573ed",
    borderRadius: 100,
    padding: 5,
    marginBottom: 10,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  xp: {
    color: "#1573ed",
    fontWeight: "bold",
    marginTop: 5,
  },

  tarefasContainer: {
    width: "100%",
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 15,
    maxHeight: 300,
  },

  subtitulo: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  tarefaConcluida: {
    fontSize: 14,
    marginVertical: 5,
  },
});
