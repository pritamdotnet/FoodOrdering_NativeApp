import { View, Text, Image, StyleSheet ,Pressable, ActivityIndicator} from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
// import products from '@assets/data/products';
import { defaultPizzaImage } from '@/components/ProductListItem';
import { useState } from 'react';
import Button from '@components/Button';
import { useCart } from '@/providers/CartProvider';
import { PizzaSize } from '@/types';
import { isLoading } from 'expo-font';
import { useProduct } from '@/api/products';
import RemoteImage from '@/components/RemoteImage';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {
  const { items } = useCart();
 // console.log('ProductDetailsScreen context items:', items);
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

  const  {data: product, error, isLoading} = useProduct(id);

  const { addItem } = useCart();
  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');
  
  const addToCart = () => {
    if(!product){
      return;
    }
    addItem(product, selectedSize);
    router.push('/cart');
  };
  
  if (!product) {
    return <Text>Product not found </Text>
  }

    if (isLoading) {
      return <ActivityIndicator />;
    }
  
    if (error) {
      return <Text>Faild to fetch products:</Text>
    }
    
  return (
    <View>
      <Stack.Screen options={{ title: product.name }} />
      <RemoteImage
        path={product?.image}
        fallback={defaultPizzaImage}
      //  source={{ uri: product.image || defaultPizzaImage }} 
       style={styles.image} 
       />

      <Text>Select size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable 
            onPress={() => {
              setSelectedSize(size);
            }}
            style={[styles.size,
          {
            backgroundColor: selectedSize === size ? 'gainsboro' : 'white',
          }
          ]}
            key={size}>

            <Text style={[styles.sizeText,
              { 
                color: selectedSize === size ? 'black' : 'gray',
               },
            ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>${product.price}</Text>
   <Button onPress={addToCart} text="Add to cart" />
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
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 'auto',
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  size: {
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',

  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500',
  },
})

export default ProductDetailsScreen