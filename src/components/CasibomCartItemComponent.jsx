import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from './AppContext';
import {COLORS, FONTS, width} from '../helpers/colors';
import {casiboomAllProducts} from '../helpers/casiboomProducts';

const CasibomCartItemComponent = ({item}) => {
  const {shouldRefresh, toggleRefresh} = useContext(AppContext);
  const [carts, setCarts] = useState([]);

  const updateCart = async updatedCarts => {
    await AsyncStorage.setItem('cartList', JSON.stringify(updatedCarts));
    setCarts(updatedCarts);
    toggleRefresh(!shouldRefresh);
  };
  const increment = () => {
    const updatedCarts = carts.map(product =>
      product.name === item.name
        ? {...product, count: product.count + 1}
        : product,
    );
    updateCart(updatedCarts);
  };

  const decrement = () => {
    const updatedCarts = carts
      .map(product => {
        if (product.name === item.name) {
          const newCount = Math.max(product.count - 1, 0);
          return {...product, count: newCount};
        }
        return product;
      })
      .filter(product => product.count > 0); // Remove item if count is zero
    updateCart(updatedCarts);
  };

  const deleteItem = () => {
    const updatedCarts = carts.filter(product => product.name !== item.name);
    updateCart(updatedCarts);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartList = await AsyncStorage.getItem('cartList');
      setCarts(cartList ? JSON.parse(cartList) : []);
    };
    fetchCartItems();
  }, [shouldRefresh]);

  const productImage = casiboomAllProducts.find(
    p => p.name === item.name,
  )?.image;

  return (
    <View style={styles.container}>
      <Image source={productImage} style={styles.image} />

      <View style={styles.details}>
        <View style={styles.countContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() =>
              carts.find(product => product.name === item.name)?.count > 1
                ? decrement()
                : deleteItem()
            }>
            <Text style={styles.plusMinus}>-</Text>
          </TouchableOpacity>

          <Text style={styles.count}>
            {carts.find(product => product.name === item.name)?.count || 0}
          </Text>

          <TouchableOpacity style={styles.actionButton} onPress={increment}>
            <Text style={styles.plusMinus}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.row}>
          <Text style={styles.currencyText}>{`${item.price} $`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: COLORS.white,
    width: width * 0.95,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: '40%',
    height: 140,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  details: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    width: '90%',
  },
  description: {
    fontSize: 12,
    fontFamily: FONTS.light,
    color: COLORS.black,
    width: '90%',
    marginTop: 2,
  },
  currencyText: {
    fontSize: 16,
    fontFamily: FONTS.black,
    textAlign: 'center',
    verticalAlign: 'middle',
    marginRight: 15,
    color: COLORS.black,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 5,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.25,
    borderRadius: 15,
    borderColor: COLORS.black,
    borderWidth: 1,
  },
  count: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    marginHorizontal: 10,
    color: COLORS.black,
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
  },
  plusMinus: {
    textAlign: 'center',
    verticalAlign: 'middle',
    color: COLORS.black,
    fontSize: 18,
    fontFamily: FONTS.black,
  },
  deleteButton: {
    marginLeft: 10,
    position: 'absolute',
    right: 10,
    bottom: 5,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default CasibomCartItemComponent;
