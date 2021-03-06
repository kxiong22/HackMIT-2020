import React from 'react';
import {Accordion, Card, Button, Container, Row, Col} from 'react-bootstrap';
import { Doughnut, Line} from 'react-chartjs-2';

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
            labels: ['% daily value', '% remaining'],
            datasets: [{
                data: [nutrients.totalDaily.CHOCDF.quantity.toFixed(2), 100 - Math.min(nutrients.totalDaily.CHOCDF.quantity.toFixed(2),100)],
                backgroundColor: [
                    'rgba(150, 111, 214, 1)',
                    'rgba(249, 228, 183, 1)',
                ]
            }]
        }

        let fatData = {
            labels: ['% daily value', '% remaining'],
            datasets: [{
                data: [nutrients.totalDaily.FAT.quantity.toFixed(2), 100 - Math.min(nutrients.totalDaily.FAT.quantity.toFixed(2),100)],
                backgroundColor: [
                    'rgba(251,174,210,1)',
                    'rgba(249, 228, 183, 1)',
                ]
            }]
        }

        let proteinData = {
            labels: ['% daily value', '% remaining'],
            datasets: [{
                data: [nutrients.totalDaily.PROCNT.quantity.toFixed(2), 100 - Math.min(nutrients.totalDaily.PROCNT.quantity.toFixed(2),100)],
                backgroundColor: [
                    'rgba(144,238,144,1)',
                    'rgba(249, 228, 183, 1)',
                ]
            }]
        }

        let sodiumData = {
            labels: ['% daily value', '% remaining'],
            datasets: [{
                data: [nutrients.totalDaily.NA.quantity.toFixed(2), 100 - Math.min(nutrients.totalDaily.NA.quantity.toFixed(2),100)],
                backgroundColor: [
                    'rgba(128,206,225,1)',
                    'rgba(249, 228, 183, 1)',
                ]
            }]
        }

        let sugarData = {
            labels: ['% daily value', '% remaining'],
            datasets: [{
                data: [((nutrients.totalNutrients.SUGAR.quantity/30)*100).toFixed(2), 100 - Math.min(((nutrients.totalNutrients.SUGAR.quantity/30)*100).toFixed(2),100)],
                backgroundColor: [
                    'rgba(245,189,31,1)',
                    'rgba(249, 228, 183, 1)',
                ]
            }]
        }

        let calorieData = {
            labels: ['% daily value', '% remaining'],
            datasets: [{
                data: [nutrients.calories/20, 100 - Math.min(nutrients.calories/20,100)],
                backgroundColor: [
                    'rgba(234,60,83,1)',
                    'rgba(249, 228, 183, 1)',
                ]
            }]
        }

        let ingreds = "Foods: ";
        for(let i=0; i<nutrients.ingredients.length-1; i++) {
            ingreds += nutrients.ingredients[i].text + ", ";
        }
        let i=nutrients.ingredients.length-1;
        ingreds += nutrients.ingredients[i].text;

        let vitaminData = {
            labels: ['Vitamin A', 'Vitamin B1', 'Vitamin C', 'Vitamin E', 'Vitamin K'],
                datasets: [{
                    data: [nutrients.totalNutrients.VITA_RAE.quantity.toFixed(2),nutrients.totalNutrients.THIA.quantity.toFixed(2),nutrients.totalNutrients.VITC.quantity.toFixed(2),nutrients.totalNutrients.TOCPHA.quantity.toFixed(2),nutrients.totalNutrients.VITK1.quantity.toFixed(2)],
                    label: 'Actual Amount',
                    borderColor: [
                        'rgba(255,36,0,1)',
                    ],
                    backgroundColor: [
                        'rgba(0,0,0,0)',
                    ],
                    pointBackgroundColor: [
                        'rgba(255,36,0,1)','rgba(255,36,0,1)','rgba(255,36,0,1)','rgba(255,36,0,1)','rgba(255,36,0,1)',
                    ],
                    pointBorderColor: [
                        'rgba(255,36,0,1)','rgba(255,36,0,1)','rgba(255,36,0,1)','rgba(255,36,0,1)','rgba(255,36,0,1)',
                    ],
                    pointRadius: 5
                },
                {
                    data: [.8, 1, 80, 15, .13],
                    label: 'Recommended Amount',
                    borderColor: [
                        'rgba(0,183,235)',
                    ],
                    backgroundColor: [
                        'rgba(0,0,0,0)',
                    ],
                    pointBackgroundColor: [
                        'rgba(0,183,235)','rgba(0,183,235)','rgba(0,183,235)','rgba(0,183,235)','rgba(0,183,235)',
                    ],
                    pointBorderColor: [
                        'rgba(0,183,235)','rgba(0,183,235)','rgba(0,183,235)','rgba(0,183,235)','rgba(0,183,235)',
                    ],
                    pointRadius: 5
                }]
        }


        return (
            <div>
                <h3 style={{textAlign: 'center', marginTop: '20px'}}>Nutrition Summary: {this.props.data.title}</h3>
                <div style={{textAlign: 'center', marginBottom: '20px',fontSize: '18px'}}>{ingreds}</div>
                <Container>
                    <Row>
                        <Col style={{textAlign: 'center'}}>
                            <div style={{textAlign: 'center'}}>Calories: {nutrients.calories}</div>
                            <Doughnut data={calorieData}  options={{legend: {display: false}}}/>
                        </Col>
                        <Col style={{textAlign: 'center'}}>
                            <div>Carbohydrates: {nutrients.totalNutrients.CHOCDF.quantity.toFixed(2)} {nutrients.totalNutrients.CHOCDF.unit}</div>
                            <Doughnut data={carbohydrateData} options={{legend: {display: false}}}/>
                        </Col>
                        <Col style={{textAlign: 'center'}}>
                            <div>Fats: {nutrients.totalNutrients.FAT.quantity.toFixed(2)} {nutrients.totalNutrients.FAT.unit}</div>
                            <Doughnut data={fatData}  options={{legend: {display: false}}}/>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col style={{textAlign: 'center'}}>
                            <div>Protein: {nutrients.totalNutrients.PROCNT.quantity.toFixed(2)} {nutrients.totalNutrients.PROCNT.unit}</div>
                            <Doughnut data={proteinData} options={{legend: {display: false}}}/>
                        </Col>
                        <Col style={{textAlign: 'center'}}>
                            <div>Sodium: {nutrients.totalNutrients.NA.quantity.toFixed(2)} {nutrients.totalNutrients.NA.unit}</div>
                            <Doughnut data={sodiumData}  options={{legend: {display: false}}}/>
                        </Col>
                        <Col style={{textAlign: 'center'}}>
                            <div>Sugars: {nutrients.totalNutrients.SUGAR.quantity.toFixed(2)} {nutrients.totalNutrients.SUGAR.unit}</div>
                            <Doughnut data={sugarData}  options={{legend: {display: false}}}/>
                        </Col>
                    </Row>
                    <div style={{textAlign: 'center',marginTop: '20px',fontSize: '18px'}}>Vitamin Content</div>
                    <Row>
                        <Line data={vitaminData} options={
                        {
                            scales: {
                                yAxes: [{
                                    display: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Amount (milligrams)',
                                    },
                                }],
                            }                            
                        }
                        }
                        />
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
