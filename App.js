import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, StyleSheet, useWindowDimensions} from 'react-native';

function getClock() {
  const now = new Date();
  const day = now.toLocaleDateString('en-US', {weekday: 'long'}).toUpperCase();
  const month = now.toLocaleDateString('en-US', {month: 'long'}).toUpperCase();
  const date = now.getDate();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  return {day, dateText: `${month} ${date}`, hoursMinutes: `${h}:${m}:`, seconds: s};
}

export default function App() {
  const {width, height} = useWindowDimensions();
  const [clock, setClock] = useState(getClock());

  useEffect(() => {
    const timer = setInterval(() => setClock(getClock()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.widget, {width: Math.min(width - 24, 1040), height: Math.min(height - 24, 590)}]}>
        <Text style={styles.day}>{clock.day}</Text>
        <View style={styles.timeRow}>
          <Text style={styles.timeWhite}>{clock.hoursMinutes}</Text>
          <Text style={styles.timeOrange}>{clock.seconds}</Text>
        </View>
        <Text style={styles.date}>{clock.dateText}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: '#202020', justifyContent: 'center', alignItems: 'center'},
  widget: {backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center', overflow: 'hidden'},
  day: {color: '#FFFFFF', fontSize: 44, lineHeight: 44, fontWeight: '800', letterSpacing: 1, marginBottom: 0},
  timeRow: {flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center'},
  timeWhite: {color: '#FFFFFF', fontSize: 108, lineHeight: 108, fontWeight: '300', letterSpacing: -3},
  timeOrange: {color: '#FF3B00', fontSize: 108, lineHeight: 108, fontWeight: '300', letterSpacing: -3},
  date: {color: '#FFFFFF', fontSize: 32, lineHeight: 32, fontWeight: '700', letterSpacing: 1, marginTop: 4},
});
