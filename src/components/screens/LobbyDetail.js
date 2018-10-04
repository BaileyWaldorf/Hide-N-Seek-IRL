import React from 'react';
import { Text, View, Image, Linking } from 'react-native';
import Card from './card';
import CardSection from './cardSection';
import Button from './ButtonJoinGame';
import ButtonInfo from './ButtonInfo'

const LobbyDetail = ({ lobbys }) => {
  const { title, artist, thumbnail_image, image, url } = lobbys;
  const {
    thumbnailStyle,
    headContentStyle,
    thumbnailContainerStyle,
    headerTextStyle,
    imageStyle
  } = styles;
  return (
    <Card>
      <CardSection>
        <View style={thumbnailContainerStyle}>
          <Image
            style={thumbnailStyle}
            source={{ uri: thumbnail_image }}
          />
        </View>
        <View style={headContentStyle}>
          <Text style={headerTextStyle}>{title}</Text>
          <Text>{artist}</Text>
        </View>
      </CardSection>

      <CardSection>
        <Button onPress={() => Linking.openURL(url)}>
          Join Game
        </Button>
      </CardSection>
    </Card>
  );
};

const styles = {
  headContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  }
};

export default LobbyDetail;
