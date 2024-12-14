import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS} from '../helpers/colors';

export default function CasibomComponent({
  text,
  onPress,
  style = {},
  textStyle = {},
  buttonStyle = {},
}) {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]}>
        <Text style={[styles.text, textStyle]}>{text.toUpperCase()}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: '90%',
    backgroundColor: COLORS.main,
    alignSelf: 'center',
    borderRadius: 25,
    elevation: 5,
  },
  text: {
    color: COLORS.black,
    fontSize: 24,
    fontFamily: FONTS.bold,
    lineHeight: 28,
    letterSpacing: 1,
  },
});
