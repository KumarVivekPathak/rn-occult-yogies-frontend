import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
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
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackNavigation, RootStackParamList } from "../../navigation/types";
import CustomCheckbox from "../components/CustomCheckBox";
import { generateMobileNumerologyReport, getAdvanceMobileNumerologyFieldsData, updateAdvanceMobileNumerologyReport } from "../service/APIFunctions";
import { DashaDataDTO, DashaDTO, MobileNumberDetailsDTO, MobileNumerologyDTO, MobileNumerologyResultsDTO, WallpaperDTO, MobileNumerologyErrorsDTO } from "../service/types";
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


type MobileNumerologyRouteProp = RouteProp<RootStackParamList, 'MobileNumerology'>;

interface MobileNumerologyProps {
  route: MobileNumerologyRouteProp;
}


const MobileNumerology : React.FC<MobileNumerologyProps> = ({route}) => {
  const {token} = useAuth();
  const navigation = useNavigation<RootStackNavigation>();
  const reportId = route?.params?.reportId;
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [errors, setErrors] = useState<MobileNumerologyErrorsDTO>({});

  console.log("Report ID:", reportId);

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

  useEffect(() => {
    if(reportId){
      fetchMobileNumerologyFieldsData();
    }
  }, [reportId]);



  const fetchMobileNumerologyFieldsData = async () => {
    setLoading(true);
    try{
      const response = await getAdvanceMobileNumerologyFieldsData(token || '', reportId || 0);
      const responseData = response.data.record;
      setFirstName(responseData.first_name);
      setMiddleName(responseData.middle_name);
      setLastName(responseData.last_name);
      setDob(responseData.date_of_birth);
      setEmail(responseData.email);
      setGender(responseData.gender);
      setMobileNumber(responseData.mobile_no);
      console.log("Mobile numerology fields data:", responseData);
    }catch(error){
      console.error("Get mobile numerology report failed:", error);
    }finally{
      setLoading(false);
    }
  };

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
      const fieldErrors: MobileNumerologyErrorsDTO = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof MobileNumerologyErrorsDTO;
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
    const responseData = response.data;
    const personalInfo = responseData.personal_info;
    const mobileAnalysis = responseData.mobile_analysis;
    const missingElements = responseData.missing_elements;
    const charts = responseData.charts;
    const wallpapers = responseData.wallpapers;
    const dashaChart = parseDashaData(charts.dasha_chart);

    const mobileNumberDetails : MobileNumberDetailsDTO = {
      dob : personalInfo.date_of_birth,
      mobileNumber: mobileAnalysis.mobile_number,
      mobileNumberCompound: mobileAnalysis.compound_number,
      mobileNumberTotal: mobileAnalysis.total_number,
      recommendedMobileNumber: mobileAnalysis.message,
      luckyColours: mobileAnalysis.lucky_color.split(","),
      unLuckeyColor: mobileAnalysis.unlucky_color.split(","),
      luckeyNumber: mobileAnalysis.lucky_numbers,
      unLuckeyNumber: mobileAnalysis.unlucky_numbers,
      neutralNumber: mobileAnalysis.neutral_numbers,
      missingNumber: missingElements.missing_numbers,
      mobileCombination: mobileAnalysis.combinations.combinations,
      recomendation: "It is not recomended to use",
      prediction: [
        "You are a lucky person",
        "YOu can use it.",
        "Nice to meet you",
      ],
      recommendedWallpaper: wallpapers.king_number_wallpaper,
      areaOfStruggle : wallpapers?.area_wallpapers?.map((wallpaper : WallpaperDTO) => {
        return {
          id : wallpaper.id,
          name : wallpaper.name,
          image_url : wallpaper.image_url
        }
      }),
    };

    const dashaData : DashaDataDTO = {
      rulingPlanet: dashaChart.rulingPlanet,
      dashas: dashaChart.dashas,
    };

    const mobileNumerologyResultsObject : MobileNumerologyResultsDTO = {
      mobileNumberDetails,
      dashaData,
    };

    navigation.navigate("MobileNumerologyResults", {data : mobileNumerologyResultsObject});

  } catch (error) {
    console.error("Generate mobile numerology report failed:", error);
    Alert.alert("Generate mobile numerology report failed!");
  }
};

const handleUpdateReport = async () => {
  try {
    if(!ValidateForm()) {
      return;
    }

    const body : MobileNumerologyDTO = {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      mobileNo: mobileNumber,
      countryCode: "91",
      dateOFBirth: dob,
      gender: gender,
      emailId: email,
      areaOfStruggle: selectedAreaOfStruggle
  }

    const response = await updateAdvanceMobileNumerologyReport(token || "", reportId || 0, body);
    const status = response.status;
    if (status === "success") {
      Alert.alert(
        "Success",
        "Update mobile numerology report successfully!",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack()
          }
        ]
      );
    }
    
  }catch(error){
    console.error("Update mobile numerology report failed:", error);
    Alert.alert("Update mobile numerology report failed!");
  }
}

const parseDashaData = (rawData: string): DashaDataDTO => {
  const periods: string[] = rawData.split('<hr/>');
  let rulingPlanet: string = '';
  const dashas: DashaDTO[] = [];
  
  periods.forEach((period: string) => {
    const lines: string[] = period.split('<br/>').filter(line => line.trim());
    
    let currentDasha: DashaDTO = {
      period: '',
      sequence: '',
      description: ''
    };
    
    const descriptions: string[] = [];
    
    lines.forEach((line: string) => {
      const cleanLine: string = line.trim();
      
      if (cleanLine.includes('Ruling Planet Is:')) {
        rulingPlanet = cleanLine.replace('Ruling Planet Is:', '').replace(/<\/?b>/g, '').trim();
      } else if (cleanLine.includes('Dasha is:')) {
        const dashaInfo: string = cleanLine.replace('Dasha is:', '').trim();
        const parts: string[] = dashaInfo.split('=>');
        if (parts.length === 2) {
          currentDasha.period = parts[0].trim().replace(/\s-\s/g, ' to ');
          currentDasha.sequence = parts[1].trim();
        }
      } else if (cleanLine.match(/^\d+\./)) {
        const point: string = cleanLine.replace(/^\d+\.\s*/, '');
        descriptions.push(point);
      }
    });
    
    if (currentDasha.period && descriptions.length > 0) {
      currentDasha.description = descriptions.join(' ');
      dashas.push(currentDasha);
    }
  });
  
  return { rulingPlanet, dashas };
};

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        {reportId && loading && <ActivityIndicator size="large" color="#000" />}
        {!loading && (
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
            {reportId ? <CustomButton
              title="Update Report"
              onPress={handleUpdateReport}
              style={styles.button}
            /> : <CustomButton
              title="Generate Report"
              onPress={handleGenerateReport}
              style={styles.button}
            />}

            <CustomButton
              title="Reset"
              onPress={onReset}
              style={[styles.button, { backgroundColor: "green" }]}
            />
          </View>
        </ScrollView>)}
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
