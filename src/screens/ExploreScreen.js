import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
  Image,
  Platform,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const {width, height} = Dimensions.get('window');

const imageSize = (width - 48) / 3;

const exploreData = [
  {
    id: '1',
    image: require('../assets/explore1.png'),
  },
  {
    id: '2',
    image: require('../assets/explore2.png'),
  },
  {
    id: '3',
    image: require('../assets/explore3.png'),
  },
  {
    id: '4',
    image: require('../assets/explore4.png'),
  },
  {
    id: '5',
    image: require('../assets/explore5.png'),
  },
  {
    id: '6',
    image: require('../assets/explore6.png'),
  },
  {
    id: '7',
    image: require('../assets/explore7.png'),
  },
  {
    id: '8',
    image: require('../assets/explore8.png'),
  },
  {
    id: '9',
    image: require('../assets/explore9.png'),
  },
  {
    id: '10',
    image: require('../assets/explore10.png'),
  },
  {
    id: '11',
    image: require('../assets/explore11.png'),
  },
  {
    id: '12',
    image: require('../assets/explore12.png'),
  },
  {
    id: '13',
    image: require('../assets/explore13.png'),
  },
  {
    id: '14',
    image: require('../assets/explore14.png'),
  },
  {
    id: '15',
    image: require('../assets/explore15.png'),
  },
   {
    id: '16',
    image: require('../assets/explore16.png'),
  },
   {
    id: '17',
    image: require('../assets/explore17.png'),
  },
   {
    id: '118',
    image: require('../assets/explore18.png'),
  },
];

const ExploreScreen = () => {
  const [search, setSearch] = useState('');

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.cardContainer}>

        <Image
          source={item.image}
          style={styles.gridImage}
          resizeMode="cover"
        />

      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor="#F3F4F6"
        barStyle="dark-content"
      />

      {/* Search Header */}
      <View style={styles.headerContainer}>

        <View style={styles.searchContainer}>

          <Feather
            name="search"
            size={24}
            color="#111111"
            style={styles.searchIcon}
          />

          <TextInput
            placeholder="Search with AI"
            placeholderTextColor="#111111"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />

        </View>

      </View>

      {/* Explore Grid */}
      <FlatList
        data={exploreData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
      />

      {/* Floating Bottom Navigation Mock */}
      <View style={styles.floatingNav}>

        <TouchableOpacity style={styles.navButton}>
          <Ionicons
            name="home-outline"
            size={28}
            color="#111111"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <Feather
            name="search"
            size={25}
            color="#111111"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.centerButton}>
          <Ionicons
            name="sparkles-outline"
            size={28}
            color="#111111"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <Feather
            name="send"
            size={24}
            color="#111111"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <Ionicons
            name="person-outline"
            size={27}
            color="#111111"
          />
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },

  headerContainer: {
    paddingTop: Platform.OS === 'android' ? 22 : 14,
    paddingHorizontal: 16,
    marginBottom: 24,
  },

  searchContainer: {
    width: '100%',
    height: 64,
    backgroundColor: '#EFDDF2',
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  searchIcon: {
    marginRight: 16,
  },

  searchInput: {
    flex: 1,
    fontSize: 18,
    color: '#111111',
    fontWeight: '500',
  },

  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 150,
  },

  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  cardContainer: {
    width: imageSize,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },

  gridImage: {
    width: '100%',
    height: imageSize * 1.38,
    borderRadius: 28,
  },

  floatingNav: {
    position: 'absolute',
    bottom: 26,
    alignSelf: 'center',

    width: width * 0.90,
    height: 74,

    backgroundColor: 'rgba(255,255,255,0.88)',

    borderRadius: 999,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 8,
  },

  navButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  centerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#A100C8',
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 6,

    marginTop: -26,
  },
});