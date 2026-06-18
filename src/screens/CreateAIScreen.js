import React, { useState, useEffect } from 'react';
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
  Alert,
  ActivityIndicator,
} from 'react-native';

import { launchImageLibrary } from 'react-native-image-picker';
import ImageResizer     from 'react-native-image-resizer';
import Voice            from '@react-native-voice/voice';

const { width, height } = Dimensions.get('window');
export const BASE_URL = 'https://deffovibeo.duckdns.org';

const creationTypes = [
  {
    id: 1,
    title: 'Image',
    subtitle: 'Realistic or artistic visuals',
    icon: require('../assets/gallery_2.png'),
    iconColor: '#4338FF',
    backgroundColor: '#DCD7F3',
    apiEndpoint: '/ai/image',
  },
  {
    id: 2,
    title: 'Video',
    subtitle: 'Cinematic motion clips',
    icon: require('../assets/video_2.png'),
    iconColor: '#19A8C7',
    backgroundColor: '#A7D7E4',
    apiEndpoint: '/ai/video',
  },
  {
    id: 3,
    title: 'Caption',
    subtitle: 'Engaging social media copy',
    icon: require('../assets/caption.png'),
    iconColor: '#8A3A00',
    backgroundColor: '#D7C8D8',
    apiEndpoint: '/ai/caption',
  },
  {
    id: 4,
    title: 'Advertisement',
    subtitle: 'Conversion optimized ads',
    icon: require('../assets/advertisement.png'),
    iconColor: '#A09300',
    backgroundColor: '#EEE6B7',
    apiEndpoint: '/ai/advertisement',
  },
];

