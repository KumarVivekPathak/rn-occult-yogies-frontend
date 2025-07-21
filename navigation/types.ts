import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Tabs: undefined;
  Instructions: undefined;
  SignIn: undefined;
  NameFixing: undefined;
  NameNumerologyReport: { id: string | number };
  MobileNumerologyReport: undefined;
};

export type TabParamList = {
  NameFixing: undefined;
  Profile: undefined;
  MobileNumerology: undefined;
};

export type RootStackNavigation = NativeStackNavigationProp<RootStackParamList>;
export type TabNavigation = NativeStackNavigationProp<TabParamList>;
