import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button, Modal, Col} from 'react-bootstrap';
import './index.css';
import logo from './images/pinkx.png';


export class Ingredients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMeal: "Meal",
            items: [],
            amounts: [],
            currentItem: "",
            currentAmount: "",
            showItemsAdder: false, 
            showNutrition: false,
            showSaves: false,
            saves: [],
        }
    }

    handleAddItem = (event) => {
        event.preventDefault();
        this.setState({
            items: this.state.items.concat(this.state.currentItem),
            amounts: this.state.amounts.concat(this.state.currentAmount)
        });
        this.refs.form.reset();
    }

    handleDeleteItem = (i) => {
        let itemsCopy = [...this.state.items];
        itemsCopy.splice(i, 1);
        this.setState({items: itemsCopy});
    }

    renderItem = (i) => {
        return (
            <div style = {{height: '60px'}} key={this.state.items[i]}>
                <span>{this.state.items[i]}</span>
                <span style = {{marginLeft: '180px'}}>
                    {this.state.amounts[i]}
                 </span>
                 <span style = {{float: 'right'}}>
                    <Button onClick={() => this.handleDeleteItem(i)} variant="link">
                        <img alt="x" style={{width: '20px', height: '20px'}} src={logo}/>
                    </Button>
                </span>
                <hr/>
            </div>
        )
    }

    handleShowNutrition = () => {
        this.setState({showNutrition: true, saves: this.state.saves.concat(this.state.currentMeal)});
    }

    render() {
        const listItems = [];
        for(let i=0; i<this.state.items.length; i++){
            listItems.push(this.renderItem(i));
        }
        return (
            <div>
                { this.props.showHome && 
                <div>
                    <div style = {{paddingTop: '30px'}}>
                        <h3 style={{textAlign: 'center', margin: '10px'}}> September 20, 2020 </h3>
                        <div style={{textAlign: "center"}}>
                            <label>
                                New Meal: <input type="text" value={this.state.currentMeal} onChange={(event) => this.setState({currentMeal: event.target.value})} />
                            </label>
                            <Button style={{margin: '10px'}} variant="outline-info" type="submit" onClick={() => this.setState({showItemsAdder: true})}>Go!</Button>
                        </div>

                        { this.state.showItemsAdder && 
                        <div>
                            <div className="items-container">
                                <div style={{padding: '10px'}}>{listItems}</div>
                                <div>
                                    <Form ref="form" onSubmit={this.handleAddItem}>
                                        <Form.Row>
                                            <Col md={5}>
                                                <Form.Control 
                                                    ref="newitem"
                                                    type="text" 
                                                    placeholder="Food Item..."
                                                    onChange={() => {this.setState({currentItem: this.refs.newitem.value});}}
                                                />
                                            </Col>
                                            <Col md={4}>
                                                <Form.Control 
                                                    ref="newamount"
                                                    type="text" 
                                                    placeholder="Quantity..."
                                                    onChange={() => {this.setState({currentAmount: this.refs.newamount.value});}}
                                                />
                                            </Col>
                                            <Col md={3}>
                                                <Button variant="outline-info" type="submit">Add Item!</Button>
                                            </Col>
                                        </Form.Row>
                                    </Form>
                                </div>
                            </div>

                            <div className="analyze-nutrients-button-container">
                                <Button className="analyze-nutrients-button" onClick={() => this.handleShowNutrition()} variant="light">Analyze My Nutrition!</Button>
                            </div>
                        </div>
                        }
                    </div>

                    <div>
                        <Modal 
                            size="lg" 
                            aria-labelledby="contained-modal-title-vcenter" 
                            centered 
                            show={this.state.showNutrition} 
                            onHide={() => this.setState({showNutrition: false, showItemsAdder: false, showSaves: true})}>
                            Nutrition Visualization
                        </Modal>
                    </div>
                </div>
                }

                {
                    this.state.showSaves && 
                    <div>
                        {this.state.saves}
                    </div>
                }

                {
                    this.props.showProgress &&
                    <div>
                        Daily Progress
                    </div>
                }
            </div>
        )
    }
}

export default Ingredients


