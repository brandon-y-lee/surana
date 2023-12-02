import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OpenAI from 'openai';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';

const openai = new OpenAI({apiKey: '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'});

const PromptInputPage = () => {
  const [inputText, setInputText] = useState('');
  const [aboutText, setAboutText] = useState('');
  const [category, setCategory] = useState('easy');
  const [selectedLabel, setSelectedLabel] = useState('');
  const [formality, setFormality] = useState('informal');
  const navigation = useNavigation();

  const handleInputChange = (text) => {
    setInputText(text);
  };

  const handleAboutTextChange = (text) => {
    setAboutText(text);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    setSelectedLabel(value);
  };

  const handleFormalityChange = (value) => {
    setFormality(value);
  };

  const handleSubmit = async () => {
    // try {
    //   console.log('Attempting to make API request...');
    //   const response = await fetch('http://localhost:3001/generate-text', {
    //     method: 'POST',
    //     headers: {
    //     'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ prompt: "Generate a javascript array of 1, 2, 3. Output only the array. No print statements No need to write anything before it. Only the code." }),
    //     });
    //   console.log('Done');
    //   const data = await response.json();
    //   const generatedText = data.generatedText;
    //   navigation.navigate('AudioRecorderCustom', { enteredText: generatedText });
    // } catch (error) {
    //   console.error('Error:', error);
    //   Alert.alert('Error', 'Failed to generate text. Please try again.');
    // }
    navigation.navigate('AudioRecorderCustom');
  };

  return (
    <LinearGradient
      colors={['#D3DBF6',  '#FFFFFF', '#FFFFFF', '#D3DBF6']}
      style={styles.container}
    >
      <Text style={styles.label}>Describe your conversation topic here. Be as specific as you can!</Text>
      <TextInput
        style={styles.input}
        placeholder="Type here..."
        onChangeText={handleInputChange}
        value={inputText}
      />
      <View style={styles.rowContainer}>
        <Text style={styles.label}>Topic in one word</Text>
        <TextInput
          style={styles.input2}
          placeholder="About..."
          onChangeText={handleAboutTextChange}
          value={aboutText}
        />
      </View>
      <View style={styles.rowContainer2}>
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={(value, index) => {
            handleCategoryChange(value);
          }}
        >
          <Picker.Item label="Easy" value="easy" />
          <Picker.Item label="Intermediate" value="intermediate" />
          <Picker.Item label="Advanced" value="advanced" />
        </Picker>
      </View>
      <View style={styles.rowContainer2}>
        <Picker
          selectedValue={formality}
          style={styles.picker}
          onValueChange={(value) => {
            handleFormalityChange(value);
          }}
        >
          <Picker.Item label="Informal" value="informal" fontFamily='monospace'/>
          <Picker.Item label="Formal" value="formal" fontFamily='monospace'/>
        </Picker>
      </View>
      <View style={styles.buttonContainer}>
        <Button color='black' title="Submit" onPress={handleSubmit} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  input: {
    alignSelf: 'center',
    borderRadius: 10,
    height: 140,
    borderColor: 'gray',
    borderWidth: 4,
    marginBottom: 20,
    padding: 10,
    width: '90%',
    backgroundColor: 'transparent', // Important for LinearGradient
  },
  input2: {
    borderRadius: 10,
    height: 70,
    borderColor: 'gray',
    borderWidth: 4,
    marginBottom: 20,
    padding: 10,
    width: '90%',
    backgroundColor: 'transparent', // Important for LinearGradient
  },
  rowContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  picker: {
    height: 60,
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    backgroundColor: 'transparent', // Important for LinearGradient
  },
  selectedLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: 'black', // Change the color as needed
    fontWeight: 'bold'
  },
  rowContainer2: {
    marginLeft: 80,
    width: '80%',
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    textAlign: 'center',
    color: 'black'
  },
  buttonContainer: {
    marginTop: 30,
    backgroundColor: 'black', // Change the color as needed
    borderRadius: 10,
    overflow: 'hidden',
    color: 'black',
    height: 50
  },
});

export default PromptInputPage;
