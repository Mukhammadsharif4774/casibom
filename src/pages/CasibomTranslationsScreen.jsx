import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import CasibomHeader from '../components/CasibomHeader';

export default function () {
  const renderBroadcast = (league, time, teams) => (
    <View style={styles.broadcast}>
      <View style={styles.leagueContainer}>
        <Text style={styles.league}>{league}</Text>
      </View>
      <View style={styles.teamsContainer}>
        <Text style={styles.matchTime}>{time}</Text>
        <Text style={styles.teams}>{teams}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <CasibomHeader />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: 100}}>
        {renderBroadcast(
          'NBA',
          '25.12        00:15',
          'Golden State Warriors\n' + 'Houston Rockets',
        )}
        {renderBroadcast(
          'NFL',
          '26.12 00:15',
          'Green Bay Packers\n' + 'Chicago Bears',
        )}
        {renderBroadcast(
          'MLB',
          '28.12 00:35',
          'Los Angeles Dodgers\n' + 'San Francisco Giants',
        )}
        {renderBroadcast(
          'NHL',
          '29.12 03:00',
          'Chicago Blackhawks\n' + 'Detroit Red Wings',
        )}
        {renderBroadcast(
          'EPL',
          '30.12 01:00',
          'Manchester City\n' + 'Tottenham Hotspur',
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    width,
    backgroundColor: COLORS.white,
  },
  league: {
    fontSize: 35,
    fontFamily: FONTS.black,
    color: COLORS.main,
    width: 150,
    textAlign: 'center',
    verticalAlign: 'middle',
    borderWidth: 3,
    borderColor: COLORS.main,
    borderRadius: 25,
    paddingVertical: 8,
  },
  broadcast: {
    width: width * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  leagueContainer: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    height: 130,
  },
  teamsContainer: {
    width: '60%',
  },
  matchTime: {
    fontSize: 14,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    textAlign: 'left',
    width: '60%',
    paddingVertical: 5,
    marginLeft: 5,
  },
  teams: {
    textAlign: 'left',
    fontFamily: FONTS.regular,
    fontSize: 20,
    color: COLORS.black,
    marginTop: 5,
    marginLeft: 5,
  },
});
