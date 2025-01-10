import { Text, FlatList, ActivityIndicator, View ,StyleSheet} from 'react-native';
// import orders from '@assets/data/orders';
import OrderListItem from '@/components/OrderListItem';
import { useMyOrderList } from '@/api/orders';

export default function OrdersScreen() {
   // console.log(orders); // Debugging
   const {data: orders, isLoading, error} = useMyOrderList();
    
     if (isLoading) {
       return <ActivityIndicator />;
     }
     if (error) {
       return <Text>Faild to fetch:</Text>
     }
     if (!orders || orders.length === 0) {
        return (
          <View style={styles.centered}>
            <Text style={styles.noDataText}>No orders available.</Text>
          </View>
        );
      }
    return (
        <FlatList 
            data={orders}
            renderItem={({ item }) => <OrderListItem order={item} /> }
            // keyExtractor={(item) => item.id.toString()}
        />
    );
}

const styles =  StyleSheet.create({ 
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      noDataText: {
        fontSize: 16,
        color: '#555',
      },
});