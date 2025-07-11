import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { signUp } from "../services/firebaseAuth";
import { database } from "../firebaseConfig";
import { styles } from "../styles";
import { ImageBackground } from "react-native";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const isValidDateBR = (dateString) => {
  
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) return false;

  const [day, month, year] = dateString.split("/").map(Number);

  const date = new Date(year, month - 1, day);
  const today = new Date();

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day &&
    date <= today
  );
};


  const isValidPassword = (pwd) => {
    const minLength = pwd.length >= 6;
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(pwd);
    return minLength && hasUpperCase && hasSpecialChar;
  };

  const handleSignUp = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (birthDate.trim() && !isValidDateBR(birthDate.trim())) {
      Alert.alert("Erro", "Data de nascimento inválida. Use o formato DD/MM/YYYY.");
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert(
        "Erro",
        "Senha inválida. Deve ter pelo menos 6 caracteres, uma letra maiúscula e um caractere especial."
      );
      return;
    }

    try {
      const user = await signUp(email, password);
      const userId = user.uid;

      await database.collection("users").doc(userId).set({
        name,
        birthDate,
        photoUrl,
        email,
      });

     
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      
      navigation.navigate("MainTabs", { screen: "Home" });
    } catch (error) {
      Alert.alert("Erro ao cadastrar", error.message);
    }
  };

  return (
     <ImageBackground
        source={require("../assets/img_tech4.png")}
        style={styles.background}
        resizeMode="cover"
        >
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
        <View>
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            autoCapitalize="words"
            placeholder="Seu nome"
             placeholderTextColor="#12486d"
          />

          <Text style={styles.label}>Data de Nascimento (DD/MM/YYYY):</Text>
          <TextInput
            value={birthDate}
            onChangeText={setBirthDate}
            style={styles.input}
            placeholder="02/07/2025"
            placeholderTextColor="#12486d"
          />

          <Text style={styles.label}>URL da foto:</Text>
          <TextInput
            value={photoUrl}
            onChangeText={setPhotoUrl}
            style={styles.input}
            placeholder="https://example.com/photo.jpg"
            placeholderTextColor="#12486d"
          />

          <Text style={styles.label}>E-mail: *</Text>
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

          <Text style={styles.label}>Senha: *</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Criar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={{ alignItems: "center", marginTop: 10 }}
          >
            <Text style={styles.link}>Já tem conta? Fazer login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </ImageBackground>
  );
}