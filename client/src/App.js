import React, { Component } from 'react'


class App extends Component {
state = {
    data: null
  };
  render() {
    return (
      <div className="App">
        <div>I'M READY TO USE THE BACK END APIS! :-)</div>
        <p></p>
        // Render the newly fetched data inside of this.state.data 
        <p className="App-intro">{this.state.data}</p>
      </div>
    );
  }
}

export default App;