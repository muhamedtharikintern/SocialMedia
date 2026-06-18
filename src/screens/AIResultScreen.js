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
  Share,
  Alert,
} from 'react-native';

import Feather          from 'react-native-vector-icons/Feather';
import LinearGradient   from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');

export default function AIResultScreen({navigation, route}) {

  // ── Params from CreateAIScreen ───────────────────────────────
  const {
    type      = 'Image',
    aiImage   = null,       // user-picked image uri (optional)
    caption   = '',         // for Caption type
    hashtags  = [],         // for Caption type
    result    = {},         // for Image / Video / Advertisement
  } = route?.params ?? {};

  const [selectedStyle, setSelectedStyle] = useState('Cinematic');

  const stylesData = [
    {id: 1, title: 'Cinematic', icon: require('../assets/cinematic.png')},
    {id: 2, title: 'Minimal',   icon: require('../assets/minimal.png')},
    {id: 3, title: 'Aesthetic', icon: require('../assets/aesthatic.png')},
  ];

  // ── Derived display values ────────────────────────────────────

  // For Caption type: use AI caption; for others use result.caption if present
  const displayCaption = type === 'Caption'
    ? caption
    : result?.caption ?? '';

  // For Caption type: use AI hashtags; for others use result.hashtags if present
  const displayHashtags = type === 'Caption'
    ? (Array.isArray(hashtags) ? hashtags : [])
    : (Array.isArray(result?.hashtags) ? result.hashtags : []);

  // Image to show: AI-generated image URL from result, fallback to user-picked image
  const displayImage = result?.imageUrl
    ? {uri: result.imageUrl}
    : result?.url
    ? {uri: result.url}
    : aiImage
    ? {uri: aiImage}
    : require('../assets/airesult.png');

  // ── Share handler ─────────────────────────────────────────────
  const handleShare = async () => {
    try {
      await Share.share({
        message: [
          displayCaption,
          displayHashtags.join('  '),
        ].filter(Boolean).join('\n\n'),
      });
    } catch (err) {
      Alert.alert('Share failed', err.message);
    }
  };

  // ── Pass data to PostNowScreen ────────────────────────────────
  const handleNext = () => {
    navigation.navigate('PostScreen', {
      aiImage:   result?.imageUrl ?? result?.url ?? aiImage,
      caption:   displayCaption,
      hashtags:  displayHashtags,
      type,
    });
  };

  /* =========================
      RENDER
  ========================= */

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#F3F4F6" barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>

        {/* HEADER */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/back.png')}
              style={{width: 40, height: 40, resizeMode: 'contain'}}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>AI Result</Text>

          <View style={styles.emptyView} />
        </View>

        {/* RESULT IMAGE */}
        <View style={styles.imageCard}>
          <Image
            source={displayImage}
            style={styles.resultImage}
            resizeMode="cover"
          />

          <View style={styles.imageOverlay}>
            <View>
              <Text style={styles.resolutionTitle}>Type</Text>
              <Text style={styles.resolutionValue}>{type}</Text>
            </View>

            <TouchableOpacity style={styles.downloadButton} onPress={handleShare}>
              <Feather name="download" size={34} color="#111111" />
            </TouchableOpacity>
          </View>
        </View>

        {/* SUGGESTED CAPTIONS — show only if there's a caption */}
        {displayCaption ? (
          <>
            <Text style={styles.sectionTitle}>Suggested Caption</Text>
            <View style={styles.captionCard}>
              <Text style={styles.captionText}>
                "{displayCaption}"
              </Text>
            </View>
          </>
        ) : null}

        {/* HASHTAGS — show only if there are hashtags */}
        {displayHashtags.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>Top Hashtags</Text>
            <View style={styles.hashtagContainer}>
              {displayHashtags.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  style={styles.hashtagPill}>
                  <Text style={styles.hashtagText}>
                    {item.startsWith('#') ? item : `#${item}`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : null}

        {/* REFINE STYLE */}
        <Text style={styles.sectionTitle}>Refine Style</Text>

        <View style={styles.styleRow}>
          {stylesData.map(item => {
            const active = selectedStyle === item.title;
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.9}
                onPress={() => setSelectedStyle(item.title)}
                style={[styles.styleCard, active && styles.activeStyleCard]}>
                <Image
                  source={item.icon}
                  style={{height: 42, width: 100, resizeMode: 'contain'}}
                />
                <Text style={[styles.styleText, active && styles.activeStyleText]}>
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
            style={styles.actionButtonWrapper}
            onPress={() => navigation.goBack()}>
            <LinearGradient
              colors={['#A100C8', '#8A00B8']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.actionGradient}>
              <Text style={styles.actionButtonText}>Regenerate</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.actionButtonWrapper}
            onPress={handleNext}>
            <LinearGradient
              colors={['#A100C8', '#8A00B8']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.actionGradient}>
              <View style={styles.nextButtonContent}>
                <Text style={styles.actionButtonText}>Next</Text>
                <Image
                  source={require('../assets/right_arrow.png')}
                  style={{height: 24, width: 24, resizeMode: 'contain'}}
                />
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
    paddingTop:    20,
    paddingBottom: 40,
  },
  headerContainer: {
    paddingHorizontal: 20,
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'space-between',
    marginBottom:      32,
  },

  goldButton: {
  height: 74,
  borderRadius: 999,
  backgroundColor: '#FDBB67',
  justifyContent: 'center',
  alignItems: 'center',
},
goldButtonText: {
  fontSize: 18,
  fontWeight: '700',
  color: '#FFFFFF',
},
  backButton: {
    width:           64,
    height:          64,
    borderRadius:    32,
    backgroundColor: '#FFFFFF',
    justifyContent:  'center',
    alignItems:      'center',
    shadowColor:     '#000',
    shadowOpacity:   0.08,
    shadowRadius:    12,
    shadowOffset:    {width: 0, height: 4},
    elevation:       5,
  },
  headerTitle: {
    fontSize:   26,
    fontWeight: '700',
    color:      '#111111',
  },
  emptyView: {
    width: 64,
  },
  imageCard: {
    width:           width - 40,
    height:          390,
    alignSelf:       'center',
    borderRadius:    26,
    overflow:        'hidden',
    marginBottom:    34,
    backgroundColor: '#FFFFFF',
  },
  resultImage: {
    width:  '100%',
    height: '100%',
  },
  imageOverlay: {
    position:       'absolute',
    bottom:         22,
    left:           18,
    right:          18,
    flexDirection:  'row',
    justifyContent: 'space-between',
    alignItems:     'flex-end',
  },
  resolutionTitle: {
    fontSize:     20,
    fontWeight:   '700',
    color:        '#FFFFFF',
    marginBottom: 6,
  },
  resolutionValue: {
    fontSize:   18,
    fontWeight: '700',
    color:      '#FFFFFF',
  },
  downloadButton: {
    width:           66,
    height:          66,
    borderRadius:    33,
    backgroundColor: '#D89A2D',
    justifyContent:  'center',
    alignItems:      'center',
    shadowColor:     '#000',
    shadowOpacity:   0.15,
    shadowRadius:    10,
    shadowOffset:    {width: 0, height: 4},
    elevation:       6,
  },
  sectionTitle: {
    fontSize:         24,
    fontWeight:       '700',
    color:            '#111111',
    marginHorizontal: 20,
    marginBottom:     20,
  },
  captionCard: {
    marginHorizontal: 20,
    backgroundColor:  '#FFFFFF',
    borderWidth:      2,
    borderColor:      '#D89A2D',
    borderRadius:     28,
    paddingHorizontal:24,
    paddingVertical:  34,
    marginBottom:     40,
    shadowColor:      '#000',
    shadowOpacity:    0.06,
    shadowRadius:     12,
    shadowOffset:     {width: 0, height: 4},
    elevation:        4,
  },
  captionText: {
    fontSize:   18,
    lineHeight: 34,
    textAlign:  'center',
    color:      '#111111',
    fontWeight: '600',
  },
  hashtagContainer: {
    flexDirection:    'row',
    flexWrap:         'wrap',
    paddingHorizontal:20,
    marginBottom:     42,
  },
  hashtagPill: {
  backgroundColor: 'transparent',
  borderWidth: 1.5,
  borderColor: '#FDBB67',
  borderRadius: 18,
  paddingHorizontal: 22,
  paddingVertical: 14,
  marginRight: 14,
  marginBottom: 14,
},
  hashtagText: {
  fontSize: 16,
  fontWeight: '700',
  color: '#111111',
},
  styleRow: {
    flexDirection:    'row',
    justifyContent:   'space-between',
    paddingHorizontal:20,
    marginBottom:     52,
  },
  styleCard: {
    width:           width / 3.7,
    height:          150,
    backgroundColor: '#F8F8F8',
    borderRadius:    28,
    borderWidth:     2,
    borderColor:     '#FDBB67',
    justifyContent:  'center',
    alignItems:      'center',
    shadowColor:     '#000',
    shadowOpacity:   0.06,
    shadowRadius:    10,
    shadowOffset:    {width: 0, height: 4},
    elevation:       4,
  },
  activeStyleCard: {
  backgroundColor: '#FFF8EE',
  borderColor: '#FDBB67',
},
  styleText: {
  marginTop: 18,
  fontSize: 16,
  fontWeight: '600',
  color: '#FDBB67',
},
  activeStyleText: {
    color: '#FDBB67',
  },
  bottomButtonRow: {
    flexDirection:    'row',
    justifyContent:   'space-between',
    paddingHorizontal:20,
  },
  actionButtonWrapper: {
    width:        '47%',
    borderRadius: 999,
    overflow:     'hidden',
  },
  actionGradient: {
    height:         74,
    justifyContent: 'center',
    alignItems:     'center',
    borderRadius:   999,
  },
  actionButtonText: {
    fontSize:   18,
    fontWeight: '700',
    color:      '#FFFFFF',
  },
  nextButtonContent: {
    flexDirection: 'row',
    alignItems:    'center',
  },
});