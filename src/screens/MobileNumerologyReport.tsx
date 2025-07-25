import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";
import { getMobileNumerologyReports } from "../service/APIFunctions";

const MobileNumerologyReport = () => {
    const {token} = useAuth();
    const [reports, setReports] = useState([
        {
            id: "1",
            name: "Vivek Pathak"
        },
        {
            id: "2",
            name: "Pooja Upadhyay"
        },
        {
            id: "3",
            name: "Nidhi Jha"
        }
    ]);

    useEffect(() => {
        mobileNumerologyReports();
    }, []);

    const mobileNumerologyReports = async () => {
        try {
            const response = await getMobileNumerologyReports(token || '');
            const responseData = response.data;
            const listData = responseData.map((item : any) => {
                const id = item.id;
                const firstName = item.first_name || '';
                const middleName = item.middle_name ? ` ${item.middle_name}` : '';
                const lastName = item.last_name ? ` ${item.last_name}` : '';
                const name = `${firstName}${middleName}${lastName}`;
                return {
                    id: id,
                    name: name
                }
            })
            setReports(listData);
        } catch (error) {
            console.error("Get mobile numerology report failed:", error);
        }
    };

    const handleView = (id : string) => {
        console.log("View report:", id);
        // Implement view functionality
    };

    const handleEdit = (id : string) => {
        console.log("Edit report:", id);
        // Implement edit functionality
    };

    const handleDelete = (id : string) => {
        console.log("Delete report:", id);
        // Implement delete functionality
        setReports(reports.filter(report => report.id !== id));
    };

    const handleDownload = (id : string) => {
        console.log("Download report:", id);
        // Implement download functionality
    };

    const renderHeader = () => (
        <View style={styles.headerRow}>
            <Text style={styles.serialHeader}>S.No</Text>
            <Text style={styles.nameHeader}>Name</Text>
            <Text style={styles.actionsHeader}>Actions</Text>
        </View>
    );

    const renderListItem = ({ item, index }: {item : {id : string, name : string}, index : number}) => (
        <View style={styles.reportItem}>
            <View style={styles.serialColumn}>
                <Text style={styles.serialText}>{index +1}</Text>
            </View>
            
            <View style={styles.nameColumn}>
                <Text style={styles.nameText}>{item.name}</Text>
            </View>
            
            <View style={styles.actionsColumn}>
                <TouchableOpacity 
                    style={[styles.actionButton, styles.viewButton]}
                    onPress={() => handleView(item.id)}
                >
                    <Text style={styles.buttonText}>View</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={[styles.actionButton, styles.editButton]}
                    onPress={() => handleEdit(item.id)}
                >
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDelete(item.id)}
                >
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={[styles.actionButton, styles.downloadButton]}
                    onPress={() => handleDownload(item.id)}
                >
                    <Text style={styles.buttonText}>Download</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={["bottom"]}>
            <FlatList
                data={reports}
                renderItem={renderListItem}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={renderHeader}
                stickyHeaderHiddenOnScroll={false}
                ListEmptyComponent={<Text style={styles.emptyText}>No reports found</Text>}
            />
        </SafeAreaView>
    );
};

export default MobileNumerologyReport;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8fafc",
        padding: 12,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#1e293b",
        textAlign: "center",
        marginBottom: 20,
        paddingVertical: 8,
    },
    headerRow: {
        flexDirection: "row",
        backgroundColor: "#e2e8f0",
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderRadius: 8,
        marginBottom: 4,
        borderWidth: 1,
        borderColor: "#cbd5e1",
    },
    serialHeader: {
        flex: 0.8,
        fontSize: 14,
        fontWeight: "600",
        color: "#374151",
        textAlign: "center",
    },
    nameHeader: {
        flex: 2,
        fontSize: 14,
        fontWeight: "600",
        color: "#374151",
        textAlign: "center",
    },
    actionsHeader: {
        flex: 4,
        fontSize: 14,
        fontWeight: "600",
        color: "#374151",
        textAlign: "center",
    },
    reportItem: {
        flexDirection: "row",
        backgroundColor: "#ffffff",
        paddingVertical: 12,
        paddingHorizontal: 8,
        marginVertical: 2,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    serialColumn: {
        flex: 0.8,
        alignItems: "center",
    },
    nameColumn: {
        flex: 2,
        paddingHorizontal: 8,
    },
    actionsColumn: {
        flex: 4,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
    },
    serialText: {
        fontSize: 14,
        color: "#6b7280",
        fontWeight: "500",
    },
    nameText: {
        fontSize: 15,
        color: "#374151",
        fontWeight: "500",
    },
    actionButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        minWidth: 65,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 2,
    },
    viewButton: {
        backgroundColor: "#10b981",
    },
    editButton: {
        backgroundColor: "#f59e0b",
    },
    deleteButton: {
        backgroundColor: "#ef4444",
    },
    downloadButton: {
        backgroundColor: "#3b82f6",
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 12,
        fontWeight: "600",
        textAlign: "center",
    },
    emptyText: {
        flex: 1,
        fontSize: 16,
        fontWeight: "600",
        color: "#1e293b",
        textAlign: "center",
    },
});