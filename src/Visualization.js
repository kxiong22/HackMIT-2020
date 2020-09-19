import React from 'react';

export class Visualization extends React.Component {    
    render() {
        const {ingredients, instructions, title, image} = this.props.recipe;
        const {data} = this.props;
        console.log(ingredients);
        console.log(instructions);
        
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
                <div>{data.title}</div>
                <div>Calories: {data.nutrients.calories}</div>
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
