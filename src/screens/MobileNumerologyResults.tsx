import React, { useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomLoshuGrid from "../components/CustomLoshuGrid";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MobileNumerologyResultsDTO } from "../service/types";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/types";

type MobileNumerologyResultsRouteProp = RouteProp<RootStackParamList, 'MobileNumerologyResults'>;

interface MobileNumerologyResultsProps {
  route: MobileNumerologyResultsRouteProp;
}

const MobileNumerologyResults : React.FC<MobileNumerologyResultsProps> = ({route}) => {
  const data : MobileNumerologyResultsDTO = route.params.data;
  const [dob, setDob] = useState(data.mobileNumberDetails.dob);
  const [openSection, setOpenSection] = useState<Number | null>();
  const loshuGridData: string[][] = [
    ["", "99", "22"],
    ["", "5", ""],
    ["", "11", "6"],
  ];

  const vadicGridData: string[][] = [
    ["", "11", "99"],
    ["", "", "5"],
    ["2", "", "6"],
  ];

  const listData = [
    {
      id: 1,
      name: "Mobile Number Prediction details",
      key: "mobile",
    },
    {
      id: 2,
      name: "Grid Details",
      key: "grid",
    },
    {
      id: 3,
      name: "Dasha Chart",
      key: "dasha",
    },
  ];

  // const mobileNumberDetails = {
  //   mobileNumber: "9760306834",
  //   mobileNumberCompound: "46",
  //   mobileNumberTotal:
  //     "1, You are a lucky person here are the mmultiple and more details",
  //   recommendedMobileNumber:
  //     "Your Recomended MobileNumber should be 1, 2, 3. Your mobile number total should come to 1,3,5 (add all the numbers and reduce it to one digit), example given below. Just make sure that numbers like 7, 8, 4 should not be present in mobile number if possible. Example – 9113157851 - Total comes = 41, further total comes 5",
  //   luckyColours: ["Red", "Orange", "White", "Yellow", "Green"],
  //   unLuckeyColor: "Black",
  //   luckeyNumber: [1, 2, 3, 5],
  //   unLuckeyNumber: [8],
  //   neutralNumber: [4, 6, 7, 9],
  //   missingNumber: [7, 8, 4],
  //   mobileCombination: [
  //     {
  //       combination: "97",
  //       type: "Neutral",
  //     },
  //     {
  //       combination: "76",
  //       type: "Mellific",
  //     },
  //     {
  //       combination: "83",
  //       type: "Benific",
  //     },
  //     {
  //       combination: "83",
  //       type: "Benific",
  //     },
  //   ],
  //   recomendation: "It is not recomended to use",
  //   prediction: [
  //     "You are a lucky person",
  //     "YOu can use it.",
  //     "Nice to meet you",
  //   ],
  //   recommendedWallpaper:
  //     "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  // };

  const mobileNumberDetails = data.mobileNumberDetails;
  const dashaData = data.dashaData;

  const numberInsights = [
    {
      title: "Number 2",
      description:
        "You are very sentimental in nature. You need some extra push to finish the task. You are Creative and soft spoken person. Your Aura is attractive and you love Arts, Music, Photography and Beauty. You continuously need motivation.",
    },
    {
      title: "Number 5",
      description:
        "You love mathematics and gives importance to money. Sometimes for money you keep relationship and sometimes due to money your relationship faces issues. You are very calculative and very straight while speaking. You can tell the truth on face of any one. You think more from your mind rather than heart. You are lacking in emotion and always looking for self-profit.",
    },
    {
      title: "Number 9 is appearing more than once.",
      description:
        "Since Number 9 appears more than one, you may have more anger and your activeness may also get reduced. You are very attractive and have high energy level. You are Bold, aggressive, argumentative and stubborn in nature. You always wants to contribute in society and real humanitarian in nature.",
    },
  ];

  // const dashaData = {
  //   rulingPlanet: "Sun",
  //   dashas: [
  //     {
  //       period: "19 - 09 - 2002 to 2003",
  //       sequence: 1,
  //       description:
  //         "It can bring money, wealth, name... The native will have the acquisition of wealth...",
  //     },
  //     {
  //       period: "19 - 09 - 2003 to 2005",
  //       sequence: 2,
  //       description:
  //         "There are great dealings with the mother  Here the person also feels like being more artistic...",
  //     },
  //   ],
  // };

  const MobileNumberDetails = () => {
    return (
      <>
        <View style={styles.detailsRow}>
          <Text style={styles.label}>Your Mobile Number : </Text>
          <Text style={styles.value}>{mobileNumberDetails.mobileNumber}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.label}>Your Mobile Number Compound : </Text>
          <Text style={styles.value}>
            {mobileNumberDetails.mobileNumberCompound}
          </Text>
        </View>
        <View style={styles.detailsCol}>
          <Text style={styles.label}>Your Mobile Number Total : </Text>
          <Text style={styles.value}>
            {mobileNumberDetails.mobileNumberTotal}
          </Text>
        </View>
        <View style={styles.detailsCol}>
          <Text style={styles.label}>Recomended Mobile Number :</Text>
          <Text style={styles.value}>
            {mobileNumberDetails.recommendedMobileNumber}
          </Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.label}>Lucky Colors :</Text>
          <Text style={styles.value}>
            {mobileNumberDetails.luckyColours.join(", ")}
          </Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.label}>Unlucky Colors :</Text>
          <Text style={styles.value}>{mobileNumberDetails.unLuckeyColor}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.label}>Lucky Numbers :</Text>
          <Text style={styles.value}>
            {mobileNumberDetails.luckeyNumber.join(", ")}
          </Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.label}>Unlucky Numbers :</Text>
          <Text style={styles.value}>
            {mobileNumberDetails.unLuckeyNumber.join(", ")}
          </Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.label}>Neutral Numbers :</Text>
          <Text style={styles.value}>
            {mobileNumberDetails.neutralNumber.join(", ")}
          </Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.label}>Missing Numbers :</Text>
          <Text style={styles.value}>
            {mobileNumberDetails.missingNumber.join(", ")}
          </Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.label}>Mobile Number Combination :</Text>
          <FlatList
            data={mobileNumberDetails.mobileCombination}
            renderItem={({ item }) => (
              <Text
                style={[
                  styles.value,
                  { flexDirection: "row", gap: 4, marginLeft: 4 },
                ]}
              >
                {item.combination} {item.type}
              </Text>
            )}
          />
        </View>
        <View
          style={[
            styles.detailsRow,
            { alignItems: "center", justifyContent: "center" },
          ]}
        >
          <Text
            style={[
              styles.label,
              { color: "red", textAlign: "center", alignSelf: "center" },
            ]}
          >
            {mobileNumberDetails.recomendation}
          </Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.label}>Prediction :</Text>
          <FlatList
            data={mobileNumberDetails.prediction}
            renderItem={({ item }) => (
              <Text style={styles.value}>
                {"\u2022"} {item}
              </Text>
            )}
          />
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.label}>Recomended Wallpaper :</Text>
          <Image
            source={require("../../assets/logo.jpg")}
            resizeMode="contain"
            style={{ width: 170, height: 170, marginLeft: 5 }}
          />
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.label}>Area of Struggle :</Text>
          <FlatList
            data={mobileNumberDetails.areaOfStruggle}
            renderItem={({ item }) => (
              <View style={styles.valueContainer}>
                <Text style={styles.value}>
                  {item.name}
                </Text>
                <Image
                  source={{ uri: item.image_url }}
                  resizeMode="contain"
                  style={{ width: 170, height: 170, marginLeft: 5 }}
                />
              </View>
            )}
          />
        </View>
      </>
    );
  };

  const GridDetails = () => {
    return (
      <View>
        <CustomLoshuGrid data={vadicGridData} label="Vadic Grid" />
        <FlatList
          data={numberInsights}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.bullet}>{"\u2022"}</Text>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  };

  const DashaChart = () => {
    return (
      <View>
        <Text style={styles.rulingPlanet}>
          Ruling Planet Is: <Text style={styles.bold}>Sun</Text>
        </Text>

        {dashaData.dashas.map((dasha, index) => (
          <View key={index} style={styles.dashaCard}>
            <Text style={styles.dashaTitle}>
              Dasha is: {dasha.period} ➝ {dasha.sequence}
            </Text>
            <Text style={styles.point}>{dasha.description}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.dobRow}>
          <Text style={styles.dobLabel}>Date of Birth :</Text>
          <Text style={styles.dobValue}>{dob}</Text>
        </View>
        <CustomLoshuGrid data={loshuGridData} label="Loshu Grid" />
        <CustomLoshuGrid data={vadicGridData} label="Vadic Grid" />

        {listData.map((item) => {
          return (
            <View key={item.id} style={styles.listItemContainer}>
              <TouchableOpacity
                style={styles.listItem}
                onPress={() =>
                  setOpenSection(openSection === item.id ? null : item.id)
                }
              >
                <Text style={styles.listItemText}>{item.name}</Text>
                <Ionicons
                  name={openSection === item.id ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
              {openSection === item.id && (
                <View
                  style={{
                    paddingHorizontal: 8,
                    borderWidth: 1,
                    borderColor: "#ccc",
                  }}
                >
                  {item.id == 1 && <MobileNumberDetails />}
                  {item.id == 2 && <GridDetails />}
                  {item.id == 3 && <DashaChart />}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MobileNumerologyResults;

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
    fontSize: 16,
  },
  dobValue: {
    color: "#1e293b",
    fontSize: 16,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listItemContainer: {
    gap: 4,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  listItemText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
  },
  detailsCol: {
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
  },
  label: {
    fontWeight: "500",
    color: "#1e293b",
    fontSize: 14,
  },
  value: {
    color: "#1e293b",
    fontSize: 14,
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 14,
  },
  bullet: {
    fontSize: 18,
    marginRight: 6,
    lineHeight: 20,
    color: "#444",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#222",
  },
  description: {
    marginTop: 2,
    fontSize: 14,
    color: "#555",
  },
  rulingPlanet: {
    fontSize: 16,
    marginBottom: 12,
  },
  bold: {
    fontWeight: "bold",
  },
  dashaCard: {
    borderRadius: 6,
    marginBottom: 16,
  },
  dashaTitle: {
    fontWeight: "600",
    marginBottom: 8,
  },
  point: {
    marginBottom: 6,
    lineHeight: 20,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
