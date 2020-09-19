import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav} from 'react-bootstrap';
import './index.css';
import Ingredients from './Ingredients.js';
class App extends React.Component {
    state = {
        showHome: true,
        showProgress: false,
        meanName: "Meal",
    }
    
    changeVisibility = (component) => {
        this.setState({
            showHome: false,
            showProgress: false,
            [component]: true
        })
    }

    render() {
        return (
            <div>
                <Navbar className="nav-bar" expand="lg">
                    <img alt="pic" style={{height: '30px', marginRight: '10px'}} src="https://i.pinimg.com/originals/3d/d8/59/3dd85997b6e689e417c99e3f008c5c03.png"/>
                    <Navbar.Brand style={{fontSize: '20px'}}>Katherine is Cool</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link onClick={() => this.changeVisibility('showHome')}>Home</Nav.Link>
                            <Nav.Link onClick={() => this.changeVisibility('showProgress')}>Daily Progress</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Ingredients showHome = {this.state.showHome} showProgress = {this.state.showProgress} />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);