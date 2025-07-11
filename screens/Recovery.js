import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import { auth } from "../firebaseConfig";
import { styles } from "../styles";
import { ImageBackground } from "react-native";

export default function Recuperacao({ navigation }) {
  const [email, setEmail] = useState("");

  const recuperarSenha = async () => {
    if (email.trim() === "") {
      Alert.alert("Erro!", "Digite o email da conta.");
      return;
    }
    try {
      await auth.sendPasswordResetEmail(email);
      Alert.alert("Sucesso", "Email de recuperação enviado!");
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
      Alert.alert("Erro!", "Não foi possível enviar o email.");
    }
  };

  return (
    <ImageBackground
        source={require("../assets/img_tech3.jpg")}
        style={styles.background}
        resizeMode="cover"
        >
    <View style={styles.container }>
      <Text style={styles.label}>Digite o Email da conta:</Text>
      <TextInput
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor="#12486d"
      />

      <TouchableOpacity style={styles.button} onPress={recuperarSenha}>
        <Text style={styles.buttonText}>Recuperar</Text>
      </TouchableOpacity>

      <View style={styles.button}>
        <Text style={styles.buttonText}>Não está registrado?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.buttonText}>Criar conta</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.button}>
        <Text style={styles.buttonText}>Quer tentar entrar novamente?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ImageBackground>
  );
}
