import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import { signIn } from "../services/firebaseAuth";
import { styles } from "../styles";
import { ImageBackground } from "react-native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    
    if (!email.trim() && !password.trim()) {
      Alert.alert("Erro", "Por favor, preencha o e-mail e a senha.");
      return;
    }

    if (!email.trim()) {
      Alert.alert("Erro", "Por favor, preencha o e-mail.");
      return;
    }

    if (!password.trim()) {
      Alert.alert("Erro", "Por favor, preencha a senha.");
      return;
    }

    try {
      await signIn(email, password);
      
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        Alert.alert("Erro", "Usuário não encontrado.");
      } else if (error.code === "auth/wrong-password") {
        Alert.alert("Erro", "Senha incorreta.");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Erro", "Formato de e-mail inválido.");
      } else {
        Alert.alert("Erro", "Não foi possível fazer login. Verifique seus dados.");
      }
    }
  };

  return (
    <ImageBackground
      source={require("../assets/img_tech3.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <View style={{ width: "100%" }}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="seu@email.com"
            placeholderTextColor="#12486d"
          />

          <Text style={styles.label}>Senha:</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            placeholder="Sua senha"
            placeholderTextColor="#12486d"
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Recover")}>
            <Text style={styles.link}>Esqueceu sua senha?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.link}>Criar uma conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}


