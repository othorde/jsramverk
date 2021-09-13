import React, {Component} from 'react';
import Home from "./components/Home";
import Form from "./components/Form";


// components


//styles
import { GlobalStyle } from './GlobalStyle';


class App extends Component { 
    render() {
        return (
            <div className="App">
            <Form/>
            <GlobalStyle/>
            </div>
            );
    }
}
export default App;

