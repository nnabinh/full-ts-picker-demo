/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import SmoothPicker from 'react-native-smooth-picker';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [hour, setHour] = useState(8);
  const [minute, setMinute] = useState(0);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View style={styles.container}>
        <View style={styles.highlightArea} />

        <View style={styles.hourPicker}>
          <SmoothPicker
            offsetSelection={0}
            initialScrollToIndex={7}
            magnet
            activeOpacityButton={0.5}
            scrollAnimation
            showsVerticalScrollIndicator={false}
            data={Array.from({length: 24}, (_, i) => i + 1)}
            onSelected={({item}) => setHour(item)}
            renderItem={({item}) =>
              item === hour ? (
                <View style={styles.activeRowContainer}>
                  <Text style={styles.activeRowText}>
                    {item.toLocaleString('en-US', {
                      minimumIntegerDigits: 2,
                      useGrouping: false,
                    })}
                  </Text>
                </View>
              ) : (
                <View style={styles.inActiveRowContainer}>
                  <Text style={styles.inActiveRowText}>
                    {item.toLocaleString('en-US', {
                      minimumIntegerDigits: 2,
                      useGrouping: false,
                    })}
                  </Text>
                </View>
              )
            }
          />
        </View>
        <View
          style={{
            height: 60,
            width: 60,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 30, color: 'white', marginBottom: 5}}>:</Text>
        </View>
        <View>
          <SmoothPicker
            offsetSelection={0}
            initialScrollToIndex={0}
            magnet
            scrollAnimation
            showsVerticalScrollIndicator={false}
            data={Array.from({length: 60}, (_, i) => i).filter(
              x => x % 5 === 0,
            )}
            onSelected={({item}) => setMinute(item)}
            renderItem={({item}) =>
              item === minute ? (
                <View
                  style={{
                    height: 60,
                    width: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 30, color: 'white'}}>
                    {item.toLocaleString('en-US', {
                      minimumIntegerDigits: 2,
                      useGrouping: false,
                    })}
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    height: 40,
                    width: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'white'}}>
                    {item.toLocaleString('en-US', {
                      minimumIntegerDigits: 2,
                      useGrouping: false,
                    })}
                  </Text>
                </View>
              )
            }
          />
        </View>
        <View
          style={{
            height: 60,
            width: 60,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 30, color: 'white'}}>
            {/* @TODO: Change to an image here */}
            {'<'}
          </Text>
        </View>
      </View>
      <View style={{marginTop: 20, flexDirection: 'row'}}>
        <Text style={{fontSize: 20}}>
          {hour} : {minute}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 240,
    width: '100%',
    overflow: 'hidden',
    backgroundColor: 'rgb(20,26,36)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightArea: {
    position: 'absolute',
    height: 55,
    width: '100%',
    borderTopWidth: 0.2,
    borderTopColor: 'white',
    borderBottomWidth: 0.2,
    borderBottomColor: 'white',
    opacity: 0.2,
  },
  hourPicker: {
    marginLeft: 30,
  },
  activeRowContainer: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeRowText: {
    fontSize: 30,
    color: 'white',
  },
  inActiveRowContainer: {
    height: 40,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inActiveRowText: {
    color: 'white',
  },
});

export default App;
