import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Tabs: undefined;
  Instructions: undefined;
  SignIn: undefined;
  NameNumerologyReport: { id: string | number };
  MobileNumerologyResults: undefined;
  MobileNumerologyReport: undefined;
  NameNumerology: undefined;
  MobileNumerology: undefined;
};

export type TabParamList = {
  Profile: undefined;
  Reports: undefined;
  Dashboard: undefined;
  
};

export type RootStackNavigation = NativeStackNavigationProp<RootStackParamList>;
export type TabNavigation = NativeStackNavigationProp<TabParamList>;
