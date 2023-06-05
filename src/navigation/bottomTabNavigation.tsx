import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Profile} from '../screens/profile';
import {NavigationContainer} from '@react-navigation/native';
import {ProductNavigationStacker, WeatherNavigationStacker} from './navigation';


const OwnTab = createBottomTabNavigator();
export const BottomTabNavigator = () => {
  return (
    <NavigationContainer>
      <OwnTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        }}>
        <OwnTab.Screen name="Weather" component={WeatherNavigationStacker} />
        <OwnTab.Screen name="Movie" component={ProductNavigationStacker} />
        <OwnTab.Screen name="Profile" component={Profile} />
      </OwnTab.Navigator>
    </NavigationContainer>
  );
};