const CreateAIScreen = ({ navigation }) => {
  const [selectedType,  setSelectedType]  = useState(1);
  const [loading,       setLoading]       = useState(false);
  const [prompt,        setPrompt]        = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isListening,   setIsListening]   = useState(false);

  // ─── Voice setup ─────────────────────────────────────────────
  useEffect(() => {
    Voice.onSpeechResults = event => {
      if (event.value && event.value.length > 0) {
        setPrompt(event.value[0]);
        setIsListening(false);
      }
    };
    Voice.onSpeechError = () => setIsListening(false);
    return () => { Voice.destroy().then(Voice.removeAllListeners); };
  }, []);

  // ─── Render type card ─────────────────────────────────────────
  const renderCard = item => {
    const active = selectedType === item.id;
    return (
      <TouchableOpacity
        key={item.id}
        activeOpacity={0.9}
        style={[styles.card, active && styles.activeCard]}
        onPress={() => setSelectedType(item.id)}>
        <View style={[styles.iconContainer, { backgroundColor: item.backgroundColor }]}>
          <Image source={item.icon} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
        </View>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
      </TouchableOpacity>
    );
  };

  // ─── Image picker ─────────────────────────────────────────────
  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, async response => {
      if (response.didCancel) return;
      const asset = response.assets?.[0];
      if (!asset?.uri) return;

      try {
        const resized = await ImageResizer.createResizedImage(
          asset.uri,
          1080,
          1080,
          'JPEG',
          80,
          0,
        );
        setSelectedImage({ ...asset, uri: resized.uri });
      } catch {
        setSelectedImage(asset);
      }
    });
  };

  // ─── Voice input ──────────────────────────────────────────────
  const startVoiceInput = async () => {
    try {
      setIsListening(true);
      await Voice.start('en-US');
    } catch (error) {
      setIsListening(false);
      Alert.alert('Voice Error', 'Could not start voice input. Please try again.');
    }
  };

  // ─── Enhance prompt ───────────────────────────────────────────
  const enhancePrompt = async () => {
    if (!prompt.trim()) {
      Alert.alert('Empty Prompt', 'Please type something first to enhance.');
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/ai/enhance-prompt`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (data?.enhancedPrompt) {
        setPrompt(data.enhancedPrompt);
      } else {
        Alert.alert('Error', 'Could not enhance prompt. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to enhance prompt.');
    } finally {
      setLoading(false);
    }
  };

  // ─── Main generate handler ────────────────────────────────────
  const handleGenerate = async () => {
    if (!prompt.trim() && !selectedImage) {
      Alert.alert('Missing Input', 'Please enter a prompt or add an image.');
      return;
    }

    setLoading(true);

    try {
      const selectedTypeData = creationTypes.find(t => t.id === selectedType);

      // ── CAPTION type ─────────────────────────────────────────
      if (selectedType === 3) {

        let captionData;

        if (selectedImage) {
          const formData = new FormData();
          formData.append('image', {
            uri:  selectedImage.uri,
            name: `caption_${Date.now()}.jpg`,
            type: selectedImage.type ?? 'image/jpeg',
          });
          if (prompt.trim()) formData.append('prompt', prompt);

          const captionRes = await fetch(`${BASE_URL}/ai/caption-from-image`, {
            method:  'POST',
            headers: {},
            body: formData,
          });
          captionData = await captionRes.json();
        } else {
          const captionRes = await fetch(`${BASE_URL}/ai/caption`, {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ prompt }),
          });
          captionData = await captionRes.json();
        }

        if (!captionData?.caption) {
          throw new Error('Invalid caption response from server.');
        }

        const hashtagRes = await fetch(`${BASE_URL}/ai/hashtags`, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({
            prompt: prompt.trim() || captionData.caption,
          }),
        });
        const hashtagData = await hashtagRes.json();

        if (!hashtagData?.hashtags) {
          throw new Error('Invalid hashtag response from server.');
        }

        navigation.navigate('AIResultScreen', {
          type:     'Caption',
          aiImage:  selectedImage?.uri,
          caption:  captionData.caption,
          hashtags: hashtagData.hashtags,
        });

        return;
      }

      // ── Image / Video / Advertisement types ──────────────────
      const response = await fetch(`${BASE_URL}${selectedTypeData.apiEndpoint}`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          prompt,
          ...(selectedImage && { imageUri: selectedImage.uri }),
        }),
      });

      const data = await response.json();

      if (!data) throw new Error('Empty response from server.');

      navigation.navigate('AIResultScreen', {
        type:    selectedTypeData.title,
        aiImage: selectedImage?.uri,
        result:  data,
      });

    } catch (error) {
      Alert.alert('Generation Failed', error.message || 'AI generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ─── UI ───────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FDBB67" barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <Image
            source={require('../assets/generate.png')}
            style={{ height: 24, width: 24, resizeMode: 'contain' }}
          />
          <Text style={styles.headerTitle}>Create with AI</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>

        <Text style={styles.sectionTitle}>Selection Type</Text>

        <View style={styles.gridContainer}>
          {creationTypes.map(renderCard)}
        </View>

        {/* SELECTED IMAGE PREVIEW */}
        {selectedImage && (
          <View style={styles.imagePreviewContainer}>
            <Image
              source={{ uri: selectedImage.uri }}
              style={styles.imagePreview}
            />
            <TouchableOpacity
              style={styles.removeImageButton}
              onPress={() => setSelectedImage(null)}>
              <Text style={styles.removeImageText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* hint when Caption type is selected and image is attached */}
        {selectedType === 3 && selectedImage && (
          <Text style={styles.hintText}>
            📷 Caption will be generated from your image
          </Text>
        )}

        {/* PROMPT BOX */}
        <View style={styles.promptContainer}>
          <TextInput
            placeholder={
              selectedType === 3 && selectedImage
                ? 'Optional: add extra context for the caption...'
                : 'Describe what you want to create...'
            }
            placeholderTextColor="#111"
            multiline
            value={prompt}
            onChangeText={setPrompt}
            style={styles.promptInput}
            textAlignVertical="top"
            editable={!loading}
          />

          <View style={styles.promptActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={pickImage}
              disabled={loading}>
              <Image
                source={require('../assets/add.png')}
                style={{ height: 40, width: 40, resizeMode: 'contain' }}
              />
            </TouchableOpacity>

            <View style={styles.rightActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={enhancePrompt}
                disabled={loading}>
                <Image
                  source={require('../assets/magic-staff.png')}
                  style={{ height: 40, width: 40, resizeMode: 'contain' }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, isListening && styles.actionButtonActive]}
                onPress={startVoiceInput}
                disabled={loading || isListening}>
                <Image
                  source={require('../assets/mic_2.png')}
                  style={{ height: 40, width: 40, resizeMode: 'contain' }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {isListening && (
            <Text style={styles.listeningText}>🎙 Listening...</Text>
          )}
        </View>

        {/* GENERATE BUTTON */}
        <TouchableOpacity
          onPress={handleGenerate}
          activeOpacity={0.9}
          disabled={loading}
          style={[styles.generateButton, loading && styles.generateButtonDisabled]}>
          {loading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <Image
              source={require('../assets/generate.png')}
              style={{ height: 24, width: 24, resizeMode: 'contain' }}
            />
          )}
          <Text style={styles.generateText}>
            {loading ? 'Generating...' : 'Generate'}
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateAIScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F5F5' },

  headerContainer: {
    width: '100%',
    height: height * 0.13,
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    backgroundColor: '#FDBB67',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
    overflow: 'hidden',
  },

  headerContent: { flexDirection: 'row', alignItems: 'center' },
  headerTitle: { fontSize: 18, color: '#000', fontWeight: '700', marginLeft: 8 },
  scrollContent: { paddingHorizontal: 14, paddingTop: 14, paddingBottom: 120 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#111', marginBottom: 14 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },

  card: {
    width: (width - 42) / 2,
    backgroundColor: '#FCE9CC',
    borderRadius: 20,
    padding: 14,
    marginBottom: 14,
  },
  activeCard: { borderWidth: 2, borderColor: '#FDBB67' },

  iconContainer: {
    width: 56, height: 56, borderRadius: 18,
    justifyContent: 'center', alignItems: 'center', marginBottom: 14,
  },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#111' },
  cardSubtitle: { fontSize: 12, color: '#555', marginTop: 4 },

  imagePreviewContainer: { marginTop: 14, borderRadius: 16, overflow: 'hidden', position: 'relative' },
  imagePreview: { width: '100%', height: 180, borderRadius: 16, resizeMode: 'cover' },
  removeImageButton: {
    position: 'absolute', top: 8, right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 28, height: 28, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center',
  },
  removeImageText: { color: '#FFF', fontSize: 14, fontWeight: '700' },

  hintText: {
    fontSize: 13, color: '#FDBB67', fontWeight: '600',
    marginTop: 10, marginLeft: 4,
  },

  promptContainer: {
    backgroundColor: '#FFF', borderRadius: 22,
    minHeight: 180, marginTop: 18, padding: 18, elevation: 3,
  },
  promptInput: { fontSize: 16, color: '#111', minHeight: 100 },
  promptActions: {
    marginTop: 18, flexDirection: 'row',
    justifyContent: 'space-between', alignItems: 'center',
  },
  rightActions: { flexDirection: 'row' },
  actionButton: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: '#FFF', justifyContent: 'center',
    alignItems: 'center', elevation: 3, marginLeft: 10,
  },
  actionButtonActive: { backgroundColor: '#FFF3E0', borderWidth: 1.5, borderColor: '#FDBB67' },
  listeningText: { marginTop: 10, fontSize: 13, color: '#FDBB67', fontWeight: '600' },

  generateButton: {
    width: '92%', height: 56, borderRadius: 16,
    alignSelf: 'center', marginTop: 24,
    justifyContent: 'center', alignItems: 'center', flexDirection: 'row',
    backgroundColor: '#FDBB67',
  },
  generateButtonDisabled: { opacity: 0.7 },
  generateText: { fontSize: 16, fontWeight: '700', color: '#000', marginLeft: 8 },
});