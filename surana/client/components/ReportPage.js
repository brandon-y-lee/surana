import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient from 'expo-linear-gradient'
import { MaterialIcons } from 'react-native-vector-icons';
import { BarChart } from 'react-native-gifted-charts';
import { useNavigation } from '@react-navigation/native';


const SessionReport = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [averageScore, setAverageScore] = useState(0);
  const [parameterDescriptions, setParameterDescriptions] = useState([]);
  const [comment, setComment] = useState('');
  const navigation = useNavigation(); // Hook to access the navigation object

  useEffect(() => {
    // Simulate a loading period before fetching data
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulating a 2-second loading period

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(loadingTimeout);
  }, []); // Empty dependency array ensures the effect runs only once

  useEffect(() => {
    // Simulate an API call to fetch data
    const fetchData = async () => {
      // Add any asynchronous logic here (e.g., fetching data from an API)
      // For demonstration purposes, let's use a setTimeout to simulate an asynchronous operation
      const mockData = [
        { parameter: 'Complexity', score: 7 },
        { parameter: 'Adverbs', score: 2 },
        { parameter: 'Adjectives', score: 5 },
        { parameter: 'Pauses', score: 9 },
        { parameter: 'Filler Words', score: 2 },
        { parameter: 'Grammar', score: 4 },
        { parameter: 'Structure', score: 3 },
        { parameter: 'Pace', score: 8 },
        { parameter: 'Repetition', score: 6 },
        { parameter: 'Clarity', score: 8 },
      ];

      const mockChartData = mockData.map((item) => ({
        name: item.parameter,
        value: item.score,
      }));

      const mockParameterDescriptions = [
        'Description for Complexity.',
        'Description for Adverbs.',
        'Description for Adjectives.',
        'Description for Pauses.',
        'Description for Filler Words.',
        'Description for Grammar.',
        'Description for Structure.',
        'Description for Pace.',
        'Description for Repetition.',
        'Description for Clarity.',
      ];

      const mockComment =
        'The speech exhibits confident delivery, effectively engaging the audience. However, occasional grammatical errors, such as subject-verb agreement issues, slightly detract from its fluency. Addressing these would enhance the overall polish and professionalism of the presentation.';

      setData(mockData);
      setChartData(mockChartData);
      setParameterDescriptions(mockParameterDescriptions);
      setComment(mockComment);
      setAverageScore(
        mockData.reduce((total, item) => total + item.score, 0) / mockData.length
      );
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once

  if (loading) {
    // Render a loading screen while data is being fetched
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  const renderParameterItem = ({ item, index }) => (
    <View style={styles.parameterItem}>
      <Text style={styles.parameterText}>{item.parameter}</Text>
      <View
        style={[
          styles.scoreContainer,
        ]}
      />
      <Text style={styles.scoreText}>{item.score}/100 </Text>
    </View>
  );

  return (
    <LinearGradient
      colors={['#FADFAC', 'white', 'white', '#CBF5CB']} // Define your gradient colors
      style={styles.container}
    >
      <ScrollView>
        <View style={styles.header}>
          <MaterialIcons name="person" size={30} color="black" />
          <Text style={styles.title}>Session Report</Text>
        </View>
        <View style={styles.commentContainer}>
            <Text style={{fontSize:20, fontFamily: 'monospace', fontWeight: 'bold', marginLeft: 8}}>Final Score : 7.4/10</Text>
          <Text style={styles.commentText}>{comment}</Text>
        </View>

        {data.map((item, index) => (
          <View key={index.toString()}>{renderParameterItem({ item, index })}</View>
        ))}

        <View>
          <View
            style={{
              height: 3,
              backgroundColor: 'black',
              marginBottom: 20,
            }}
          />
          <BarChart
            data={chartData}
            height={200}
            barColor="green"
            barSpacing={10}
            barRadius={5}
            axisColor="black"
            barWidth={10}
            yAxisSuffix="/10"
            barBorderTopLeftRadius={5}
            barBorderTopRightRadius={5}
          />
        </View>

        {parameterDescriptions.map((description, index) => (
          <View key={index.toString()} style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>
              {data[index].parameter}: {description}
            </Text>
            {index < parameterDescriptions.length - 1 && (
              <View
                style={{
                  height: 1,
                  backgroundColor: 'gray',
                  marginVertical: 10,
                }}
              />
            )}
          </View>
        ))}
        <View style={{ height: 20 }}></View>

        <TouchableOpacity
          style={styles.exitButton}
          onPress={() => {
            navigation.navigate('Home')
          }}
        >
          <MaterialIcons name="exit-to-app" size={24} color="white" />
          <Text style={styles.exitButtonText}>Exit</Text>
        </TouchableOpacity>

      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 8,
    fontFamily: 'monospace',
  },
  commentContainer: {
    marginBottom: 10,
  },
  commentText: {
    fontSize: 13,
    fontFamily: 'monospace',
    marginLeft: 10,
  },
  parameterItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  parameterText: {
    fontSize: 16,
    fontFamily: 'monospace',
    marginLeft: 10,
  },
  scoreContainer: {
    height: 20,
    backgroundColor: 'green',
    marginRight: 8,
    marginVertical: -50,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 0,
    marginRight: 25,
  },
  descriptionContainer: {
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'monospace',
  },
  exitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  exitButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
    fontFamily: 'monospace',
  },
});

export default SessionReport;
