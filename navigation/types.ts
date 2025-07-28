import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MobileNumerologyResultsDTO } from '../src/service/types';

export type RootStackParamList = {
  Tabs: undefined;
  Instructions: undefined;
  SignIn: undefined;
  NameNumerologyReport: { id: string | number };
  MobileNumerologyResults: { data : MobileNumerologyResultsDTO };
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
