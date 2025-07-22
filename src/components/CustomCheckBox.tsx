import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const CustomCheckbox = ({ checked, onPress }: { checked: boolean; onPress: () => void }) => {
    return (
    <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Text style={styles.checkboxText}>✓</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default CustomCheckbox;

const styles = StyleSheet.create({
    checkboxContainer: {
        padding: 4,
      },
      checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: "#cbd5e1",
        borderRadius: 4,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
      },
      checkboxChecked: {
        backgroundColor: "#3b82f6",
        borderColor: "#3b82f6",
      },
      checkboxText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "700",
      },
  });