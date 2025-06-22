import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ThemeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Theme Settings (Coming Soon)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18 },
});