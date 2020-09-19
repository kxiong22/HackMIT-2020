import React from 'react';
import {Accordion, Card, Button} from 'react-bootstrap';

export class Visualization extends React.Component {    
    render() {
        const {ingredients, instructions, title, image} = this.props.recipe;
        const {nutrients} = this.props.data;
<<<<<<< HEAD
        console.log(nutrients);
        
=======

>>>>>>> 72fef1de6e876a35f322290c465948d7aa1b1a35
        var formattedIngreds = [];
        for (let i=0; i<ingredients.length; i++) {
            formattedIngreds.push(<li className="modal-words">{ingredients[i]}</li>);
        }
        var formattedInstructions = [];
        for (let i=0; i<instructions.length; i++) {
            formattedInstructions.push(<li className="modal-words">{instructions[i]}</li>);
        }
        return (
            <div>
                <div>{this.props.data.title}</div>
<<<<<<< HEAD
                <div>Calories: {nutrients.calories}</div>
                <div>Carbohydrates: {nutrients.totalNutrients.CHOCDF.quantity.toFixed(2)} {nutrients.totalNutrients.CHOCDF.unit}</div>
                <div>Fats: {nutrients.totalNutrients.FAT.quantity.toFixed(2)} {nutrients.totalNutrients.FAT.unit} </div>
                <div>Protein: {nutrients.totalNutrients.PROCNT.quantity.toFixed(2)} {nutrients.totalNutrients.PROCNT.unit} </div>
                <div>Sodium: {nutrients.totalNutrients.NA.quantity.toFixed(2)} {nutrients.totalNutrients.NA.unit} </div>
                <div>Sugars: {nutrients.totalNutrients.SUGAR.quantity.toFixed(2)} {nutrients.totalNutrients.SUGAR.unit} </div>
                
                
                <div className="recipe-modal-container">
                <div className="modal-title">{title}</div>
                <div style={{textAlign: 'center'}}><img alt="pic" src={image}/></div>
                <div className="modal-title">Ingredients</div>
                <div><ul>{formattedIngreds}</ul></div>
                <div className="modal-title">Instructions</div>
                <div><ol>{formattedInstructions}</ol></div>  
            </div>
=======
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
>>>>>>> 72fef1de6e876a35f322290c465948d7aa1b1a35
            </div>
        )
    }
}

export default Visualization
