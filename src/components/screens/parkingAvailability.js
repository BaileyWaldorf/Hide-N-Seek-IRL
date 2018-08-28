import React from "react";
import { FlatList, ActivityIndicator, Text, View, StyleSheet } from "react-native";

export default class Parking extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
               isLoading: true,
               garages: [],
          };
     }

     componentDidMount() {
          this.timer = setInterval(() => this.getGarageAvailability(), 3000)
     }

     getGarageAvailability = () => {
          fetch("https://www.parsehub.com/api/v2/projects/tVVbVEcKt95h/last_ready_run/data?api_key=thT2-TXpb3gU", {
               method: 'GET',
               headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
               },
          })
          .then(results => results.json())
          .then(data => {
               this.setState({garages: data.garageNames, isLoading: false});
          })
     }

     render() {
          if (this.state.isLoading) {
               return (
                    <View style={{ flex: 1, padding: 20 }}>
                         <ActivityIndicator />
                    </View>
               );
          }

          return (
               <View style={styles.container}>
                    <FlatList
                         data={this.state.garages}
                         renderItem={({item}) => <Text>{item.name} {item.spacesAvailable}{item.spacesTotal}</Text>}
                         keyExtractor={(item, index) => index.toString()}
                    />
               </View>
          );
     }
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
     },
     cardContainer: {
          padding: 10,
          width: 300,
          height: 60,
          overflow: "hidden",
          borderRadius: 5,
          backgroundColor: "steelblue",
          justifyContent: "center",
          margin: 10
     }
});
