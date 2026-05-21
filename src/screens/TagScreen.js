import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';


const {width} = Dimensions.get('window');

export default function TagScreen() {
  const [activeTab, setActiveTab] = useState('tagged');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>

        {/* DIVIDER */}
        <View style={styles.divider} />

        {/* EMPTY TAG SECTION */}
        <View style={styles.emptyContainer}>

          <Text style={styles.emptyTitle}>
            Photos and videos of you
          </Text>

          <Text style={styles.emptyDescription}>
            When people tag you in photos and videos,
            they'll appear here.
          </Text>

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
    paddingTop: Platform.OS === 'android' ? 20 : 12,
    paddingBottom: 140,
  },

  divider: {
    height: 1,
    backgroundColor: '#D8D8D8',
  },

  emptyContainer: {
    paddingHorizontal: 34,
    paddingTop: 40,
  },

  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111111',
    textAlign: 'center',
    marginBottom: 26,
  },

  emptyDescription: {
    fontSize: 18,
    lineHeight: 28,
    color: '#111111',
    fontWeight: '500',
    textAlign: 'center',
  },
});