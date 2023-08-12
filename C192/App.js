import React from 'react';
import { View, StyleSheet } from "react-native";
import Main from './Screen/Main';

export default function App() {
  return (
    <View style={styles.container}>
      <Main/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6003d',
    alignItems: 'center',
    justifyContent: 'center',
  },
});