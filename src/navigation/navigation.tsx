import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Weather} from '../screens/weather';
import {WeatherTemp} from '../screens/weatherTemp';
import {Product} from '../screens/product';
import {ProductList} from '../components/products/productPages/productList';
import {ProductDetail} from '../components/products/productPages/productDetail';
import {Profile} from '../screens/profile';
import LanguageIntro from '../components/profile/languageIntro/languageIntro';
import ContactDetail from '../components/profile/contactDetail/contactDetail';
import {Hobbies} from '../components/profile/hobbies';
import { SafeAreaView, Text, View } from "react-native";

export type ProductStackParamList = {
  ProductMain: undefined;
  ProductDetail: {itemId: number};
  ProductList: {itemId: number; page: number};
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  ProfileLanguageIntro: undefined;
  ProfileContactDetails: undefined;
  ProfileHobbies: undefined;
};

const WeatherNavigationStack = createNativeStackNavigator();
const ProductsNavigationStack =
  createNativeStackNavigator<ProductStackParamList>();
const ProfileNavigationStack =
  createNativeStackNavigator<ProfileStackParamList>();

export const WeatherNavigationStacker = () => {
  return (
    <WeatherNavigationStack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: 'deepskyblue',
        },
        headerTitleStyle:{
          fontWeight: 'bold',
        },
      }}>
      <WeatherNavigationStack.Screen
        name="WeatherMain"
        component={Weather}
        // options={{title: 'Weather'}}
      />
      <WeatherNavigationStack.Screen
        name="WeatherNext"
        component={WeatherTemp}
        // options={{title: 'Weather next'}}
      />
    </WeatherNavigationStack.Navigator>
  );
};

export const ProductNavigationStacker = () => {
  return (
    <ProductsNavigationStack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <ProductsNavigationStack.Screen
        name="ProductMain"
        component={Product}
        // options={{title: 'Weather'}}
      />
      <ProductsNavigationStack.Screen
        name="ProductList"
        component={ProductList}
        // initialParams={{itemId: 3, page: 0, route: null}}
        // options={{title: 'Weather next'}}
      />
      <ProductsNavigationStack.Screen
        name="ProductDetail"
        component={ProductDetail}
      />
    </ProductsNavigationStack.Navigator>
  );
};

export const ProfileNavigationStacker = () => {
  return (
    <ProfileNavigationStack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <ProfileNavigationStack.Screen name="ProfileMain" component={Profile} />
      <ProfileNavigationStack.Screen
        name="ProfileLanguageIntro"
        component={LanguageIntro}
      />
      <ProfileNavigationStack.Screen
        name="ProfileContactDetails"
        component={ContactDetail}
      />
      <ProfileNavigationStack.Screen
        name="ProfileHobbies"
        component={Hobbies}
      />
    </ProfileNavigationStack.Navigator>
  );
};
