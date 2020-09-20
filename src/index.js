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
        showFarms: false,
    }
    
    changeVisibility = (component) => {
        this.setState({
            showHome: false,
            showProgress: false,
            showFarms: false,
            [component]: true
        })
    }

    render() {
        return (
            <div>
                <Navbar className="nav-bar" expand="lg">
                    <img alt="pic" style={{height: '50px', marginRight: '5px'}} src="https://static.thenounproject.com/png/2130454-200.png"/>
                    <Navbar.Brand style={{fontSize: '20px'}}>Katherine is cool</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link onClick={() => this.changeVisibility('showHome')}>Home</Nav.Link>
                            <Nav.Link onClick={() => this.changeVisibility('showProgress')}>Daily Progress</Nav.Link>
                            <Nav.Link onClick={() => this.changeVisibility('showFarms')}>Local Businesses</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Ingredients showHome = {this.state.showHome} showProgress = {this.state.showProgress} showFarms = {this.state.showFarms}/>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);