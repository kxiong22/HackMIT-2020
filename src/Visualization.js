import React from 'react';
import {Accordion, Card, Button, Container, Row, Col} from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';

export class Visualization extends React.Component {    
    render() {
        const {ingredients, instructions, title, image} = this.props.recipe;
        const {nutrients} = this.props.data;        

        let formattedIngreds = [];
        for (let i=0; i<ingredients.length; i++) {
            formattedIngreds.push(<li className="modal-words">{ingredients[i]}</li>);
        }
        let formattedInstructions = [];
        for (let i=0; i<instructions.length; i++) {
            formattedInstructions.push(<li className="modal-words">{instructions[i]}</li>);
        }

        let carbohydrateData = {
            labels: ['% daily value', 'remaining'],
            datasets: [{
                data: [nutrients.totalDaily.CHOCDF.quantity.toFixed(2), 100 - Math.min(nutrients.totalDaily.CHOCDF.quantity.toFixed(2))],
                backgroundColor: [
                    'rgba(150, 111, 214, 1)',
                    'rgba(249, 228, 183, 1)',
                ]
            }]
        }

        let fatData = {
            labels: ['% daily value', 'remaining'],
            datasets: [{
                data: [nutrients.totalDaily.FAT.quantity.toFixed(2), 100 - Math.min(nutrients.totalDaily.FAT.quantity.toFixed(2))],
                backgroundColor: [
                    'rgba(251,174,210,1)',
                    'rgba(249, 228, 183, 1)',
                ]
            }]
        }

        let proteinData = {
            labels: ['% daily value', 'remaining'],
            datasets: [{
                data: [nutrients.totalDaily.PROCNT.quantity.toFixed(2), 100 - Math.min(nutrients.totalDaily.PROCNT.quantity.toFixed(2))],
                backgroundColor: [
                    'rgba(144,238,144,1)',
                    'rgba(249, 228, 183, 1)',
                ]
            }]
        }

        let sodiumData = {
            labels: ['% daily value', 'remaining'],
            datasets: [{
                data: [nutrients.totalDaily.NA.quantity.toFixed(2), 100 - Math.min(nutrients.totalDaily.NA.quantity.toFixed(2))],
                backgroundColor: [
                    'rgba(128,206,225,1)',
                    'rgba(249, 228, 183, 1)',
                ]
            }]
        }

        let sugarData = {
            labels: ['% daily value', 'remaining'],
            datasets: [{
                data: [nutrients.totalNutrients.SUGAR.quantity.toFixed(2)/30, 100 - Math.min(nutrients.totalNutrients.SUGAR.quantity.toFixed(2))],
                backgroundColor: [
                    'rgba(245,189,31,1)',
                    'rgba(249, 228, 183, 1)',
                ]
            }]
        }

        let data = {
            labels: ['Red', 'Yellow', 'Blue'],
            datasets: [{
                data: [10, 20, 30],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
            }],
        }

        return (
            <div>
                <div>{this.props.data.title}</div>
                <div>Calories: {nutrients.calories}</div>
                <div>Carbohydrates: {nutrients.totalNutrients.CHOCDF.quantity.toFixed(2)} {nutrients.totalNutrients.CHOCDF.unit}</div>
                <div>Fats: {nutrients.totalNutrients.FAT.quantity.toFixed(2)} {nutrients.totalNutrients.FAT.unit} </div>
                <div>Protein: {nutrients.totalNutrients.PROCNT.quantity.toFixed(2)} {nutrients.totalNutrients.PROCNT.unit} </div>
                <div>Sodium: {nutrients.totalNutrients.NA.quantity.toFixed(2)} {nutrients.totalNutrients.NA.unit} </div>
                <div>Sugars: {nutrients.totalNutrients.SUGAR.quantity.toFixed(2)} {nutrients.totalNutrients.SUGAR.unit} </div>

                <Container>
                    <Row>
                        <Col>
                            <Doughnut data={carbohydrateData}/>
                        </Col>
                        <Col>
                            <Doughnut data={fatData}/>
                        </Col>
                        <Col>
                            <Doughnut data={proteinData}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Doughnut data={sodiumData}/>
                        </Col>
                        <Col>
                            <Doughnut data={sugarData}/>
                        </Col>
                    </Row>
                </Container>

                <Accordion>
                    <Card>
                        <Card.Header style={{textAlign: 'center'}}>
                        <Accordion.Toggle as={Button} variant="info" eventKey="0">
                            Suggested Recipe
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <div className="modal-title">{title}</div>
                                <div style={{textAlign: 'center'}}><img alt="pic" src={image}/></div>
                                <div className="modal-title">Ingredients</div>
                                <div><ul>{formattedIngreds}</ul></div>
                                <div className="modal-title">Instructions</div>
                                <div><ol>{formattedInstructions}</ol></div>  
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        )
    }
}

export default Visualization
