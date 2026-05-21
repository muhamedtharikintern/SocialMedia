import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');

export default function AIResultScreen({navigation}) {
  const [selectedStyle, setSelectedStyle] = useState('Cinematic');

  const hashtags = [
    '#AIArt',
    '#Digitalcreativity',
    '#CreateAI',
    '#Cinematicvibes',
    '#Futuredesign',
  ];

  const stylesData = [
    {
      id: 1,
      title: 'Cinematic',
      icon: require('../assets/cinematic.png'),
    },
    {
      id: 2,
      title: 'Minimal',
      icon: require('../assets/minimal.png'),
    },
    {
      id: 3,
      title: 'Aesthetic',
      icon: require('../assets/aesthatic.png'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#F3F4F6"
        barStyle="dark-content"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>

        {/* HEADER */}
        <View style={styles.headerContainer}>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.backButton}
            onPress={() => navigation.goBack()}>

            <Ionicons
              name="arrow-back"
              size={34}
              color="#111111"
            />

          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            AI Result
          </Text>

          <View style={styles.emptyView} />

        </View>

        {/* RESULT IMAGE */}
        <View style={styles.imageCard}>

          <Image
            source={require('../assets/airesult.png')}
            style={styles.resultImage}
            resizeMode="cover"
          />

          <View style={styles.imageOverlay}>

            <View>
              <Text style={styles.resolutionTitle}>
                Resolution
              </Text>

              <Text style={styles.resolutionValue}>
                2048 x 2560 px
              </Text>
            </View>

            <TouchableOpacity style={styles.downloadButton}>
              <Feather
                name="download"
                size={34}
                color="#111111"
              />
            </TouchableOpacity>

          </View>

        </View>

        {/* SUGGESTED CAPTIONS */}
        <Text style={styles.sectionTitle}>
          Suggested Captions
        </Text>

        <View style={styles.captionCard}>

          <Text style={styles.captionText}>
            “Bathing in sunlight and blooming{'\n'}
            like a sunflower.”
          </Text>

          <Text style={styles.captionTextBottom}>
            “The intersection of logic and beauty.{'\n'}
            A cinematic exploration of artificial creativity.”
          </Text>

        </View>

        {/* HASHTAGS */}
        <Text style={styles.sectionTitle}>
          Top Hashtags
        </Text>

        <View style={styles.hashtagContainer}>

          {hashtags.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              style={styles.hashtagPill}>

              <Text style={styles.hashtagText}>
                {item}
              </Text>

            </TouchableOpacity>
          ))}

        </View>

        {/* REFINE STYLE */}
        <Text style={styles.sectionTitle}>
          Refine Style
        </Text>

        <View style={styles.styleRow}>

          {stylesData.map(item => {
            const active = selectedStyle === item.title;

            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.9}
                onPress={() => setSelectedStyle(item.title)}
                style={[
                  styles.styleCard,
                  active && styles.activeStyleCard,
                ]}>
                <Image
                source={item.icon}
                style={{height:42,width:100,resizeMode:"contain"}}/>

                <Text
                  style={[
                    styles.styleText,
                    active && styles.activeStyleText,
                  ]}>

                  {item.title}

                </Text>

              </TouchableOpacity>
            );
          })}

        </View>

        {/* ACTION BUTTONS */}
        <View style={styles.bottomButtonRow}>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.actionButtonWrapper}>

            <LinearGradient
              colors={['#A100C8', '#8A00B8']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.actionGradient}>

              <Text style={styles.actionButtonText}>
                Regenerate
              </Text>

            </LinearGradient>

          </TouchableOpacity>

          <TouchableOpacity
          onPress={()=> navigation.navigate("PostNowScreen")}
            activeOpacity={0.9}
            style={styles.actionButtonWrapper}>

            <LinearGradient
              colors={['#A100C8', '#8A00B8']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.actionGradient}>

              <View style={styles.nextButtonContent}>

                <Text style={styles.actionButtonText}>
                  Next
                </Text>

                <Image
                source={require('../assets/right_arrow.png')}
                style={{height:24,width:24,resizeMode:"contain"}}/>

              </View>

            </LinearGradient>

          </TouchableOpacity>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },

  scrollContent: {
    paddingTop: 20,
    paddingBottom: 40,
  },

  headerContainer: {
    paddingHorizontal: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 32,
  },

  backButton: {
    width: 64,
    height: 64,
    borderRadius: 32,

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111111',
  },

  emptyView: {
    width: 64,
  },

  imageCard: {
    width: width - 40,
    height: 390,

    alignSelf: 'center',

    borderRadius: 26,
    overflow: 'hidden',

    marginBottom: 34,

    backgroundColor: '#FFFFFF',
  },

  resultImage: {
    width: '100%',
    height: '100%',
  },

  imageOverlay: {
    position: 'absolute',
    bottom: 22,
    left: 18,
    right: 18,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  resolutionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',

    marginBottom: 6,
  },

  resolutionValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  downloadButton: {
    width: 66,
    height: 66,
    borderRadius: 33,

    backgroundColor: '#D89A2D',

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 6,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111111',

    marginHorizontal: 20,
    marginBottom: 20,
  },

  captionCard: {
    marginHorizontal: 20,

    backgroundColor: '#FFFFFF',

    borderWidth: 2,
    borderColor: '#D46BDF',

    borderRadius: 28,

    paddingHorizontal: 24,
    paddingVertical: 34,

    marginBottom: 40,

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  captionText: {
    fontSize: 18,
    lineHeight: 34,

    textAlign: 'center',

    color: '#111111',
    fontWeight: '600',

    marginBottom: 30,
  },

  captionTextBottom: {
    fontSize: 18,
    lineHeight: 34,

    textAlign: 'center',

    color: '#111111',
    fontWeight: '600',
  },

  hashtagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    paddingHorizontal: 20,

    marginBottom: 42,
  },

  hashtagPill: {
    borderWidth: 2,
    borderColor: '#D46BDF',

    borderRadius: 18,

    paddingHorizontal: 22,
    paddingVertical: 14,

    backgroundColor: '#FFFFFF',

    marginRight: 14,
    marginBottom: 14,
  },

  hashtagText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
  },

  styleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingHorizontal: 20,

    marginBottom: 52,
  },

  styleCard: {
    width: width / 3.7,
    height: 150,

    backgroundColor: '#FFFFFF',

    borderRadius: 28,

    borderWidth: 2,
    borderColor: '#D46BDF',

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  activeStyleCard: {
    backgroundColor: '#FFFFFF',
  },

  styleText: {
    marginTop: 18,

    fontSize: 16,
    fontWeight: '600',

    color: '#E28AEF',
  },

  activeStyleText: {
    color: '#D46BDF',
  },

  bottomButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingHorizontal: 20,
  },

  actionButtonWrapper: {
    width: '47%',
    borderRadius: 999,
    overflow: 'hidden',
  },

  actionGradient: {
    height: 74,

    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 999,
  },

  actionButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  nextButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});