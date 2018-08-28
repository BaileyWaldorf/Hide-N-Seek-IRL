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
<<<<<<< HEAD
          this.timer = setInterval(() => this.getGarageAvailability(), 3000)
     }

     getGarageAvailability = () => {
=======
          const interval = setInterval(
               fetch("https://www.parsehub.com/api/v2/projects/tVVbVEcKt95h/run", {
                    method: 'POST',
                    headers: {
                         Accept: 'application/json',
                         'Content-Type': 'application/json',
                    },
                    form: {
                         api_key: "thT2-TXpb3gU",
                         start_url: "http://secure.parking.ucf.edu/GarageCount/",
                         start_template: "main_template",
                         send_email: "1"
                    },
               }), 3000);

>>>>>>> 1d64a301e2bf5df74c6ac5b44c15371466ab0ef4
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
