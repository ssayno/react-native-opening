import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Weather} from '../screens/weather';
import {WeatherTemp} from '../screens/weatherTemp';
import {Product} from '../screens/product';
import {ProductList} from '../screens/productPages/productList';
import {ProductDetail} from '../screens/productPages/productDetail';

const WeatherNavigationStack = createNativeStackNavigator();
const ProductsNavigationStack = createNativeStackNavigator();

export const WeatherNavigationStacker = () => {
  return (
    <WeatherNavigationStack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: 'red',
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
        name={'ProductDetail'}
        component={ProductDetail}
      />
    </ProductsNavigationStack.Navigator>
  );
};
