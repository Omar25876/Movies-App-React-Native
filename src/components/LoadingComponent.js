import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

const LoadingComponent = ({ message = "Loading..." }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#fff" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    marginTop: 10,
    fontSize: 16,
  },
});

export default LoadingComponent;
