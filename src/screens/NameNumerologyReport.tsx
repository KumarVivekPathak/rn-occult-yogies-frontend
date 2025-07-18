import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { RouteProp, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "../components/CustomButton";

type RootStackParamList = {
  NameNumerologyReport: { id: string | number };
  // Add other screen params as needed
};

type NameNumerologyReportScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "NameNumerologyReport">;
  route: RouteProp<RootStackParamList, "NameNumerologyReport">;
};

const NumberBadge = ({ number, color = "#6366f1" }) => (
  <View style={[styles.numberBadge, { backgroundColor: color }]}>
    <Text style={styles.numberBadgeText}>{number}</Text>
  </View>
);

const SectionCard = ({
  title,
  children,
  gradient = ["#f8fafc", "#e2e8f0"],
}) => (
  <LinearGradient colors={gradient} style={styles.sectionCard}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </LinearGradient>
);

const InfoRow = ({ label, value, valueColor = "#1e293b" }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}:</Text>
    <Text style={[styles.infoValue, { color: valueColor }]}>{value}</Text>
  </View>
);

const NameNumerologyReport: React.FC<NameNumerologyReportScreenProps> = ({
  route,
}) => {
  const { id } = route.params || 20;
  const token = useAuth();
  console.log("id is ::: ", id);

  const [nameNumerologySummary, setNameNumerologySummary] = useState({
    firstNameSum: 6,
    fullNameSum: 6,
    intersectionValues: [1, 5, 3],
    neutralNumbers: [2, 3, 4, 7, 8, 9],
    luckyNumbers: [1, 5],
    unluckyNumbers: [6],
    nameNumerology: "24/6",
    fullNameNumerology: "51/6",
    targetNumbers: [1, 5, 3],
    firstName: "Vivek",
    fullName: "Vivek Pathak",
    dob: "21 Jul 2004",
  });

  const [selectedSuggestions, setSelectedSuggestions] = useState([]);

  // Mock data for name suggestions
  const suggestions = [
    {
      id: 1,
      firstName: "Pooja",
      firstNameNumerology: "32/5",
      fullName: "Pooja Upadhyay",
      fullNameNumerology: "59/5",
    },
    {
      id: 2,
      firstName: "Pooja",
      firstNameNumerology: "32/5",
      fullName: "Pooja Uppadhyay",
      fullNameNumerology: "68/5",
    },
    {
      id: 3,
      firstName: "Pooja",
      firstNameNumerology: "32/5",
      fullName: "Pooja Uppadhyay",
      fullNameNumerology: "68/5",
    },
    {
      id: 4,
      firstName: "Pooja",
      firstNameNumerology: "32/5",
      fullName: "Pooja Upadddhyay",
      fullNameNumerology: "68/5",
    },
    {
      id: 5,
      firstName: "Pooja",
      firstNameNumerology: "32/5",
      fullName: "Pooja Upadhyay",
      fullNameNumerology: "64/1",
    },
    {
      id: 6,
      firstName: "Pooja",
      firstNameNumerology: "32/5",
      fullName: "Pooja Uppadhyay",
      fullNameNumerology: "73/1",
    },
    {
      id: 7,
      firstName: "Pooja",
      firstNameNumerology: "32/5",
      fullName: "Pooja Upaadhyay",
      fullNameNumerology: "64/1",
    },
    {
      id: 8,
      firstName: "Pooja",
      firstNameNumerology: "32/5",
      fullName: "Pooja Upaddyay",
      fullNameNumerology: "64/1",
    },
    {
      id: 9,
      firstName: "Pooja",
      firstNameNumerology: "32/5",
      fullName: "Pooja Upaadhyay",
      fullNameNumerology: "66/3",
    },
    {
      id: 10,
      firstName: "Pooja",
      firstNameNumerology: "32/5",
      fullName: "Pooja Upaddyay",
      fullNameNumerology: "66/3",
    },
  ];

  const handleSelectSuggestion = (suggestion) => {
    setSelectedSuggestions((prev) => {
      const isSelected = prev.some((item) => item.id === suggestion.id);
      if (isSelected) {
        // Remove from selection
        return prev.filter((item) => item.id !== suggestion.id);
      } else {
        // Add to selection
        return [...prev, suggestion];
      }
    });
  };

  const isSelected = (suggestionId) => {
    return selectedSuggestions.some((item) => item.id === suggestionId);
  };

  const handleProcessReport = () => {
    if (selectedSuggestions.length === 0) {
      Alert.alert(
        "No Selection",
        "Please select at least one name suggestion to proceed."
      );
      return;
    }

    Alert.alert(
      "Selected Names",
      `You have selected ${
        selectedSuggestions.length
      } name(s):\n\n${selectedSuggestions.map((s) => s.fullName).join("\n")}`,
      [
        {
          text: "OK",
          onPress: () =>
            console.log("Selected suggestions:", selectedSuggestions),
        },
      ]
    );
  };

  const renderNumbersList = (numbers, color) => (
    <View style={styles.numbersContainer}>
      {numbers.map((number, index) => (
        <NumberBadge key={index} number={number} color={color} />
      ))}
    </View>
  );

  const NumerologyBadge = ({ value, color = "#6366f1" }) => (
    <View style={[styles.numerologyBadge, { backgroundColor: color }]}>
      <Text style={styles.numerologyBadgeText}>{value}</Text>
    </View>
  );

  const CustomCheckbox = ({ checked, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Text style={styles.checkboxText}>✓</Text>}
      </View>
    </TouchableOpacity>
  );

  // Render item for FlatList
  const renderItem = ({ item: suggestion, index }) => (
    <TouchableOpacity
      key={suggestion.id}
      style={[
        styles.tableRow,
        isSelected(suggestion.id) && styles.selectedRow,
        index % 2 === 0 && styles.evenRow,
      ]}
      onPress={() => handleSelectSuggestion(suggestion)}
      activeOpacity={0.7}
    >
      <View style={styles.selectColumn}>
        <CustomCheckbox
          checked={isSelected(suggestion.id)}
          onPress={() => handleSelectSuggestion(suggestion)}
        />
      </View>
      <View style={styles.nameColumn}>
        <Text style={styles.nameText}>{suggestion.firstName}</Text>
      </View>
      <View style={styles.numerologyColumn}>
        <NumerologyBadge
          value={suggestion.firstNameNumerology}
          color="#10b981"
        />
      </View>
      <View style={styles.fullNameColumn}>
        <Text style={styles.fullNameText} numberOfLines={2}>
          {suggestion.fullName}
        </Text>
      </View>
      <View style={styles.numerologyColumn}>
        <NumerologyBadge
          value={suggestion.fullNameNumerology}
          color="#f59e0b"
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            padding: 16,
            paddingBottom: 50,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Summary Cards */}
          <SectionCard title="Name Analysis" gradient={["#fef3c7", "#fed7aa"]}>
            <View style={styles.twoColumnContainer}>
              <View style={styles.column}>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>
                    Current First Name Sum:
                  </Text>
                  <NumberBadge
                    number={nameNumerologySummary.firstNameSum}
                    color="#8b5cf6"
                  />
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>
                    Current Full Name Sum:
                  </Text>
                  <NumberBadge
                    number={nameNumerologySummary.fullNameSum}
                    color="#8b5cf6"
                  />
                </View>
              </View>
              <View style={styles.column}>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Intersection Values:</Text>
                  {renderNumbersList(
                    nameNumerologySummary.intersectionValues,
                    "#f59e0b"
                  )}
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Lucky Numbers:</Text>
                  {renderNumbersList(
                    nameNumerologySummary.luckyNumbers,
                    "#10b981"
                  )}
                </View>
              </View>
            </View>

            <View style={styles.twoColumnContainer}>
              <View style={styles.column}>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Neutral Numbers:</Text>
                  {renderNumbersList(
                    nameNumerologySummary.neutralNumbers,
                    "#6b7280"
                  )}
                </View>
              </View>
              <View style={styles.column}>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Unlucky Numbers:</Text>
                  {renderNumbersList(
                    nameNumerologySummary.unluckyNumbers,
                    "#ef4444"
                  )}
                </View>
              </View>
            </View>
          </SectionCard>

          <SectionCard
            title="Original Name Details"
            gradient={["#f0f9ff", "#e0f2fe"]}
          >
            <View style={styles.twoColumnContainer}>
              <View style={styles.column}>
                <InfoRow
                  label="First Name"
                  value={nameNumerologySummary.firstName}
                  valueColor="#0369a1"
                />
                <InfoRow
                  label="Full Name"
                  value={nameNumerologySummary.fullName}
                  valueColor="#0369a1"
                />
                <InfoRow
                  label="Date of Birth"
                  value={nameNumerologySummary.dob}
                  valueColor="#0369a1"
                />
              </View>
              <View style={styles.column}>
                <View style={styles.numerologyItem}>
                  <Text style={styles.numerologyLabel}>
                    First Name Numerology:
                  </Text>
                  <View style={styles.numerologyBadge}>
                    <Text style={styles.numerologyValue}>
                      {nameNumerologySummary.nameNumerology}
                    </Text>
                  </View>
                </View>
                <View style={styles.numerologyItem}>
                  <Text style={styles.numerologyLabel}>
                    Full Name Numerology:
                  </Text>
                  <View style={styles.numerologyBadge}>
                    <Text style={styles.numerologyValue}>
                      {nameNumerologySummary.fullNameNumerology}
                    </Text>
                  </View>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Target Numbers:</Text>
                  {renderNumbersList(
                    nameNumerologySummary.targetNumbers,
                    "#f59e0b"
                  )}
                </View>
              </View>
            </View>
          </SectionCard>

          <View>
            <Text style={styles.headerTitle}>Name Suggestions</Text>
            <Text style={styles.headerSubtitle}>
              Select your preferred name variations
            </Text>
          </View>

          <View style={styles.tableHeader}>
            <View style={styles.selectColumn}>
              <Text style={styles.tableHeaderText}>Select</Text>
            </View>
            <View style={styles.nameColumn}>
              <Text style={styles.tableHeaderText}>Name</Text>
            </View>
            <View style={styles.numerologyColumn}>
              <Text style={styles.tableHeaderText}>Numerology</Text>
            </View>
            <View style={styles.fullNameColumn}>
              <Text style={styles.tableHeaderText}>Full Name</Text>
            </View>
            <View style={styles.numerologyColumn}>
              <Text style={styles.tableHeaderText}>Numerology</Text>
            </View>
          </View>

          <FlatList
            data={suggestions}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={false}
          />

          <CustomButton
            title="Generate Report"
            onPress={handleProcessReport}
            // disabled={loading}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NameNumerologyReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "500",
    color: "#1e293b",
    textAlign: "center",
  },
  sectionCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 16,
    textAlign: "center",
  },
  twoColumnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  column: {
    flex: 1,
  },
  summaryItem: {
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 8,
  },
  numberBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  numberBadgeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  numbersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748b",
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "right",
    flex: 1,
  },
  numerologyItem: {
    marginBottom: 16,
    alignItems: "center",
  },
  numerologyLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748b",
    marginBottom: 8,
    textAlign: "center",
  },
  numerologyValue: {
    color: "#1e293b",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  insightsContainer: {
    gap: 16,
  },
  insightItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#8b5cf6",
  },
  insightIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#8b5cf6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  insightIconText: {
    fontSize: 16,
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
    fontWeight: "500",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },
  flatListContent: {
    paddingBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#e2e8f0",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginHorizontal: 0,
    marginBottom: 6,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  evenRow: {
    backgroundColor: "#f8fafc",
  },
  selectedRow: {
    backgroundColor: "#dbeafe",
    borderWidth: 2,
    borderColor: "#3b82f6",
  },
  selectColumn: {
    flex: 0.73,
    alignItems: "center",
  },
  nameColumn: {
    flex: 1,
    paddingHorizontal: 4,
  },
  numerologyColumn: {
    flex: 1.6,
    alignItems: "center",
  },
  fullNameColumn: {
    flex: 2,
    paddingHorizontal: 4,
  },
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
  nameText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1e293b",
  },
  fullNameText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#334155",
    lineHeight: 16,
  },
  numerologyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 40,
    alignItems: "center",
  },
  numerologyBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
