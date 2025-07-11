import { StyleSheet, Platform, StatusBar } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 30,
  },
  centeredContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
  backgroundColor: "#fff",
},
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    //color: "#333",
    color:"#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: "#1e92bf",
  },
  input: {
    borderWidth: 1,
    borderColor: "#3e4451",
    borderRadius: 8,
    color:"#fff",
    padding: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#1e92bf",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    color: "#1e92bf",
    fontWeight: "500",
    marginTop: 8,
  },
  section: {
    marginTop: 16,
    alignItems: "center",
    backgroundColor: "#ffff",
    color:"#1e92bf",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  local: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  participant: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    marginBottom:8,
  },
  description: {
    fontSize: 15,
    color: "#444",
    marginTop: 8,
    textAlign:"justify",
  },
  mapLink: {
    color: "blue",
    marginTop: 10,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  list: {
    padding: 16,
  },
  background: {
  flex: 1,
  justifyContent: "center",
  padding: 20,
  },
  placeholder: {
    color: "#1e748c",
    fontSize: 14,
  },
});