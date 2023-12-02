import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Pulse from 'react-native-pulse';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const SpeechPage = () => {
  const [isPulsing, setPulsing] = useState(false);
  const [timer, setTimer] = useState(0);
 
  const navigation = useNavigation();

  const handleEnd = () => {
    navigation.navigate('ReportPage')
  }

  const handlePress = () => {
    setPulsing(true);

    const pulseLoop = () => {
      setTimeout(() => {
        if (isPulsing) {
          pulseLoop();
        }
      }, 2000); // Adjust the duration as needed

      // Perform other actions if needed when the button is pressed
    };

    pulseLoop();
    startTimer();
  };

  const startTimer = () => {
    setTimer(0);
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => clearInterval(interval);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePressOut = () => {
    navigation.navigate('ReportPage')
  };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={require('/Users/yugamsurana/Desktop/omg/language/src/components/images/audience.jpg')}
        style={styles.backgroundImage}
      />

      {/* Dark Overlay */}
      <View style={styles.overlay} />
      {/* Timer */}
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime(timer)}</Text>
      </View>
      {/* Pulse Effect */}
      <View style={{ marginTop: 500, marginLeft: 47, flexDirection: 'row', marginRight: 30 }}>
        <TouchableOpacity style={styles.circularButton} onPress={handlePress}>
          {isPulsing && (
            <Pulse
              color="rgba(250, 255, 217, 0.3)"
              numPulses={3}
              diameter={200}
              speed={0.01}
              duration={2000}
            />
          )}
          <Icon name="microphone" size={50} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.circularButton2} onPress={handlePressOut}>
          <Icon name="stop" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.65)', // Adjust the opacity as needed
  },
  circularButton: {
    width: 90,
    height: 90,
    borderRadius: 100,
    backgroundColor: 'lightgreen', // Set your desired background color
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // For Android shadow
    borderColor: 'black',
    borderWidth: 5,
    marginLeft: -10,
  },
  circularButton2: {
    width: 90,
    height: 90,
    borderRadius: 100,
    backgroundColor: 'red', // Set your desired background color
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // For Android shadow
    borderColor: 'black',
    borderWidth: 5,
    marginLeft: 170,
  },
  buttonText: {
    color: 'black', // Set your desired text color
  },
  textContainer: {
    marginTop: 100,
    marginBottom: -120,
    justifyContent: 'center',
    alignItems: 'center',
    top: 50,
  },
  timerContainer: {
    marginTop: 0,
    top: 0
  },
  timerText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold'
  },
});

export default SpeechPage;
