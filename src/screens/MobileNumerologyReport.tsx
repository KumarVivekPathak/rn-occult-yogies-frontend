import React, { useState } from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MobileNumerologyReport = () => {
  const [dob, setDob] = useState("19-09-2002");

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView>
        <View style={styles.dobRow}>
          <Text style={styles.dobLabel}>Date of Birth :</Text>
          <Text style={styles.dobValue}>{dob}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MobileNumerologyReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  dobRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 4,
  },
  dobLabel: {
    fontWeight: "bold",
    color: "#1e293b",
    fontSize: 16
  },
  dobValue: {
    color: "#1e293b",
    fontSize : 16   
  },
});
