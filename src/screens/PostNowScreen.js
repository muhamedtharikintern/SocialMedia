import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
  Dimensions,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');

export default function PostNowScreen({navigation}) {
  const [selectedPrivacy, setSelectedPrivacy] = useState('Public');
  const [shareToggle, setShareToggle] = useState(false);

  const privacyOptions = [
    {
      id: 1,
      title: 'Public',
      icon: 'earth',
    },
    {
      id: 2,
      title: 'Followers',
      icon: 'people',
    },
    {
      id: 3,
      title: 'Private',
      icon: 'lock-closed',
    },
  ];

  const actionItems = [
    {
      id: 1,
      title: 'Tag People',
      icon: 'person-add',
    },
    {
      id: 2,
      title: 'Add Location',
      icon: 'location',
    },
    {
      id: 3,
      title: 'Add Music',
      icon: 'musical-notes',
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
        contentContainerStyle={styles.scrollContainer}>

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
            Post
          </Text>

          <View style={styles.headerSpacer} />

        </View>

        {/* IMAGE */}
        <Image
          source={require('../../assets/airesult.png')}
          style={styles.postImage}
          resizeMode="cover"
        />

        {/* CAPTIONS */}
        <Text style={styles.sectionTitle}>
          Captions & Hashtags
        </Text>

        <View style={styles.captionCard}>

          <Text style={styles.captionText}>
            “Bathing in sunlight and blooming{'\n'}
            like a sunflower.”
          </Text>

          <Text style={styles.hashtagText}>
            #AIArt   #Digitalcreativity   #CreateAI
          </Text>

          <Text style={styles.hashtagTextBottom}>
            #Cinematicvibes   #Futuredesign
          </Text>

        </View>

        {/* ACTION CARD */}
        <View style={styles.actionCard}>

          {actionItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              style={[
                styles.actionRow,
                index === actionItems.length - 1 && {
                  marginBottom: 0,
                },
              ]}>

              <View style={styles.actionLeft}>

                <LinearGradient
                  colors={['#E28AEF', '#A100C8']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.iconGradient}>

                  <Ionicons
                    name={item.icon}
                    size={30}
                    color="#FFFFFF"
                  />

                </LinearGradient>

                <Text style={styles.actionText}>
                  {item.title}
                </Text>

              </View>

              <Feather
                name="chevron-right"
                size={34}
                color="#111111"
              />

            </TouchableOpacity>
          ))}

        </View>

        {/* PRIVACY */}
        <Text style={styles.sectionTitle}>
          Who can see this
        </Text>

        <View style={styles.privacyContainer}>

          {privacyOptions.map(item => {
            const active = selectedPrivacy === item.title;

            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                onPress={() => setSelectedPrivacy(item.title)}
                style={[
                  styles.privacyButton,
                  active && styles.activePrivacyButton,
                ]}>

                <Ionicons
                  name={item.icon}
                  size={22}
                  color={active ? '#FFFFFF' : '#D46BDF'}
                />

                <Text
                  style={[
                    styles.privacyText,
                    active && styles.activePrivacyText,
                  ]}>

                  {item.title}

                </Text>

              </TouchableOpacity>
            );
          })}

        </View>

        {/* SHARE TO OTHER APPS */}
        <View style={styles.shareRow}>

          <View style={styles.shareLeft}>

            <Feather
              name="share-2"
              size={32}
              color="#111111"
            />

            <Text style={styles.shareText}>
              Share to other apps
            </Text>

          </View>

          <Switch
            value={shareToggle}
            onValueChange={setShareToggle}
            trackColor={{
              false: '#9E9E9E',
              true: '#A100C8',
            }}
            thumbColor="#FFFFFF"
          />

        </View>

        {/* POST BUTTON */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.postButtonWrapper}>

          <LinearGradient
            colors={['#A100C8', '#8A00B8']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.postButton}>

            <Text style={styles.postButtonText}>
              Post Now
            </Text>

          </LinearGradient>

        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },

  scrollContainer: {
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

  headerSpacer: {
    width: 64,
  },

  postImage: {
    width: width - 40,
    height: 380,

    alignSelf: 'center',

    borderRadius: 28,

    marginBottom: 32,
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
    paddingVertical: 36,

    marginBottom: 34,

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
    fontWeight: '600',

    lineHeight: 34,

    color: '#111111',

    textAlign: 'center',

    marginBottom: 28,
  },

  hashtagText: {
    fontSize: 16,
    fontWeight: '700',

    color: '#111111',

    textAlign: 'center',

    marginBottom: 20,
  },

  hashtagTextBottom: {
    fontSize: 16,
    fontWeight: '700',

    color: '#111111',

    textAlign: 'center',
  },

  actionCard: {
    marginHorizontal: 20,

    backgroundColor: '#FFFFFF',

    borderWidth: 2,
    borderColor: '#D46BDF',

    borderRadius: 30,

    paddingHorizontal: 24,
    paddingVertical: 28,

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

  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 36,
  },

  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconGradient: {
    width: 68,
    height: 68,
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 20,
  },

  actionText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111111',
  },

  privacyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingHorizontal: 20,

    marginBottom: 44,
  },

  privacyButton: {
    width: width / 3.7,
    height: 58,

    borderWidth: 2,
    borderColor: '#D46BDF',

    borderRadius: 18,

    backgroundColor: '#FFFFFF',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  activePrivacyButton: {
    backgroundColor: '#D46BDF',
  },

  privacyText: {
    fontSize: 16,
    fontWeight: '700',

    color: '#D46BDF',

    marginLeft: 8,
  },

  activePrivacyText: {
    color: '#FFFFFF',
  },

  shareRow: {
    paddingHorizontal: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 44,
  },

  shareLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  shareText: {
    fontSize: 20,
    fontWeight: '700',

    color: '#111111',

    marginLeft: 20,
  },

  postButtonWrapper: {
    paddingHorizontal: 20,
  },

  postButton: {
    height: 78,

    borderRadius: 999,

    justifyContent: 'center',
    alignItems: 'center',
  },

  postButtonText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});