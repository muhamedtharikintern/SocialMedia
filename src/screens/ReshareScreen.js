import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';


const {width} = Dimensions.get('window');

const GRID_SPACING = 6;
const IMAGE_SIZE = (width - 24) / 3;

export default function ReshareScreen() {
  const [activeTab, setActiveTab] = useState('reshare');

  const posts = [
    require('../assets/post_1.png'),
    require('../assets/post_2.png'),
    require('../assets/post_3.png'),
    require('../assets/post_4.png'),
    require('../assets/post_5.png'),
    require('../assets/post_6.png'),
    require('../assets/post_7.png'),
    require('../assets/post_8.png'),
    require('../assets/post_9.png'),
    require('../assets/post_10.png'),
    require('../assets/post_11.png'),
    require('../assets/post_12.png'),
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>

        {/* POSTS GRID */}
        <View style={styles.gridWrapper}>
          {posts.map((item, index) => (
            <Image
              key={index}
              source={item}
              style={styles.gridImage}
            />
          ))}
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

  scrollContainer: {
    paddingTop: Platform.OS === 'android' ? 22 : 14,
    paddingBottom: 140,
  },

  gridWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: GRID_SPACING / 2,
  },

  gridImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE * 1.28,
    borderRadius: 24,
    margin: GRID_SPACING / 2,
    resizeMode: 'cover',
  },
});