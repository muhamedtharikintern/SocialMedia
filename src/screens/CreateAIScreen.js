import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');

const creationTypes = [
  {
    id: 1,
    title: 'Image',
    subtitle:
      'Realistic or artistic visuals',
    icon: require('../assets/gallery_2.png'),
    iconColor: '#4338FF',
    backgroundColor: '#DCD7F3',
  },
  {
    id: 2,
    title: 'Video',
    subtitle:
      'Cinematic motion clips',
    icon: require('../assets/video_2.png'),
    iconColor: '#19A8C7',
    backgroundColor: '#A7D7E4',
  },
  {
    id: 3,
    title: 'Caption',
    subtitle:
      'Engaging social media copy',
    icon: require('../assets/caption.png'),
    iconColor: '#8A3A00',
    backgroundColor: '#D7C8D8',
  },
  {
    id: 4,
    title: 'Advertisement',
    subtitle:
      'Conversion optimized ads',
    icon: require('../assets/advertisement.png'),
    iconColor: '#A09300',
    backgroundColor: '#EEE6B7',
  },
];

const CreateAIScreen = () => {
  const [selectedType, setSelectedType] =
    useState(1);

  const [prompt, setPrompt] =
    useState('');

  const renderCard = item => {
    const active =
      selectedType === item.id;

    return (
      <TouchableOpacity
        key={item.id}
        activeOpacity={0.9}
        style={[
          styles.card,
          active && styles.activeCard,
        ]}
        onPress={() =>
          setSelectedType(item.id)
        }>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor:
                item.backgroundColor,
            },
          ]}>
         <Image
            source={item.icon}
            style={{
              width: 30,
              height: 30,
              resizeMode: 'contain',
            }}
          />
        </View>

        <Text style={styles.cardTitle}>
          {item.title}
        </Text>

        <Text
          style={styles.cardSubtitle}>
          {item.subtitle}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor="#C66CFF"
        barStyle="dark-content"
      />

      {/* HEADER */}
      <LinearGradient
        colors={[
          '#D88BF8',
          '#E4B4FF',
          '#A100C8',
        ]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.headerContainer}>
        <View style={styles.headerContent}>
            <Image
             source={require('../assets/generate.png')}
             style={{height:24,width:24,resizeMode:"contain"}}/>

          <Text style={styles.headerTitle}>
            Create with AI
          </Text>
        </View>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.scrollContent
        }>
        {/* TITLE */}
        <Text style={styles.sectionTitle}>
          Selection Type
        </Text>

        {/* GRID */}
        <View
          style={styles.gridContainer}>
          {creationTypes.map(
            renderCard,
          )}
        </View>

        {/* PROMPT */}
        <View
          style={styles.promptContainer}>
          <TextInput
            placeholder="Describe what you want to create..."
            placeholderTextColor="#111"
            multiline
            value={prompt}
            onChangeText={setPrompt}
            style={styles.promptInput}
            textAlignVertical="top"
          />

          <View
            style={styles.promptActions}>
            <TouchableOpacity
              style={
                styles.actionButton
              }>
             <Image
             source={require('../assets/add.png')}
             style={{height:40,width:40,resizeMode:"contain"}}/>
            </TouchableOpacity>

            <View
              style={
                styles.rightActions
              }>
              <TouchableOpacity
                style={
                  styles.actionButton
                }>
                <Image
             source={require('../assets/magic-staff.png')}
             style={{height:40,width:40,resizeMode:"contain"}}/>
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  styles.actionButton
                }>
                <Image
             source={require('../assets/mic_2.png')}
             style={{height:40,width:40,resizeMode:"contain"}}/>
                
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* GENERATE BUTTON */}
        <TouchableOpacity
          activeOpacity={0.9}>
          <LinearGradient
            colors={[
              '#CC6ACB',
              '#F4A2F5',
              '#88078C',
            ]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={
              styles.generateButton
            }>
                <Image
             source={require('../assets/generate.png')}
             style={{height:24,width:24,resizeMode:"contain"}}/>

            <Text
              style={
                styles.generateText
              }>
              Generate
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateAIScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  headerContainer: {
    width: '100%',
    height: height * 0.13,

    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,

    justifyContent: 'flex-end',
    alignItems: 'center',

    paddingBottom: 20,

    overflow: 'hidden',
  },

  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 18,
    color: '#000',
    fontWeight: '700',
    marginLeft: 8,
  },

  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 120,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    marginBottom: 14,
  },

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  card: {
    width: (width - 42) / 2,
    backgroundColor: '#E9EEF4',
    borderRadius: 20,
    padding: 14,
    marginBottom: 14,
  },

  activeCard: {
    borderWidth: 2,
    borderColor: '#A100C8',
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },

  cardSubtitle: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },

  promptContainer: {
    backgroundColor: '#FFF',
    borderRadius: 22,
    minHeight: 180,
    marginTop: 18,
    padding: 18,
    elevation: 3,
  },

  promptInput: {
    fontSize: 16,
    color: '#111',
    minHeight: 100,
  },

  promptActions: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
  },

  rightActions: {
    flexDirection: 'row',
  },

  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF',

    justifyContent: 'center',
    alignItems: 'center',

    elevation: 3,
    marginLeft: 10,
  },

  generateButton: {
    width: '92%',
    height: 56,
    borderRadius: 16,

    alignSelf: 'center',
    marginTop: 24,

    justifyContent: 'center',
    alignItems: 'center',

    flexDirection: 'row',
  },

  generateText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginLeft: 8,
  },
});