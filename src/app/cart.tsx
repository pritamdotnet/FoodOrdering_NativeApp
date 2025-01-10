import { View, Text, Platform, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar';

import { useCart } from '@/providers/CartProvider';
import CartListItem from '@/components/CartListItem';
import Button from '@/components/Button';

const CartScreen = () => {
  const { items , total, checkout } = useCart();
  // console.log('CartScreen items and total:', items , total);

  return (
    <View style={{ padding: 10 }}>
      <FlatList data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
      <Text style={{ marginTop: 20, fontSize: 20, fontWeight: '500'}}>Total: ${total}</Text>
      <Button onPress={checkout} text="Checkout" />

      {/* <Text>Cart Items length : {items.length}</Text> */}
      {/* <Text>Cart Items length : {Array.isArray(items) ? items.length : 0}</Text> */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default CartScreen;