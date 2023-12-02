// TextToSpeech.js

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Tts from 'react-native-tts';

const TextToSpeech = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    Tts.setDefaultLanguage('en-US');
  }, []);

  const askQuestion = () => {
    if (currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      Tts.speak(currentQuestion);
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
    } else {
      console.log('All questions asked.'); // Handle when all questions have been asked
    }
  };

  return (
    <View>
      <Text>{questions[currentQuestionIndex]}</Text>
      <TouchableOpacity onPress={askQuestion}>
        <Text>Ask Question</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TextToSpeech;
