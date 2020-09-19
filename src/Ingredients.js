import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button, Modal, Col, Row, Dropdown,DropdownButton} from 'react-bootstrap';
import './index.css';
import logo from './images/pinkx.png';
import Saves from './Saves.js';
import axios from 'axios';
import Visualization from './Visualization.js';

const EDAMAM_APP_ID = 'b920c5d8';
const EDAMAM_API_KEY = '8364899ccd14a7bd16f1302137461490';
const SPOON_API_KEY = 'b017b902012d497795bcd109af7486ea';

export class Ingredients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMeal: "Breakfast",
            items: [],
            amounts: [],
            currentItem: "",
            currentAmount: "",
            showItemsAdder: false, 
            showNutrition: false,
            showSaves: false,
            saves: [],
            recipe: {
                id: "",
                title: "",
                ingredients: [],
                image: "",
                instructions: [],
                time: "",
                servings: "",
            },
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
            <div>
                <Row noGutters={true}>
                    <Col md={5}>{this.state.items[i]}</Col>
                    <Col md={4}>{this.state.amounts[i]}</Col>
                    <Col md={3}>
                        <Button onClick={() => this.handleDeleteItem(i)} variant="link" style={{float: "right"}}>
                            <img alt="x" style={{width: '20px', height: '20px'}} src={logo}/>
                        </Button>
                    </Col>
                </Row>
                <hr/>
            </div>
            
        )
    }

    handleShowNutrition = async () => {
        let BASE_URL = `https://api.edamam.com/api/nutrition-details?app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_API_KEY}`;

        const { items, amounts, currentMeal, saves } = this.state;
        let ingr = [];
        for (let i = 0; i < items.length; i++) {
            ingr.push(`${amounts[i]} ${items[i]}`);
        }

        try {
            const res = await axios.post(BASE_URL, { title: currentMeal, ingr: ingr});
            await this.handleRecipeSearch();
            this.setState({
                saves: saves.concat({
                    title: currentMeal,
                    visual: <Visualization 
                                data = {{title: currentMeal, nutrients: res.data}}
                                recipe = {this.state.recipe}            
                            />
                }),
                items: [],
                amounts: [],
            });
        } catch (e) {
            console.error(e);
        }
        this.setState({showNutrition: true});
    }

    handleRecipeSearch = async () => {
        var ingreds = '';
        for (let i=0; i<this.state.items.length; i++){
            ingreds = ingreds + ',+' + this.state.items[i];
        }
        ingreds = ingreds.substring(2);

        const BASE_URL = 'https://api.spoonacular.com/recipes/findByIngredients?apiKey=' + SPOON_API_KEY + 
                                '&number=1&ingredients=' + ingreds;
        try {
            const res = await axios.get(BASE_URL);
            const vals = res.data[0];
            var recipeID = vals.id;
            this.setState(prevState => ({recipe:{
                ...prevState.recipe,
                title: vals.title,
                id: recipeID,
                image: vals.image,
            }}))
            await this.getIngredients(recipeID);
            await this.getInstructions(recipeID);
        } catch (e) {
            console.error(e);
        }                
    }

    getIngredients = async (id) => {
        const BASE_URL = 'https://api.spoonacular.com/recipes/' + id + '/information?includeNutrition=false&apiKey=' + SPOON_API_KEY;
        try {
            const res = await axios.get(BASE_URL);
            const vals = res.data.extendedIngredients;
            const amts = vals.map(x => x.original);
            this.setState(prevState => ({recipe: {
                ...prevState.recipe,
                ingredients: amts,
                time: res.data.readyInMinutes,
                servings: res.data.servings,
            }}))
        } catch (e) {
            console.error(e);
        }
    }
    
    getInstructions = async (id) => {
        const BASE_URL = 'https://api.spoonacular.com/recipes/' + id + '/analyzedInstructions?apiKey=' + SPOON_API_KEY;
        try {
            const res = await axios.get(BASE_URL);
            const vals = res.data[0].steps;
            const steps = vals.map(x => x.step);
            this.setState(prevState => ({recipe: {
                ...prevState.recipe,
                instructions: steps,
            }}))
        } catch (e) {
            console.error(e);
        }
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
                        <h3 style={{textAlign: 'center', padding: '10px'}}> September 20, 2020 </h3>
                        <div class = "row no-gutters">
                            <div class = "col-2">
                                <img style={{height: '20px', width: '20px'}} src = "https://img.webmd.com/dtmcms/live//webmd/consumer_assets/site_images/responsive/Mushroom.svg"/>
                            </div>
                            <div class = "col-2">
                                <img style={{height: '20px', width: '20px'}} src = "https://img.webmd.com/dtmcms/live//webmd/consumer_assets/site_images/responsive/Orange.svgG"/>
                            </div>
                            <div class = "col-2">
                                <img style={{height: '20px', width: '20px'}} src = "https://img.webmd.com/dtmcms/live//webmd/consumer_assets/site_images/responsive/Hamburger.svg"/>
                            </div>
                            <div class = "col-2">
                                <img style={{height: '20px', width: '20px'}} src = "https://img.webmd.com/dtmcms/live//webmd/consumer_assets/site_images/responsive/Cake.svg"/>
                            </div>
                        </div>
                        <div style={{textAlign: "center"}}>
                        <DropdownButton variant="info"id="dropdown-basic-button" title="Add Meal">
                            <Dropdown.Item href="#/action-1">Breakfast</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Lunch</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Dinner</Dropdown.Item>
                            <Dropdown.Item href="#/action-4">Snack</Dropdown.Item>
                            <Dropdown.Divider />
                            {/* <Dropdown.Item href="#/action-4">Other</Dropdown.Item> */}
                            <Form>
                                <Form.Group controlId="other">
                                    {/* <Form.Label>Email address</Form.Label> */}
                                    <Form.Control type="meal" placeholder="Other..." />
                                </Form.Group>
                            </Form>
                        </DropdownButton>
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
                                                <Button variant="outline-info" type="submit">Add Item</Button>
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
                    {this.state.showNutrition &&
                    <div>
                        <Modal 
                            size="lg" 
                            aria-labelledby="contained-modal-title-vcenter" 
                            centered 
                            show={this.state.showNutrition} 
                            onHide={() => this.setState({showNutrition: false, showItemsAdder: false, showSaves: true})}>
                            Nutrition Visualization
                            {this.state.saves[this.state.saves.length - 1].visual}
                        </Modal>
                    </div>
                    }
                </div>
                }

                {
                    this.state.showSaves && 
                    <div style={{textAlign: 'center', marginTop: '20px'}}>
                        <h6>Today's Meals</h6>
                        <Saves saves={this.state.saves}/>
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


