import React from 'react';

export class Visualization extends React.Component {    
    render() {
        const {ingredients, instructions, title, image} = this.props.recipe;
        const {nutrients} = this.props.data;
        console.log(nutrients);
        
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
            </div>
        )
    }
}

export default Visualization
