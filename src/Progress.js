import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';

export class Progress extends React.Component {    
    render() {
        const { calories, carbohydrates, fats, protein, sodium, sugars } = this.props.totals;      
        
        const data = {
            labels: ['Calories', 'Carbohydrates', 'Fats', 'Protein', 'Sodium', 'Sugars'],
            datasets: [{
                data: [calories, carbohydrates, fats, protein, sodium, sugars],
                backgroundColor: [
                    'rgba(234,60,83,1)',
                    'rgba(150, 111, 214, 1)',
                    'rgba(251,174,210,1)',
                    'rgba(144,238,144,1)',
                    'rgba(128,206,225,1)',
                    'rgba(245,189,31,1)',
                ]
            }]
        }

        return (
            <div style={{textAlign: 'center', marginTop: '20px'}}>
                <h3>Total Daily Nutrition</h3>
                <div><HorizontalBar data={data} options={{legend: {display: false}}} /></div>                
            </div>
        )
    }
}

export default Progress
