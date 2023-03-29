// import { StatusBar } from "expo-status-bar";
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from './src/components/CustomDrawer';
import WriteTagScreen from './src/screens/WriteTagScreen';
import ReadTagScreen from './src/screens/ReadTagScreen';
import EditTagScreen from './src/screens/EditTagScreen';
import UpdateTagScreen from './src/screens/UpdateDataScreen';
import ScanScreen from './src/screens/ScanScreen';
import SuccessScreen from './src/screens/SuccessScreen';
import ReadDataScreen from './src/screens/ReadDataScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerDashboard() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Dashboard Admin" component={DashboardScreen} />
      <Drawer.Screen name="Write Tag" component={WriteTagScreen} />
      <Drawer.Screen name="Read Tag" component={ReadTagScreen} />
      <Drawer.Screen name="Edit Tag" component={EditTagScreen} />
      <Drawer.Screen name="Absensi Siswa" component={ReadDataScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Scan"
          component={ScanScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Success"
          component={SuccessScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          name="Dashboard"
          component={DrawerDashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Update Data"
          component={UpdateTagScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
