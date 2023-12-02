import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Image, TextInput, ImageBackground} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute } from '@react-navigation/native';

const OptionsPage = () => {
  const renderButton = (text, iconName, id, gradientColors) => (
    <TouchableOpacity style={styles.button}>
      <LinearGradient colors={gradientColors} style={styles.buttonGradient}>
        <FontAwesome name={iconName} size={40} color="white" />
        <Text style={styles.buttonText}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
  const navigation = useNavigation();

  const handleRightArrow = () => {
    navigation.navigate('Home')
  }

  return (
    <LinearGradient colors={['#44423B', '#000000', '#000000', '#000000', '#000000']} style={styles.backgroundGradient}>
      <ScrollView style={styles.container}>
      <Image
        source={require('/Users/yugamsurana/Desktop/omg/language/src/components/images/optionsImage.jpg')} // Update the path to your image
        style={styles.headerImage}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      <View style={{marginTop: -10, marginLeft: 340, top: -100}}> 
      <TouchableOpacity style={styles.rightArrowContainer} onPress={handleRightArrow}>
          <MaterialCommunityIcons name="arrow-right" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Some topics to explore!</Text>
      </View>
      <View style={styles.searchBoxContainer}>
          <TextInput
            placeholder="Search your desirable conversations ..."
            style={styles.searchBox}
            placeholderTextColor="black"
          />
        </View>
      {/* <View style={{height: 0}}> */}
      {/* </View> */}
      <View style={styles.horizontalScrollViewContainer}>
        <Text style={{color: 'white', marginBottom: 5, fontSize: 15, fontWeight: 'bold'}}> Our University </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    {/* Replace these with your TouchableOpacity buttons */}
      <TouchableOpacity style={styles.horizontalScrollButton}>
      <Image
        source={require('/Users/yugamsurana/Desktop/omg/language/src/components/images/srk.jpeg')} // Update the path to your image
        style={styles.headerImage}
        resizeMode="cover"
      />
        <Text style={styles.horizontalScrollButtonText}>Button A</Text>
      </TouchableOpacity>
    
      <TouchableOpacity style={styles.horizontalScrollButton}>
      <Image
        source={require('/Users/yugamsurana/Desktop/omg/language/src/components/images/health.jpeg')} // Update the path to your image
        style={styles.headerImage}
        resizeMode="cover"
      />
        <Text style={styles.horizontalScrollButtonText}>Button B</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.horizontalScrollButton}>
      <Image
        source={require('/Users/yugamsurana/Desktop/omg/language/src/components/images/sports.jpeg')} // Update the path to your image
        style={styles.headerImage}
        resizeMode="cover"
      />
        <Text style={styles.horizontalScrollButtonText}>Button A</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.horizontalScrollButton}>
      <Image
        source={require('/Users/yugamsurana/Desktop/omg/language/src/components/images/health.jpeg')} // Update the path to your image
        style={styles.headerImage}
        resizeMode="cover"
      />
        <Text style={styles.horizontalScrollButtonText}>Button A</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.horizontalScrollButton}>
      <Image
        source={require('/Users/yugamsurana/Desktop/omg/language/src/components/images/health.jpeg')} // Update the path to your image
        style={styles.headerImage}
        resizeMode="cover"
      />
        <Text style={styles.horizontalScrollButtonText}>Button A</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.horizontalScrollButton}>
      <Image
        source={require('/Users/yugamsurana/Desktop/omg/language/src/components/images/health.jpeg')} // Update the path to your image
        style={styles.headerImage}
        resizeMode="cover"
      />
        <Text style={styles.horizontalScrollButtonText}>Button A</Text>
      </TouchableOpacity>

      </ScrollView>
        </View>

        <View style={styles.scrollContainer}>
          {/* Row 1 */}
          <Text style={{color: 'white', marginBottom: 5, fontSize: 15, fontWeight: 'bold', marginLeft: 7}}> Speaking Topics </Text>
          <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AudioRecorder', {category: 'behavioral'})}>
            <LinearGradient colors={['#D61837', '#7F0E21']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Behaviourial Interview</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AudioRecorder', {category: 'Culture'})}>
            <LinearGradient colors={['#219E17', '#0E4F09']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Culture</Text>
            </LinearGradient>
          </TouchableOpacity>
          </View>

          {/* Row 2 */}
          <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AudioRecorder', {category: 'Family'})}>
            <LinearGradient colors={['#8825DA', '#531587']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Family</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AudioRecorder', {category: 'Ice-breaking'})}>
            <LinearGradient colors={['#0F3F67', '#07253E']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Getting to know / Introduction</Text>
            </LinearGradient>
          </TouchableOpacity>
          </View>

          <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AudioRecorder', {category: 'Pitch'})}>
            <LinearGradient colors={['#DA7725', '#72451A']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Pitch / Persuasion</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AudioRecorder', {category: 'Food'})}>
            <LinearGradient colors={['#4ECDC4', '#556270']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Food</Text>
            </LinearGradient>
          </TouchableOpacity>
          </View>

          <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AudioRecorder', {category: 'School'})}>
            <LinearGradient colors={['#872F15', '#391409']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>School</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AudioRecorder', {category: 'Daily Life'})}>
            <LinearGradient colors={['#3C6414', '#263D0F']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Daily Life</Text>
            </LinearGradient>
          </TouchableOpacity>
          </View>

          <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AudioRecorder', {category: 'Sports'})}>
            <LinearGradient colors={['#D61837', '#7F0E21']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Sports</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AudioRecorder', {category: 'God'})}>
            <LinearGradient colors={['#219E17', '#0E4F09']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>God</Text>
            </LinearGradient>
          </TouchableOpacity>
          </View>

          <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AudioRecorder', {category: 'Love'})}>
            <LinearGradient colors={['#8825DA', '#531587']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Love</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AudioRecorder', {category: 'Mental Health'})}>
            <LinearGradient colors={['#0F3F67', '#07253E']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Mental Health</Text>
            </LinearGradient>
          </TouchableOpacity>
          </View>

          <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AudioRecorder', {category: 'Movies'})}>
            <LinearGradient colors={['#DA7725', '#72451A']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Movies</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AudioRecorder', {category: 'Easy'})}>
            <LinearGradient colors={['#4ECDC4', '#556270']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Easy</Text>
            </LinearGradient>
          </TouchableOpacity>
          </View>

          <View style={styles.buttonRow}>
            
          <TouchableOpacity style={styles.buttonLong} onPress={() => navigation.navigate('SpeechPage')}>
          <Image
            source={require('/Users/yugamsurana/Desktop/omg/language/src/components/images/audience.jpg')} // Update the path to your image
            style={styles.speechImage}
            resizeMode="cover"
        />
        <Text style={styles.buttonText}>Give a speech</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonLong} onPress={() => navigation.navigate('AudioRecorder', {category: 'Easy'})}>
          <Image
            source={require('/Users/yugamsurana/Desktop/omg/language/src/components/images/impromptu.jpeg')} // Update the path to your image
            style={styles.speechImage}
            resizeMode="cover"
        />
        <Text style={styles.buttonText}>Impromptu</Text>
          </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  backgroundGradient: {
    flex: 1,
  },
  headerImage: {
    width: '120%', // Take the full width of the screen
    height: 120,    // Set the desired height
    left: -10,
    top: -10,
    bottom: 100,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  speechImage: {
    width: '120%', // Take the full width of the screen
    height: '75%',    // Set the desired height
    left: -10,
    top: -10,
    bottom: 100,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  container: {
    marginTop: 0
  },
  scrollContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -20
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  button: {
    width: '45%',
    borderRadius: 6,
    overflow: 'hidden',
    height: 100,
    marginBottom: 5,
    textAlign: 'left'
  },
  buttonLong: {
    width: '45%',
    borderRadius: 6,
    overflow: 'hidden',
    height: 220,
    marginBottom: 5,
    textAlign: 'left'
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'left',
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    marginBottom: -20,
    textAlign: 'left'
  },
  title: {
    fontSize: 25,
    fontFamily: 'monospace',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Adjust the alpha (4th value) for darkness
  },
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    // alignItems: 'center',
    marginTop: -1390,
    marginLeft: 20
  },
  headerText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'monospace'

  },
  searchBox: {
    flex: 1,
    height: 60,
    width: '95%',
    backgroundColor: 'white', // Set the background color of the text input
    borderRadius: 5,
    color: 'black', // Set the text color
    paddingLeft: 10,
    marginRight: 10,
    marginLeft: 10,
    fontFamily: 'monospace',
    fontSize: 13
  },
  searchBoxContainer: {
    marginTop: 10,
    marginBottom: 20,
    bottom: 20
  },
  horizontalScrollViewContainer: {
    height: 190,
    marginTop: 10,
    marginBottom: 10,
    top: -30,
    marginLeft: 10
  },
  
  horizontalScrollButton: {
    backgroundColor: 'gray',
    borderRadius: 10,
    padding: 10,
    marginRight: 20,
    width: 120,
    height: 190
  },

  horizontalScrollButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default OptionsPage;
