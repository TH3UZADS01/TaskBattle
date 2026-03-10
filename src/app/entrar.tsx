import { StyleSheet, Text, View, TextInput } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { ButtonCriar } from "@/src/components/Button";
import ButtonCadastrar from "@/src/components/ButtonCadastrar";

export default function Page() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function entrarConta() {
    const usuario = { email, senha };
    console.log("Login:", usuario);
    router.push("/dashboard");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TaskBattle</Text>
      <Text style={styles.subtitle}>Entre na sua conta.</Text>

      <View style={styles.main}>

        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={20} color="#686868" />
          <TextInput
            style={styles.credencias}
            placeholder="E-mail"
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={20} color="#686868" />
          <TextInput
            style={styles.credencias}
            placeholder="Senha"
            secureTextEntry
            onChangeText={setSenha}
          />
        </View>

        <ButtonCriar onPress={entrarConta}/>
        <ButtonCadastrar/>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    padding:24,
    backgroundColor:"#f0f0f0",
  },

  main:{
    backgroundColor:"#ffffff",
    shadowColor:"#000",
    shadowOffset:{width:0,height:10},
    shadowOpacity:0.2,
    shadowRadius:8,
    elevation:2,
    width:"80%",
    padding:20,
    borderRadius:16,
  },

  inputBox:{
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"#fff",
    borderRadius:8,
    paddingHorizontal:10,
    marginBottom:12,
    shadowColor:"#000",
    shadowOffset:{width:0,height:5},
    shadowOpacity:0.2,
    shadowRadius:5,
    elevation:2,
  },

  credencias:{
    flex:1,
    height:40,
    marginLeft:8,
  },

  title:{
    fontFamily:"poppins-regular",
    color:"#1573ed",
    fontSize:48,
    fontWeight:900,
    marginBottom:6,
  },

  subtitle:{
    fontFamily:"poppins-regular",
    fontSize:16,
    color:"#686868",
    marginBottom:20,
  },

});