import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker'; // Import Picker and Item
import Icon from 'react-native-vector-icons/FontAwesome';
import { Feather } from 'react-native-vector-icons';
import { MaterialIcons } from 'react-native-vector-icons';
import { FontAwesome } from 'react-native-vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import { Alert } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

// Import your questionsMap
import questionsMap from '/Users/yugamsurana/Desktop/omg/language/src/components/Questions.js';

// Create a mapping object for images
const imagePaths = {
  food: require('/Users/yugamsurana/Desktop/omg/language/src/components/images/food.gif'),
  family: require('/Users/yugamsurana/Desktop/omg/language/src/components/images/family2.gif'),
  school: require('/Users/yugamsurana/Desktop/omg/language/src/components/images/school.gif'),
  daily: require('/Users/yugamsurana/Desktop/omg/language/src/components/images/school.gif'),
  sports: require('/Users/yugamsurana/Desktop/omg/language/src/components/images/sports.gif'),
  god: require('/Users/yugamsurana/Desktop/omg/language/src/components/images/god.gif'),
  love: require('/Users/yugamsurana/Desktop/omg/language/src/components/images/loveGif.gif'),
  jealousy: require('/Users/yugamsurana/Desktop/omg/language/src/components/images/health.gif'),
  movies: require('/Users/yugamsurana/Desktop/omg/language/src/components/images/movies.gif'),
  extended: require('/Users/yugamsurana/Desktop/omg/language/src/components/images/dance.gif'),
  additional: require('/Users/yugamsurana/Desktop/omg/language/src/components/images/movies.gif'),
};

