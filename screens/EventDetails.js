import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  doc,
  onSnapshot,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { database } from "../firebaseConfig";
import { styles } from "../styles";
import { useAuth } from "../context/AuthContext";
import { ImageBackground } from "react-native";

export default function EventDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = useAuth();
  const { eventId } = route.params;
  const [event, setEvent] = useState(null);
  const [favorited, setFavorited] = useState(false);
  const [participating, setParticipating] = useState(false);
  const [participantsCount, setParticipantsCount] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(database, "Events", eventId), (docSnap) => {
      if (docSnap.exists()) {
        setEvent(docSnap.data());
      }
    });
    return () => unsubscribe();
  }, [eventId]);

  useEffect(() => {
    if (!user) return;
    const userRef = doc(database, "users", user.uid);

    const checkFavorite = async () => {
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        setFavorited(userData.favorites?.includes(eventId));
      }
    };

    checkFavorite();
  }, [user, eventId]);

  useEffect(() => {
  if (!event || !user) return;

  setParticipantsCount(
    Array.isArray(event.participants) ? event.participants.length : 0
  );
  
  setParticipating(
    Array.isArray(event.participants) && event.participants.includes(user.uid)
  );
}, [event, user]);


  const toggleFavorito = async () => {
    const userRef = doc(database, "users", user.uid);

    try {
      if (favorited) {
        await updateDoc(userRef, {
          favorites: arrayRemove(eventId),
        });
      } else {
        await updateDoc(userRef, {
          favorites: arrayUnion(eventId),
        });
      }
      setFavorited(!favorited);
    } catch (error) {
      console.log("Erro ao atualizar favoritos do usuário:", error);
    }
  };

  const toggleParticipar = async () => {
    const eventRef = doc(database, "Events", eventId);
    const userRef = doc(database, "users", user.uid);

    try {
      if (participating) {
        await updateDoc(eventRef, {
          participants: arrayRemove(user.uid),
        });
        await updateDoc(userRef, {
          participating: arrayRemove(eventId),
        });
      } else {
        await updateDoc(eventRef, {
          participants: arrayUnion(user.uid),
        });
        await updateDoc(userRef, {
          participating: arrayUnion(eventId),
        });
      }
      setParticipating(!participating);
    } catch (error) {
      console.log("Erro ao atualizar participação:", error);
    }
  };

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  const dateObj = event.datetime.toDate();
  const date = dateObj.toLocaleDateString();
  const time = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const { latitude, longitude } = event.location;

  return (
    <ImageBackground
        source={require("../assets/img_tech4.png")}
        style={styles.background}
        resizeMode="cover"
    >
      
    <ScrollView style={styles.card}>
      <Image source={{ uri: event.imageUrl }} style={styles.image} />
      <Text style={styles.cardTitle}>{event.title}</Text>
      <Text style={styles.date}>{`${date} ${time}`}</Text>
      <Text style={styles.eventDescription}>{event.description}</Text>
      <Text style={styles.participant}>Participantes: {participantsCount}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => Linking.openURL(`https://www.google.com/maps?q=${latitude},${longitude}`)}
      >
        <Text style={styles.buttonText}>Ver no mapa</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={toggleFavorito}>
        <Text style={styles.buttonText}>
          {favorited ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={toggleParticipar}>
        <Text style={styles.buttonText}>
          {participating ? "Cancelar Participação" : "Participar do Evento"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
    </ImageBackground>
  );
}
