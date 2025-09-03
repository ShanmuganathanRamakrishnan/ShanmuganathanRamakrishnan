import React from 'react';
import { SafeAreaView } from 'react-native';
import { Redirect } from "expo-router";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Redirect href="/login" />
    </SafeAreaView>
  );
}


