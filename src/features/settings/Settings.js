import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const Settings = () => {
  return (
    <SafeAreaView style={styles.saveArea}>
      <View style={styles.container}>
        <Text>Settings</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  saveArea: {
    flex: 1,
    margin: 18,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Settings;
