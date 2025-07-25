import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomInput from "../components/CustomInput";
import DOBPicker from "../components/DOBPicker";
import GenderPicker from "../components/GenderPicker";
import { z, ZodError } from "zod";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigation } from "../../navigation/types";
import CustomCheckbox from "../components/CustomCheckBox";
import { generateMobileNumerologyReport } from "../service/APIFunctions";
import { MobileNumerologyDTO } from "../service/types";
import { useAuth } from "../context/AuthContext";

const mobileNumerologySchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  mobileNumber: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(10, "Mobile number must be at most 10 digits"),
  email: z.string().email("Invalid email address"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  areaOfStruggle: z.array(z.number()).optional(),
});

type MobileNumerologyErrors = {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  mobileNumber?: string;
  email?: string;
  dob?: string;
  gender?: string;
  areaOfStruggle?: number[];
};

const MobileNumerology = () => {
  const {token} = useAuth();
  const navigation = useNavigation<RootStackNavigation>();
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [errors, setErrors] = useState<MobileNumerologyErrors>({});
  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];
  const areaOfStruggleOptions = [
    { id: 1, name: "Career" },
    { id: 2, name: "Health" },
    { id: 3, name: "Relationships" },
    { id: 4, name: "Job" },
    { id: 5, name: "Faimily" },
  ];
  const [selectedAreaOfStruggle, setSelectedAreaOfStruggle] = useState<
    number[]
  >([]);

  const toggleOption = (id: number) => {
    setSelectedAreaOfStruggle((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const ValidateForm = () => {
    const result = mobileNumerologySchema.safeParse({
      firstName,
      middleName,
      lastName,
      mobileNumber,
      email,
      dob,
      gender,
      areaOfStruggle: selectedAreaOfStruggle,
    });

    if (!result.success) {
      const fieldErrors: MobileNumerologyErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof MobileNumerologyErrors;
        if (field) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const onReset = () => {
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setDob("");
    setEmail("");
    setGender("");
    setMobileNumber("");
    setErrors({});
  };

  const handleGenerateReport = async () => {
    try {
    if(!ValidateForm()) {
      return;
    }

    const body : MobileNumerologyDTO = {
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
      mobileNo: mobileNumber,
      countryCode: "91",
      dateOFBirth: dob,
      gender: gender,
      emailId: email,
      areaOfStruggle: selectedAreaOfStruggle
  }

    console.log("Mobile numerology:", body);
    
    const response = await generateMobileNumerologyReport(token || "",body);
    console.log("Mobile numerology response:", response);

    // navigation.navigate("MobileNumerologyResults");

    // console.log("Form submitted successfully");
    // Add your form submission logic here
  } catch (error) {
    console.error("Generate mobile numerology report failed:", error);
    Alert.alert("Generate mobile numerology report failed!");
  }
};

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView style={{ flex: 1, height: "100%", }}>
          <CustomInput
            label="First Name"
            required
            value={firstName}
            onChangeText={setFirstName}
            error={errors.firstName}
          />

          <CustomInput
            label="Middle Name"
            value={middleName}
            onChangeText={setMiddleName}
            error={errors.middleName}
          />

          <CustomInput
            label="Last Name"
            required
            value={lastName}
            onChangeText={setLastName}
            error={errors.lastName}
          />

          <DOBPicker
            label="Date of Birth"
            required
            value={dob}
            onChange={(date) => {
              setDob(date);
              if (errors.dob)
                setErrors((prev) => ({ ...prev, dob: undefined }));
            }}
            error={errors.dob}
          />

          <CustomInput
            label="Email"
            required
            value={email}
            onChangeText={setEmail}
            error={errors.email}
          />

          <CustomInput
            label="Mobile Number"
            required
            keyboardType="numeric"
            maxLength={10}
            error={errors.mobileNumber}
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />

          <GenderPicker
            label="Gender"
            value={gender}
            onChange={(val) => {
              console.log("Gender:", val);
              setGender(val);
              if (errors.gender)
                setErrors((prev) => ({ ...prev, gender: undefined }));
            }}
            options={genderOptions}
            required
            error={errors.gender}
          />

          <View>
            <Text style={styles.label}>Area Of Struggle</Text>
            <View style={styles.checkboxGroup}>
              {areaOfStruggleOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.checkboxItem}
                  onPress={() => toggleOption(option.id)}
                >
                  <CustomCheckbox
                    checked={selectedAreaOfStruggle.includes(option.id)}
                    onPress={() => toggleOption(option.id)}
                  />
                  <Text
                    style={[
                      styles.checkboxLabel,
                      selectedAreaOfStruggle.includes(option.id) &&
                        styles.checkedLabel,
                    ]}
                  >
                    {option.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton
              title="Generate Report"
              onPress={handleGenerateReport}
              style={styles.button}
            />

            <CustomButton
              title="Reset"
              onPress={onReset}
              style={[styles.button, { backgroundColor: "green" }]}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MobileNumerology;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    // marginBottom: 16,
    // justifyContent: "center",
    // alignItems: "center",
  },
  input: {
    marginVertical: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
    marginBottom: 46,
  },
  button: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#1f2937", // gray-800
  },
  checkboxGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 4,
    marginBottom: 4,
  },
  checkboxLabel: {
    fontSize: 15,
    color: "#6b7280", // gray-500
  },
  checkedLabel: {
    color: "#4f46e5", // indigo-600
    fontWeight: "600",
  },
});
