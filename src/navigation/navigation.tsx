import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Weather} from '../screens/weather';
import {WeatherTemp} from '../screens/weatherTemp';
import {Movie} from '../screens/movie';
import {ProductList} from '../screens/productList';
import {ProductDetail} from '../screens/productDetail';

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
        component={Movie}
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
