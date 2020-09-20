import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';

export class Progress extends React.Component {    
    render() {
        const { calories, carbohydrates, fats, protein, sodium, sugars } = this.props.totals;      
        const data = {
            labels: ['Calories', 'Carbohydrates', 'Fats', 'Protein', 'Sodium', 'Sugars'],
            datasets: [{
                data: [calories, carbohydrates.toFixed(2), fats.toFixed(2), protein.toFixed(2), sodium.toFixed(2), sugars.toFixed(2)],
                backgroundColor: [
                    'rgba(234,60,83,0.5)',
                    'rgba(150, 111, 214, 0.5)',
                    'rgba(251,174,210,0.5)',
                    'rgba(144,238,144,0.5)',
                    'rgba(128,206,225,0.5)',
                    'rgba(245,189,31,0.5)',
                ],                
            }]
        }

        return (
            <div style={{textAlign: 'center', marginTop: '20px'}}>
                <h3>Total Daily Nutrition</h3>
                <div><HorizontalBar data={data} options={
                    {
                        legend: {display: false},
                        scales: {
                            xAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: '% Daily Value',
                                },
                                ticks: {
                                    min: 0,
                                    max: 100
                                }
                            }],
                        }                            
                    }
                } /></div>                
            </div>
        )
    }
}

export default Progress
