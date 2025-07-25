import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";


const Reports = () => {
    const navigation = useNavigation();
    const data = [
        {title: "Name Fixing", navigateTo: "NameFixing"},
        {title: "Mobile Numerology Report", navigateTo: "MobileNumerologyReport"},
    ]

    const NavigationCard = ({title, navigateTo} : {title: string, navigateTo: string}) => {
        return (
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(navigateTo)}>
                <Text>{title}</Text>
                <Ionicons name="chevron-forward" size={24} color="black" />
            </TouchableOpacity>
        );
    }

    return (
        <SafeAreaView edges={['bottom']} style={styles.container}>
            {data.map((item, index) => (
                <NavigationCard key={index} title={item.title} navigateTo={item.navigateTo} />
            ))}
        </SafeAreaView>
    );
};

export default Reports;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding : 8
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: "#fff",
        marginBottom: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        gap : 8
    },
   
});
