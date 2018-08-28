import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class AddScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Add</Text>
      </View>
    );
  }
}

class ArchiveScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Archive</Text>
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home</Text>
      </View>
    );
  }
}

class AccountScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Account</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings</Text>
      </View>
    );
  }
}

export default createBottomTabNavigator(
  {
    Add: AddScreen,
    Archive: ArchiveScreen,
    "My Packages": HomeScreen,
    Account: AccountScreen,
    Settings: SettingsScreen,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Add') {
          iconName = `ios-add-circle${focused ? '' : '-outline'}`;
          return <Ionicon name={iconName} size={25} color={tintColor} />;
        } else if (routeName === 'Archive') {
          iconName = `ios-archive${focused ? '' : '-outline'}`;
          return <Ionicon name={iconName} size={25} color={tintColor} />;
        } else if (routeName === 'My Packages') {
          iconName = `package-variant${focused ? '' : '-closed'}`;
          return <Icon name={iconName} size={25} color={tintColor} />;
        } else if (routeName === 'Account') {
          iconName = `ios-contact${focused ? '' : '-outline'}`;
          return <Ionicon name={iconName} size={25} color={tintColor} />;
        } else if (routeName === 'Settings') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
          return <Ionicon name={iconName} size={25} color={tintColor} />;
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);
