import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import CasibomHeader from '../components/CasibomHeader';
import {useNavigation} from '@react-navigation/native';
import Event_1 from '../assets/event_1.png';
import Event_2 from '../assets/event_2.png';
import Event_3 from '../assets/event_3.png';
import Event_4 from '../assets/event_4.png';
import Event_5 from '../assets/event_5.png';

const events = [
  {title: 'Семейный Бранч', image: Event_1, time: '25.12.2024'},
  {
    title: 'Коктейльная Вечеринка',
    image: Event_3,
    time: '26.12.2024',
  },
  {title: 'Футбольный Фест', image: Event_4, time: '27.12.2024'},
  {title: 'Гриль и Барбекю', image: Event_2, time: '30.12.2024'},
  {title: 'Чемпионский Ужин', image: Event_5, time: '29.12.2024'},
];

const EventButton = ({title, image, onPress, index, time}) => (
  <>
    <Text style={styles.time}>{time}</Text>
    <TouchableOpacity style={styles.button} onPress={() => onPress(image)}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  </>
);

export default function () {
  const navigation = useNavigation();

  const handlePress = image => {
    navigation.navigate('DrawerNavigator', {
      screen: 'CasibomEventDetailScreen',
      params: {image},
    });
  };

  return (
    <View style={styles.container}>
      <CasibomHeader />

      <View style={styles.content}>
        {events.map((event, index) => (
          <EventButton
            key={index}
            index={index}
            title={event.title}
            image={event.image}
            onPress={handlePress}
            time={event.time}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
    backgroundColor: COLORS.black,
  },
  button: {
    justifyContent: 'center',
    width: '90%',
    marginTop: 2,
    backgroundColor: COLORS.black,
    borderWidth: 4,
    borderColor: COLORS.main,
    borderRadius: 25,
    height: 70,
  },
  title: {
    fontSize: 23,
    fontFamily: FONTS.black,
    color: COLORS.white,
    textAlign: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    width: width,
    marginTop: '10%',
  },
  time: {
    marginTop: 15,
    marginBottom: 3,
    color: COLORS.white,
    fontSize: 18,
    fontFamily: FONTS.black,
    width: '100%',
    textAlign: 'right',
    paddingRight: '15%',
  },
});
