import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import Pulse from 'react-native-pulse';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => {
  const [customConversation, setCustomConversation] = useState('');

  const handleLeftArrow = () => {
    navigation.navigate('Options');
  }
  const handleStartSession_one = () => {
    // Navigate to AudioRecorder when the "Start Session" button is pressed
    navigation.navigate('AudioRecorder', {category: 'Random'});
  };

  const handleStartSession_two = () => {
    // Navigate to AudioRecorder when the "Start Session" button is pressed
    navigation.navigate('PromptInputPage');
  };

  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#03111C', '#061E32', '#092337', '#092337', '#061E32', '#03111C']}
      style={styles.container}
      start={[0, 0.5]}
      end={[1, 0.5]}
    >
      <View style={{top: -320, marginLeft: 0, marginRight: 0, flexDirection: 'row'}}> 
      <TouchableOpacity style={styles.leftArrowContainer} onPress={handleLeftArrow}>
          <MaterialCommunityIcons name="arrow-left" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.RightArrowContainer}>
        <FontAwesome5 name="user-alt" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        {/* Add the new TouchableOpacity here */}
        <Text style={styles.descriptionText}>
          Press here to start general practice
        </Text>
        <TouchableOpacity style={styles.startButton1} onPress={handleStartSession_one}>
        <Pulse
            color="rgba(250, 255, 217, 0.3)"
            numPulses={1}
            diameter={200}
            speed={0.000001}
            duration={200000}
          />
        <LinearGradient
            colors={['#000000', '#FFD4A3']}
            style={styles.gradientButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
          <FontAwesome5 name="microphone-alt" size={50} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.gifContainer}>
        <Image
          source={require('/Users/yugamsurana/Desktop/omg/language/src/components/images/homeArrow.gif')} // Replace with the actual path to your image
          style={styles.imageStyle} // Define the style for your image
        />
      </View> */}
      <View style={styles.slantingLine} />
      <View style={styles.section}>
        <Text style={styles.descriptionText}>
          Or customize the conversation according to you
        </Text>
        <TouchableOpacity style={styles.startButton2} onPress={handleStartSession_two}>
          <Pulse
            color="rgba(250, 255, 217, 0.3)"
            numPulses={1}
            diameter={200}
            speed={0.000001}
            duration={200000}
          />
          <LinearGradient
            colors={['#000000', '#FFD4A3']}
            style={styles.gradientButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
          <View style={{flexDirection: "row"}}>
          <FontAwesome5 name="edit" size={40} color="white" />
          <FontAwesome5 name="microphone-alt" size={38} color="white" />
          </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomButtonContainer}>
      <TouchableOpacity
        style={styles.bottomLeftButton}
        // onPress={handleBottomLeftButton}
      >
        <MaterialCommunityIcons name="book-open-page-variant" size={50} color="white" />
        {/* Adjust the icon and style based on your preference */}
      </TouchableOpacity>
      <Text style={{color: 'white', left: -20}}>
        Go to University
      </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
    zIndex: 1, // Ensure that the section appears above the slanting line
    marginBottom: 0,
    marginLeft: -10
  },
  startButton1: {
    position: 'relative',
    // backgroundColor: '#A5870F',
    borderRadius: 100,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 600,
    marginLeft: 20,
    height: 150,
    width: 150,
  },
  startButton2: {
    position: 'relative',
    backgroundColor: 'rgba(255, 125, 155, 0.3)',
    borderRadius: 100,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
    height: 130,
    width: 130,
    marginRight: -100
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  descriptionText: {
    fontSize: 18,
    marginTop: 300,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'monospace',
    color: 'white',
    marginRight:-60
  },
  slantingLine: {
    backgroundColor: 'grey',
    height: 1010,
    position: 'absolute',
    top: 0,
    bottom: 100,
    left: -5, // Center the slanting line
    width: 3, // Adjust the width of the line
    transform: [{ rotate: '45deg' }], // Rotate the line to create a slanting effect
    zIndex: 1, // Ensure that the slanting line appears behind the sections
  },
  gifContainer: {
    marginTop: 200,
    marginLeft: -150,
    marginRight: 10
  },
  leftArrowContainer: {
    zIndex: 2
  },
  RightArrowContainer: {
    left: 290
  },
  bottomButtonContainer: {
    right: 220,
    top: 250,
    zIndex: 2
  },
  gradientButton: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: 130,
    width: 130,
  },
  imageStyle: {
    height: 150,
    width: 150
  }
});

export default HomeScreen;
