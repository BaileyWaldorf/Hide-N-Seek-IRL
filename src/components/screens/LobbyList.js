import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';
import LobbyDetail from './LobbyDetail';

class LobbyList extends Component {
  state = { lobbys: [] };

  componentWillMount() {
    axios.get('https://gist.githubusercontent.com/jonathoni4/2a5824211147f580ef9044390a5a9670/raw/4129dfad0b2bf107c0651f385cd10d24cf89fd16/lobby')
      .then(response => this.setState({ lobbys: response.data }));
  }

  renderlobbys() {
    return this.state.lobbys.map(lobby =>
      <LobbyDetail key={lobby.title} lobbys={lobby}/>
    );
  }

  render() {

    return (
      <ScrollView>
        {this.renderlobbys()}
      </ScrollView>
    );
  }
}

export default LobbyList;
