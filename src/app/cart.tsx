  import { View, Text, Platform , FlatList } from 'react-native'
  import { StatusBar } from 'expo-status-bar';

  import { useCart } from '@/providers/CartProvider';
import CartListItem from '@/components/CartListItem';

  const CartScreen = () => {
    const { items } = useCart();
    console.log('CartScreen items:', items);
    return (
      <View>
        <FlatList data={items} 
        renderItem={({item}) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ padding: 10, gap: 10 }}
        />
        {/* <Text>Cart Items length : {items.length}</Text> */}
        {/* <Text>Cart Items length : {Array.isArray(items) ? items.length : 0}</Text> */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </View>
    );
  };

  export default CartScreen;