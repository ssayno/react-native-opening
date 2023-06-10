# React native usage
**Just for learning**
** learn how to define in navigation in stack navigation
```react
const ProductsNavigationStack =
  createNativeStackNavigator<ProductStackParamList>();
export type ProductStackParamList = {
  ProductMain: undefined;
  ProductDetail: {itemId: number};
  ProductList: {itemId: number; page: number};
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
// get route and navigation from parent StackNavigation, each StackNavigation has `route` and `navigation`
type ProductDetailScreenProps = {
  navigation: StackNavigationProp<ProductStackParamList, 'ProductDetail'>;
  route: RouteProp<ProductStackParamList, 'ProductDetail'>;
};
export const ProductDetail = ({route}: ProductDetailScreenProps) => {...}
```
