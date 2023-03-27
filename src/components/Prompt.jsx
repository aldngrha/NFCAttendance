import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, {forwardRef, useEffect, useRef, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Prompt = (props, ref) => {
  const {onCancelPress} = props;
  const [_visible, _setVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (ref) {
      ref.current = {
        setVisible: _setVisible,
      };
    }
  }, [ref]);

  useEffect(() => {
    if (_visible) {
      setVisible(true);
      Animated.timing(animValue, {
        duration: 300,
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animValue, {
        duration: 300,
        toValue: 0,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
      });
    }
  }, [_visible, animValue]);

  const backDropAnimStyle = {
    opacity: animValue,
  };

  const promptAnimStyle = {
    transform: [
      {
        translateY: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [500, 0],
        }),
      },
    ],
  };

  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.content}>
        <Animated.View
          style={[styles.backdrop, StyleSheet.absoluteFill, backDropAnimStyle]}
        />
        <Animated.View style={[styles.prompt, promptAnimStyle]}>
          <Text style={styles.hint}>Ready to Scan</Text>
          <MaterialCommunityIcons
            name="nfc"
            size={40}
            style={{paddingBottom: 20}}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              _setVisible(false);
              onCancelPress();
            }}>
            <Text style={styles.text}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default forwardRef(Prompt);

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  prompt: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: Dimensions.get('window').width - 2 * 20,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hint: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    color: 'white',
  },
  btn: {
    backgroundColor: '#6C63FF',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
});
