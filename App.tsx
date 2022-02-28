/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useRef} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Animated,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const ROW_HEIGHT = 60;
const INACTIVE_ROW_HEIGHT = 40;

const MinItem = ({index, y, item}: any) => {
  const translateY = y;

  return (
    <Animated.View
      style={[
        styles.inActiveRowContainer,
        {
          transform: [
            {
              scale: translateY.interpolate({
                inputRange: [
                  INACTIVE_ROW_HEIGHT * (index - 5) - 20,
                  INACTIVE_ROW_HEIGHT * (index - 4) - 20,
                  INACTIVE_ROW_HEIGHT * (index - 3) - 20,
                  INACTIVE_ROW_HEIGHT * (index - 2) - 20,
                  INACTIVE_ROW_HEIGHT * (index - 1) - 20,
                  INACTIVE_ROW_HEIGHT * (index - 0) - 20,
                  INACTIVE_ROW_HEIGHT * (index + 1) - 20,
                ],
                outputRange: [1, 1, 1, 2, 1, 1, 1],
              }),
            },
          ],
        },
      ]}>
      <Text style={styles.inActiveRowText}>
        {item.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
      </Text>
    </Animated.View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const selectedItem = useRef(0);

  const hourData = Array.from({length: 24}, (_, i) => i + 1);
  const minData = Array.from({length: 60}, (_, i) => i).filter(
    x => x % 5 === 0,
  );

  const yForHour = new Animated.Value(0);
  const onScrollForHour = Animated.event(
    [{nativeEvent: {contentOffset: {y: yForHour}}}],
    {
      useNativeDriver: true,
    },
  );

  const yForMin = new Animated.Value(0);
  const onScrollForMin = Animated.event(
    [{nativeEvent: {contentOffset: {y: yForMin}}}],
    {
      useNativeDriver: true,
    },
  );

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View style={styles.container}>
        <View style={styles.highlightArea} />

        <View style={styles.hourPicker}>
          <Animated.FlatList
            removeClippedSubviews
            showsVerticalScrollIndicator={false}
            data={[...new Array(5)].reduce(x => [...x, ...hourData], [])}
            scrollEventThrottle={16}
            renderItem={({index, item}) => (
              <MinItem
                index={index}
                item={item}
                y={yForHour}
                hourRef={selectedItem}
              />
            )}
            onScroll={onScrollForHour}
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
          <Animated.FlatList
            removeClippedSubviews
            showsVerticalScrollIndicator={false}
            data={[...new Array(20)].reduce(x => [...x, ...minData], [])}
            scrollEventThrottle={16}
            renderItem={({index, item}) => (
              <MinItem
                index={index}
                item={item}
                y={yForMin}
                hourRef={selectedItem}
              />
            )}
            onScroll={onScrollForMin}
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
    height: ROW_HEIGHT,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeRowText: {
    fontSize: 30,
    color: 'white',
  },
  inActiveRowContainer: {
    height: INACTIVE_ROW_HEIGHT,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inActiveRowText: {
    color: 'white',
  },
});

export default App;
