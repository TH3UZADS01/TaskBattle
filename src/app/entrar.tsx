import { StyleSheet, Text, View, Alert } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Input } from "@/src/components/Input";
import { ButtonCriar } from "@/src/components/Button";
import ButtonCadastrar from "@/src/components/ButtonCadastrar";

export default function Entrar() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function entrarConta() {
    const dados = await AsyncStorage.getItem("usuarios");
    const lista = dados ? JSON.parse(dados) : [];

    const usuario = lista.find(
      (u: any) => u.email === email && u.senha === senha,
    );

    if (!usuario) {
      Alert.alert("Erro", "E-mail ou senha inválidos");
      return;
    }

    await AsyncStorage.setItem("userLogado", JSON.stringify(usuario));

    router.replace("/(tabs)/dashboard");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>
      <Text style={styles.subtitle}>Entrar com sua conta.</Text>

      <View style={styles.main}>
        <Input
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        fixed
        />
        <Input
          placeholder="Senha"
          value={senha}
          secureTextEntry
          onChangeText={setSenha}
          fixed
        />

        <ButtonCriar onPress={entrarConta} title="Entrar" />
        <ButtonCadastrar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#165bb5",
  },
  main: {
    backgroundColor: "#1573ed",
    width: "80%",
    padding: 20,
    borderRadius: 16,
  },
  title: { fontSize: 32, fontWeight: "bold", color: "#ffffff" },
  subtitle: { marginBottom: 10, color: "#ffffff", fontSize: 16 },
});
