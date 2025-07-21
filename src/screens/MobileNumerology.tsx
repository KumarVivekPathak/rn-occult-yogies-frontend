import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import CustomInput from "../components/CustomInput";
import DOBPicker from "../components/DOBPicker";
import GenderPicker from "../components/GenderPicker";
import { z, ZodError } from "zod";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigation } from "../../navigation/types";

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
});

type MobileNumerologyErrors = {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  mobileNumber?: string;
  email?: string;
  dob?: string;
  gender?: string;
};

const MobileNumerology = () => {
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
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const ValidateForm = () => {
    const result = mobileNumerologySchema.safeParse({
      firstName,
      middleName,
      lastName,
      mobileNumber,
      email,
      dob,
      gender,
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

  const onReset = () =>{
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setDob("");
    setEmail("");
    setGender("");
    setMobileNumber("");
    setErrors({});
  }

  const handleGenerateReport = () => {
    // if(!ValidateForm()) {
    //   return;
    // }

    navigation.navigate("MobileNumerologyReport");


    console.log("Form submitted successfully");
    // Add your form submission logic here
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView>
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
              setGender(val);
              if (errors.gender)
                setErrors((prev) => ({ ...prev, gender: undefined }));
            }}
            options={genderOptions}
            required
            error={errors.gender}
          />

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
  },
  button: {
    flex: 1,
  },
});
