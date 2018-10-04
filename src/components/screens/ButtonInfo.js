import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const ButtonInfo = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#78E042',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#1B6172',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#78E042',
    marginLeft: 5,
    marginRight: 5

  }
};

export default ButtonInfo;
