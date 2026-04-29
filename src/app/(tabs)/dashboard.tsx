import {StyleSheet,Text,View,} from "react-native";
import { useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import { ThemeContext } from "@/src/context/ThemeContext";
import { lightTheme, darkTheme } from "@/src/theme/colors";

export default function Dashboard() {
  const [progresso, setProgresso] = useState(0);
  const [xp, setXp] = useState(0);
  const [usuario, setUsuario] = useState<any>(null);

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

    const tarefasData = await AsyncStorage.getItem(`tarefas_${parsed.email}`);
    const lista = tarefasData ? JSON.parse(tarefasData) : [];

    const feitas = lista.filter((t: any) => t.concluida).length;
    const total = lista.length;

    const xpTotal = lista
      .filter((t: any) => t.concluida)
      .reduce((acc: number, t: any) => acc + t.xp, 0);

    setXp(xpTotal);
    setProgresso(total ? (feitas / total) * 100 : 0);
  }

  function calcularNivel(xp: number) {
    return Math.floor(xp / 100);
  }

  function patente(xp: number) {
    if (xp < 100) return "Iniciante";
    if (xp < 300) return "Soldado";
    if (xp < 600) return "Elite";
    if (xp < 1000) return "Lenda";
    return "Mestre";
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.main, { backgroundColor: theme.card }]}>

        <Text style={[styles.title, { color: theme.text }]}>
          Olá {usuario?.username || ""}
        </Text>

        <View style={styles.center}>
          <AnimatedCircularProgress
            size={150}
            width={12}
            fill={progresso}
            tintColor="#1573ed"
            backgroundColor="#ddd"
          >
            {() => (
              <Text style={{ color: theme.text }}>
                {Math.round(progresso)}%
              </Text>
            )}
          </AnimatedCircularProgress>

          <Text style={{ color: theme.text, marginTop: 10 }}>
            Progresso do dia
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.background }]}>
          <Text style={{ color: theme.text }}>XP total</Text>
          <Text style={styles.xp}>{xp}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.background }]}>
          <Text style={{ color: theme.text }}>Nível</Text>
          <Text style={styles.level}>{calcularNivel(xp)}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.background }]}>
          <Text style={{ color: theme.text }}>Patente</Text>
          <Text style={styles.rank}>{patente(xp)}</Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },

  main: {
    width: "100%",
    padding: 20,
    borderRadius: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },

  center: {
    alignItems: "center",
    marginBottom: 20,
  },

  card: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },

  xp: {
    color: "#1573ed",
    fontSize: 18,
    fontWeight: "bold",
  },

  level: {
    color: "#1573ed",
    fontSize: 18,
    fontWeight: "bold",
  },

  rank: {
    color: "#1573ed",
    fontSize: 16,
    fontWeight: "bold",
  },
});