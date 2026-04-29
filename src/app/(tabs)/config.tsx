import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Switch,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

import { ThemeContext } from "@/src/context/ThemeContext";
import { lightTheme, darkTheme } from "@/src/theme/colors";

export default function Config() {
  const { dark, toggleTheme } = useContext(ThemeContext);
  const theme = dark ? darkTheme : lightTheme;

  const [nome, setNome] = useState("");
  const [usuario, setUsuario] = useState<any>(null);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const user = await AsyncStorage.getItem("userLogado");
    if (user) {
      const parsed = JSON.parse(user);
      setUsuario(parsed);
      setNome(parsed.username);
    }
  }

  async function salvarNome() {
    if (!usuario) return;

    const atualizado = { ...usuario, username: nome };

    await AsyncStorage.setItem("userLogado", JSON.stringify(atualizado));

    const dados = await AsyncStorage.getItem("usuarios");
    let lista = dados ? JSON.parse(dados) : [];

    lista = lista.map((u: any) => (u.email === usuario.email ? atualizado : u));

    await AsyncStorage.setItem("usuarios", JSON.stringify(lista));

    setUsuario(atualizado);
  }

  async function logout() {
    await AsyncStorage.removeItem("userLogado");
    router.replace("/entrar");
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.main, { backgroundColor: theme.card }]}>
        <Text style={[styles.title, { color: theme.text }]}>Configurações</Text>

        <Text style={styles.subtitle}>mudar nome</Text>

        <TextInput
          style={[
            styles.input,
            { color: theme.text, backgroundColor: theme.background },
          ]}
          value={nome}
          onChangeText={setNome}
        />

        <TouchableOpacity style={styles.button} onPress={salvarNome}>
          <Text style={styles.buttonText}>Salvar nome</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={{ color: theme.text }}>Modo escuro</Text>
          <Switch value={dark} onValueChange={toggleTheme} />
        </View>

        <TouchableOpacity style={styles.logout} onPress={logout}>
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
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
  },

  title: {
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
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  button: {
    backgroundColor: "#1573ed",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  logout: {
    marginTop: 20,
    alignItems: "center",
  },

  logoutText: {
    color: "red",
    fontWeight: "bold",
  },

  subtitle: { marginBottom: 10, color: "#ffffff", fontSize: 16},
});
