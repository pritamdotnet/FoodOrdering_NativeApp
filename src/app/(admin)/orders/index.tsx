import { Text, FlatList } from 'react-native';
import orders from '@assets/data/orders';
import OrderListItem from '@/components/OrderListItem';

export default function OrdersScreen() {
   // console.log(orders); // Debugging
    
    return (
        <FlatList 
            data={orders}
            renderItem={({ item }) => <OrderListItem order={item} /> }
            // keyExtractor={(item) => item.id.toString()}
        />
    );
}