import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Redirect } from "expo-router";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#141414' }}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#141414"
        translucent={true}
      />
      <Redirect href="/login" />
    </SafeAreaView>
  );
}


