// App.js
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AudioRecorder from './src/components/AudiorRecorder.js'; // Import your AudioRecorder component
import ReportPage from './src/components/ReportPage.js'
import HomeScreen from './src/components/HomeScreen.js';
import AudioRecorderCustom from './src/components/AudioRecorderCustom.js';
import PromptInputPage from './src/components/PromptInputPage.js';
import OptionsPage from './src/components/OptionsPage.js'
import AudioRecorderHome from './src/components/AudioRecorderHome.js';
import SpeechPage from './src/components/SpeechPage.js';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="AudioRecorderHome" component={AudioRecorderHome} />
        <Stack.Screen name="Options" component={OptionsPage} />
        <Stack.Screen name="SpeechPage" component={SpeechPage} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AudioRecorderCustom" component={AudioRecorderCustom} />
        <Stack.Screen name="PromptInputPage" component={PromptInputPage} />
        <Stack.Screen name="AudioRecorder" component={AudioRecorder} />
        <Stack.Screen name="ReportPage" component={ReportPage} />
      </Stack.Navigator>
     </NavigationContainer>
     
  );
};

export default App;
