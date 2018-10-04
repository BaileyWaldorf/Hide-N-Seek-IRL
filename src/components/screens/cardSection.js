import React from 'react';
import { View } from 'react-native';

const cardSection = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#80BCCB',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#1B6172',
    position: 'relative'
  }
};
export default cardSection;
