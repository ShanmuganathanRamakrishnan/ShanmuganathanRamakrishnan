import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MainTabNavigator = () => {
  return (
    <View style={styles.container}>
      <Text>Main App Content</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainTabNavigator;