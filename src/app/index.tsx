import { StyleSheet, Text, View, Alert } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Input } from "@/src/components/Input";
import { ButtonCriar } from "@/src/components/Button";
import ButtonJatem from "@/src/components/ButtonJatem";

export default function Page() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function criarConta() {
    if (!username || !email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    const novoUsuario = { username, email, senha };

    const dados = await AsyncStorage.getItem("usuarios");
    const lista = dados ? JSON.parse(dados) : [];

    const existe = lista.find((u: any) => u.email === email);

    if (existe) {
      Alert.alert("Erro", "E-mail já cadastrado");
      return;
    }

    lista.push(novoUsuario);

    await AsyncStorage.setItem("usuarios", JSON.stringify(lista));

    Alert.alert("Sucesso", "Conta criada!");

    router.push("/entrar");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TaskBattle</Text>
      <Text style={styles.subtitle}>Crie a sua conta.</Text>

      <View style={styles.main}>
        <Input placeholder="Nome" value={username} onChangeText={setUsername} />
        <Input placeholder="E-mail" value={email} onChangeText={setEmail} />
        <Input
          placeholder="Senha"
          value={senha}
          secureTextEntry
          onChangeText={setSenha}
        />

        <ButtonCriar onPress={criarConta} title="Criar conta" />
        <ButtonJatem />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  main: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 20,
    borderRadius: 16,
  },
  title: { fontSize: 32, fontWeight: "bold", color: "#1573ed" },
  subtitle: { marginBottom: 10 },
});
