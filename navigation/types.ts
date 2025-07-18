import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Tabs: undefined;
  Instructions: undefined;
  SignIn: undefined;
  NameFixing: undefined;
  NameNumerologyReport: { id: string | number };
};

export type TabParamList = {
  NameFixing: undefined;
  Profile: undefined;
};

export type RootStackNavigation = NativeStackNavigationProp<RootStackParamList>;
export type TabNavigation = NativeStackNavigationProp<TabParamList>;
