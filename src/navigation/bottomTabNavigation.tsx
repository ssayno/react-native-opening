import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Profile} from '../screens/profile';
import {NavigationContainer} from '@react-navigation/native';
import { ProductNavigationStacker, ProfileNavigationStacker, WeatherNavigationStacker } from "./navigation";
import Icon from 'react-native-vector-icons/FontAwesome';

const OwnTab = createBottomTabNavigator();
export const BottomTabNavigator = () => {
  return (
    <NavigationContainer>
      <OwnTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          tabBarStyle: {
            height: '6%',
          },
        }}>
        <OwnTab.Screen
          name="Weather"
          component={WeatherNavigationStacker}
          options={{
            tabBarIcon: tabInfo => {
              return <Icon name="bolt" size={20} color={tabInfo.color} />;
            },
          }}
        />
        <OwnTab.Screen
          name="Product"
          component={ProductNavigationStacker}
          options={{
            tabBarIcon: tabInfo => {
              return (
                <Icon name="product-hunt" size={20} color={tabInfo.color} />
              );
            },
          }}
        />
        <OwnTab.Screen
          name="Profile"
          component={ProfileNavigationStacker}
          options={{
            tabBarIcon: tabInfo => {
              return <Icon name="male" size={20} color={tabInfo.color} />;
            },
          }}
        />
      </OwnTab.Navigator>
    </NavigationContainer>
  );
};
