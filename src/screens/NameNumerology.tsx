import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigation } from "../../navigation/types";
import { TabParamList } from "../../navigation/types";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "../components/CustomInput";
import { email, z, ZodError } from "zod";
import CustomButton from "../components/CustomButton";
import DOBPicker from "../components/DOBPicker";
import GenderPicker from "../components/GenderPicker";
import { useAuth } from "../context/AuthContext";
import { generateNameNumerologyReport } from "../service/APIFunctions";

const nameNumerologySchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  mobileNumber: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(10, "Mobile number must be at most 10 digits"),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  spouseName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
});

type NameNumerologyErrors = {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  mobileNumber?: string;
  fatherName?: string;
  motherName?: string;
  spouseName?: string;
  email?: string;
  dob?: string;
  gender?: string;
};

const NameNumerology = () => {
  const {token} = useAuth();
  const navigation = useNavigation<RootStackNavigation>();
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [spouseName, setSpouseName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState<NameNumerologyErrors>({});
  const [loading, setLoading] = useState(false);
  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const validateNameNumerology = () => {
    try {
      nameNumerologySchema.parse({
        firstName,
        middleName,
        lastName,
        mobileNumber,
        fatherName,
        motherName,
        spouseName,
        email,
        dob,
        gender
      });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const zodError = error as ZodError;
        const fieldErrors: NameNumerologyErrors = {};
        (
          zodError.issues as Array<{
            path: (keyof NameNumerologyErrors)[];
            message: string;
          }>
        ).forEach((err) => {
          const field = err.path[0];
          if (field) {
            fieldErrors[field] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleNameNumerology = async () => {
    if (!validateNameNumerology()) return;
    setLoading(true);
    try {
    const body = {
        fullname: firstName + " " + middleName + " " + lastName,
        gender: gender,
        dob: dob,
        fathers_name: fatherName,
        mothers_name: motherName,
        spouse_name: spouseName,
        mobile: "+91"+mobileNumber,
        email: email
    }
    console.log("Name numerology:", body);
    const responseData = await generateNameNumerologyReport(token || '', body);
    const id = responseData.id;
    console.log("Name numerology response:", responseData);
    navigation.navigate('NameNumerologyReport', { id : id });
    setErrors({});
    } catch (error) {
      console.error("Name numerology failed:", error);
      Alert.alert("Name numerology failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']} >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, padding: 16, paddingBottom: 50 }}
          keyboardShouldPersistTaps="handled"
        >
          <CustomInput
            label="First Name"
            required
            value={firstName}
            onChangeText={setFirstName}
            containerStyle={styles.input}
            error={errors.firstName}
          />

          <CustomInput
            label="Middle Name"
            value={middleName}
            onChangeText={setMiddleName}
            containerStyle={styles.input}
            error={errors.middleName}
          />

          <CustomInput
            label="Last Name"
            required
            value={lastName}
            onChangeText={setLastName}
            containerStyle={styles.input}
            error={errors.lastName}
          />

          <GenderPicker
            label="Gender"
            value={gender}
            onChange={(val) => {
              setGender(val);
              if (errors.gender) setErrors(prev => ({ ...prev, gender: undefined }));
            }}
            options={genderOptions}
            required
            error={errors.gender}
          />

          <DOBPicker
            label="Date of Birth"
            value={dob}
            onChange={(date) => {
              setDob(date);
              if (errors.dob) setErrors(prev => ({ ...prev, dob: undefined }));
            }}
            containerStyle={styles.input}
            error={errors.dob}
            required
          />

          <CustomInput
            label="Mobile Number"
            value={mobileNumber}
            required
            keyboardType="numeric"
            maxLength={10}
            onChangeText={setMobileNumber}
            containerStyle={styles.input}
            error={errors.mobileNumber}
          />

          <CustomInput
            label="Father Name"
            value={fatherName}
            onChangeText={setFatherName}
            containerStyle={styles.input}
            error={errors.fatherName}
          />

          <CustomInput
            label="Mother Name"
            value={motherName}
            onChangeText={setMotherName}
            containerStyle={styles.input}
            error={errors.motherName}
          />

          <CustomInput
            label="Spouse Name"
            value={spouseName}
            onChangeText={setSpouseName}
            containerStyle={styles.input}
            error={errors.spouseName}
          />

          <CustomInput
            label="Email"
            value={email}
            required
            onChangeText={setEmail}
            containerStyle={styles.input}
            error={errors.email}
          />

          <CustomButton
            title="Generate Report"
            onPress={handleNameNumerology}
            containerStyle={styles.button}
            textStyle={styles.buttonText}
            style={{ backgroundColor: "magenta", marginTop : 8 }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    marginVertical: 8,
  },
});

export default NameNumerology;
