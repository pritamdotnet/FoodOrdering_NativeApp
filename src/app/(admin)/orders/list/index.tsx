import { Text, FlatList, ActivityIndicator } from 'react-native';
//  import orders from '@assets/data/orders';
import OrderListItem from '@/components/OrderListItem';
import { useAdminOrderList } from '@/api/orders';
import { useInsertOrderSubscription } from '@/api/orders/subscriptions';

export default function OrdersScreen() {
   // console.log(orders); // Debugging
   const {data: orders, isLoading, error} = useAdminOrderList({archived: false});
    
   useInsertOrderSubscription();

     if (isLoading) {
       return <ActivityIndicator />;
     }
   
     if (error) {
       return <Text>Faild to fetch:</Text>
     }
     
    return (
        <FlatList 
            data={orders}
            renderItem={({ item }) => <OrderListItem order={item} /> }
            // keyExtractor={(item) => item.id.toString()}
        />
    );
}