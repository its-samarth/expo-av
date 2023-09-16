import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Video } from 'expo-av';
import { Button, Card, Title, Paragraph, IconButton } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

export default function App() {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(true); // Set dark mode as default

  const videoUrls = [
    {
      label: 'Big buck bunny.mp4',
      value: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    {
      label: 'Playlist.m3u8',
      value: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
    },
    {
      label: 'Oceans,mp4',
      value: 'http://vjs.zencdn.net/v/oceans.mp4',
    },
  ];

  const playVideo = async () => {
    if (videoRef.current) {
      await videoRef.current.playAsync();
    }
  };

  const pauseVideo = async () => {
    if (videoRef.current) {
      await videoRef.current.pauseAsync();
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <View style={[styles.container, darkMode && styles.containerDark]}>
      <Card style={[styles.card, darkMode && styles.cardDark]}>
        <Card.Content>
          <Title style={darkMode && styles.titleDark}>Expo AV Video Example</Title>
          <RNPickerSelect
            placeholder={{ label: 'Select a Video', value: null }}
            items={videoUrls.map((item) => ({
              label: item.label,
              value: item.value,
            }))}
            onValueChange={(value) => setSelectedVideoIndex(value)}
            value={selectedVideoIndex}
            style={{
              inputAndroid: styles.dropdownText,
              inputIOS: styles.dropdownText,
              iconContainer: styles.dropdownIcon,
            }}
            useNativeAndroidPickerStyle={false}
            Icon={() => {
              return <View style={styles.dropdownArrow} />;
            }}
          />
          {selectedVideoIndex !== null && (
            <Video
              ref={videoRef}
              style={styles.video}
              source={{ uri: selectedVideoIndex }}
              useNativeControls
              resizeMode="contain"
              onPlaybackStatusUpdate={(newStatus) => setStatus(() => newStatus)}
            />
          )}
          <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={playVideo}>
              Play
            </Button>
            <Button mode="contained" onPress={pauseVideo}>
              Pause
            </Button>
          </View>
          <Text style={[styles.status, darkMode && styles.statusDark]}>
            Status: {status.isPlaying ? 'Playing' : 'Paused'}
          </Text>
        </Card.Content>
        <IconButton
          icon={darkMode ? 'brightness-7' : 'brightness-3'}
          color="white"
          style={styles.darkModeToggle}
          onPress={toggleDarkMode}
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#222',
  },
  card: {
    width: '90%',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  cardDark: {
    backgroundColor: '#333',
  },
  titleDark: {
    color: 'white',
  },
  dropdownText: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fafafa',
  },
  dropdownIcon: {
    top: 10,
    right: 12,
  },
  dropdownArrow: {
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderTopColor: 'transparent',
    borderBottomWidth: 0,
    borderBottomColor: 'transparent',
    borderLeftWidth: 8,
    borderLeftColor: '#888',
  },
  video: {
    width: '100%',
    height: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  status: {
    marginTop: 10,
    textAlign: 'center',
  },
  statusDark: {
    color: 'white',
  },
  darkModeToggle: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});
