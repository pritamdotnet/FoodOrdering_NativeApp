import { View, Text, Image, StyleSheet ,Pressable} from 'react-native'
import React from 'react'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import products from '@assets/data/products';
import { defaultPizzaImage } from '@/components/ProductListItem';
import { useState } from 'react';
import Button from '@components/Button';
import { useCart } from '@/providers/CartProvider';
import { PizzaSize } from '@/types';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {
  const { items } = useCart();
 // console.log('ProductDetailsScreen context items:', items);
  const { id } = useLocalSearchParams();
  const { addItem } = useCart();
  const router = useRouter();


  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

  //console.log('Navigated to ProductDetailsScreen with ID:', id);
  const product = products.find((p) => p.id.toString() === id);
  
  const addToCart = () => {
    if(!product){
     // console.log('No product found.');
      return;
    }
   // console.warn('Add to cart',selectedSize);
    addItem(product, selectedSize);
    router.push('/cart');
   // console.warn('product: ', product);
  };
  
  if (!product) {
    return <Text>Product not found </Text>
  }
  return (
    <View>
<Stack.Screen
        options={{
          title: 'Menu',
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }} />



      <Stack.Screen options={{ title: product.name }} />
      <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image} />

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>

    </View>
  )
};

const styles = StyleSheet.create({
  constainer: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,

  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default ProductDetailsScreen