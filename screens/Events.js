import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { database } from "../firebaseConfig";
import { styles } from "../styles";
import { ImageBackground } from "react-native";

export default function Events() {
  const [events, setEvents] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
  const unsubscribe = database
    .collection("Events")
    .orderBy("datetime") 
    .onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(data);
    });

  return () => unsubscribe();
}, []);

  const renderItem = ({ item }) => {
    const dateObj = item.datetime.toDate();
    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const { latitude, longitude } = item.location;
    

    return (
      <ImageBackground
        source={require("../assets/img_tech4.png")}
        style={styles.background}
        resizeMode="cover"
      >
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("EventDetails", { eventId: item.id })}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.date}>{`${date} ${time}`}</Text>
        <Text style={styles.local}>Local:📍{item.local}</Text>
        <Text
          style={styles.link}
          onPress={() => Linking.openURL(`https://www.google.com/maps?q=${latitude},${longitude}`)}
        >
          Ver no mapa
        </Text>
      </TouchableOpacity>
      </ImageBackground>
    );
  };

  return (
    <ImageBackground
        source={require("../assets/img_tech4.png")}
        style={styles.background}
        resizeMode="cover"
      >
    <View style={styles.container}>
      <FlatList data={events} keyExtractor={(item) => item.id} renderItem={renderItem} />
    </View>
    </ImageBackground>
  );
}