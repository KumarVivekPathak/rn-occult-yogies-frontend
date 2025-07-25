import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, StyleSheet, TouchableOpacity, View, FlatList, Dimensions } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Dashboard = () => {
  const navigation = useNavigation();

  const data = [
    {
      title: "Name Numerology",
      navigateTo: "NameNumerology",
      icon: "person-outline",
      color: "#3b82f6",
      bgColor: "#eff6ff",
    },
    {
      title: "Mobile Numerology",
      navigateTo: "MobileNumerology",
      icon: "phone-portrait-outline",
      color: "#10b981",
      bgColor: "#f0fdf4",
    },
    {
        title: "Advance Mobile Numerology",
        navigateTo: "MobileNumerology",
        icon: "phone-portrait-outline",
        color: "#10b981",
        bgColor: "#f0fdf4",
      },
    {
      title: "Coming Soon",
      navigateTo: "ComingSoon",
      icon: "add-circle-outline",
      color: "#6b7280",
      bgColor: "#f9fafb",
    },
  ];

  const NavigationCard = ({ title, navigateTo, icon, color, bgColor }) => {
    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor: bgColor }]}
        onPress={() => navigation.navigate(navigateTo)}
        activeOpacity={0.7}
      >
        <View style={styles.cardContent}>
          <View style={[styles.iconContainer, { backgroundColor: color + "20" }]}>
            <Ionicons name={icon} size={32} color={color} />
          </View>
          <Text style={styles.cardTitle}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <NavigationCard
            title={item.title}
            navigateTo={item.navigateTo}
            icon={item.icon}
            color={item.color}
            bgColor={item.bgColor}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Dashboard;


const CARD_MARGIN = 6;
const CARD_WIDTH = (Dimensions.get("window").width - 16 * 2 - CARD_MARGIN * 4) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  flatListContent: {
    padding: 16,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    minHeight: 120,
    marginHorizontal: CARD_MARGIN,
  },
  cardContent: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
    lineHeight: 18,
  },
});