const AudioRecorder3 = () => {
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [countdown, setCountdown] = useState(3); // Initial countdown value
  const [selectedCategory, setSelectedCategory] = useState('family');
  const navigation = useNavigation(); // Hook to access the navigation object
  const route = useRoute();


  // Get the list of questions based on the selected category
  const questions = questionsMap.get(selectedCategory) || [];

  const [mergedRecordingFilePath, setMergedRecordingFilePath] = useState(null);

  async function sendAllRecordingsToBackend() {
    if (recordings.length > 0) {
      try {
        await Promise.all(recordings.map(async (recordingLine) => {
          await sendFileToBackend(recordingLine.file);
        }));
  
        console.log('All recordings sent to backend successfully');
      } catch (error) {
        console.error('Error sending recordings to the server:', error);
      }
    }
  }
  
  async function sendFileToBackend(fileUri) {
    const backendUrl = 'http://127.0.0.1:5000/analyze'; // Replace with your backend URL
    const formData = new FormData();
    formData.append('audio', { uri: fileUri, type: 'audio/3gpp' });

    try {
      await sendToBackend(backendUrl, formData);
      console.log('Recording sent to backend successfully');
    } catch (error) {
      console.error('Error sending recording to the server:', error);
      // Handle the error accordingly
    }
  }  

  async function sendToBackend(url, formData) {
    console.log(url, formData)
    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response from server:', response.data); // Add this line

      if (!response.data.success) {
        throw new Error(`Failed to send data to the server. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error sending recording to the server:', error);
      // Handle the error accordingly
    }
  }
  
  
  async function playMergedRecording() {
    if (mergedRecordingFilePath) {
      const { sound } = await Audio.Sound.createAsync(
        { uri: mergedRecordingFilePath },
        { shouldPlay: true }
      );
      await sound.playAsync();
    }
  }

  useEffect(() => {
    // Start the countdown when the component mounts
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      // Clear the timer when the component unmounts or when the countdown reaches 0
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      // Start recording when the countdown reaches 0
      startRecording();
    }
  }, [countdown]);

  async function speak(text) {
    return Speech.speak(text, { language: 'en-IN', rate: 0.5});
  }

  async function speakWithGoogleCloud(text) {
    try {
      const [response] = await textToSpeechClient.synthesizeSpeech({
        input: { text },
        voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
        audioConfig: { audioEncoding: 'LINEAR16' },
      });

      const audioBuffer = Buffer.from(response.audioContent, 'base64');

      // Play the audio using Expo Audio
      const { sound } = await Audio.Sound.createAsync(
        { uri: `data:audio/wav;base64,${audioBuffer.toString('base64')}` },
        { shouldPlay: true }
      );

      await sound.playAsync();
    } catch (error) {
      console.error('Error synthesizing speech:', error);
    }
  }

  async function startRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording);
      }
    } catch (err) {
      console.error('Error starting recording:', err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    let allRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    allRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
    });
    setRecordings(allRecordings);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      console.log(questions[currentQuestionIndex + 1]);
      console.log('hiiiiii');
      await speak(questions[currentQuestionIndex + 1]);
      setCountdown(3); // Start the countdown after the speech finishes
    } else {
      // All questions asked, you may want to handle this case accordingly
      console.log('All questions asked');
    }
  }

  async function repeatQuestion() {
    if (currentQuestionIndex < questions.length) {
      // Ask the current question using text-to-speech
      await speak(questions[currentQuestionIndex]);
      setCountdown(3);
    }
  }

  function getDurationFormatted(milliseconds) {
    const minutes = milliseconds / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return seconds < 10
      ? `${Math.floor(minutes)}:0${seconds}`
      : `${Math.floor(minutes)}:${seconds}`;
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => (
      <View key={index} style={styles.row}>
        <Text style={styles.fill}>
          Recording #{index + 1} | {recordingLine.duration}
        </Text>
        <Button onPress={() => recordingLine.sound.replayAsync()} title="Play" />
      </View>
    ));
  }


  return (
    <LinearGradient
      colors={['#433705','black', 'black', 'black']}
      style={styles.gradientContainer}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={imagePaths[selectedCategory] || imagePaths.food}
            style={styles.headerImage}
          />
        </View>
        <View style={styles.topButtonsContainer}>
          <View style={styles.row}>
            <View style={styles.settingsButtonPicker}>
              <Picker
                selectedValue={selectedCategory}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
              >
                {Array.from(questionsMap.keys()).map((category) => (
                  <Picker.Item key={category} label={category} value={category} />
                ))}
              </Picker>
            </View>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
        <View style={styles.settingsButtonsContainer}>
    <View style={styles.buttonContainer}>
    <TouchableOpacity
        onPress={() => {
          console.log('Pressed');
          Alert.alert('Clue', questions[currentQuestionIndex]);
                }}
          style={styles.settingsButton}
            >
          <View style={styles.textButtonContent}>
            <MaterialIcons name="lightbulb-outline" size={40} color="white" />
          </View>
      </TouchableOpacity>
    <Text style={styles.buttonText}>Clue</Text>
  </View>

  <View style={styles.buttonContainer}>
    <TouchableOpacity onPress={repeatQuestion} style={styles.settingsButton}>
      <Feather name="repeat" size={30} color="white" />
    </TouchableOpacity>
    <Text style={styles.buttonText}>Repeat</Text>
  </View>

  <View style={styles.buttonContainer}>
    <TouchableOpacity onPress={stopRecording} style={styles.settingsButton}>
      <FontAwesome name="angle-right" size={30} color="white" />
    </TouchableOpacity>
    <Text style={styles.buttonText}>Next</Text>
  </View>
</View>

        <TouchableOpacity onPress={() => {
            sendAllRecordingsToBackend();
            navigation.navigate('ReportPage');
              }} style={styles.endSessionButton}>
            <Icon name="phone" size={30} color="white" />
        </TouchableOpacity>
        </View>
        {/* ... (rest of your component) */}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    marginTop: -200,
    marginRight: -60,
    marginBottom: 60,
  },
  headerImage: {
    width: 800,
    height: 200,
    resizeMode: 'contain',
    marginTop: 100,
    marginRight: 60,
  },
  buttonsContainer: {
    marginBottom: -50,
  },
  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    marginLeft: 20,
    marginTop: -40,
  },
  settingsButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
    marginLeft: 10,
    marginTop: 22

  },
  textButton: {
    width: 100,
    height: 100,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Adjust the alpha (last value) as needed
    // borderColor: 'white',
    // borderWidth: 1
  },
  buttonContainer: {
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    marginTop: 5, // Adjust the spacing as needed
    fontSize: 19,
  },
  settingsButton: {
    width: 85,
    height: 95,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  settingsButtonPicker: {
    width: 200,
    height: 60,
    marginLeft: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    
  },
  endSessionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 50,
    width: 90,
    height: 90,
    paddingVertical: 15,
    marginLeft: 120,
    marginTop: 30
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 40,
  },
  fill: {
    flex: 1,
    margin: 15,
  },
  picker: {
    height: 50,
    width: 180,
    marginBottom: 20,
    color: 'white',
    fontSize: 20
  },
  textButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default AudioRecorder3;