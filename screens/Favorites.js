import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
} from "react-native";
import { database } from "../firebaseConfig";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { styles } from "../styles";
import { ImageBackground } from "react-native";

export default function FavoritesScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchFavorites = async () => {
        setLoading(true);
        try {
          const userDoc = await database.collection("users").doc(user.uid).get();
          const favIds = userDoc.data()?.favorites || [];

          if (favIds.length === 0) {
            setFavorites([]);
            setLoading(false);
            return;
          }

          const eventsSnapshot = await database
            .collection("Events")
            .where("__name__", "in", favIds)
            .get();

          const events = eventsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setFavorites(events);
        } catch (error) {
          console.log("Erro ao buscar favoritos:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchFavorites();
    }, [user])
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando favoritos...</Text>
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Você ainda não tem eventos favoritos.</Text>
      </View>
    );
  }

  return (
    <ImageBackground
    source={require("../assets/img_tech3.jpg")}
    style={styles.background}
    resizeMode="cover"
    >
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{
        padding: 16,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20,
      }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("EventDetails", { eventId: item.id })}
        >
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </TouchableOpacity>
      )}
    />
    </ImageBackground>
  );
}

