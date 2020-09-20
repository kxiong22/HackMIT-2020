import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button, Modal, Col, Row, Dropdown,DropdownButton} from 'react-bootstrap';
import './index.css';
import axios from 'axios';



export class Farms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            farms: []
        }
    }

    handleFarmSearch = async () => {
        const BASE_URL = 'http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=02139';

        try {
            const res = await axios.get(BASE_URL);
            const farms = res.data.results;
            for (let farm of farms) {
                this.getDetailedFarmInfo(farm.id);
            }
        } catch (e) {
            console.error(e);
        }                
    }

    getDetailedFarmInfo = async (id) => {
        const BASE_URL = 'http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=' + id;

        try {
            const res = await axios.get(BASE_URL);
            this.setState({farms: this.state.farms.concat(res.data.marketdetails)});
            console.log(res.data.marketdetails);
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        let ans = [];
        for (let farm of this.state.farms) {
            ans.push(<div>
                <div>{farm.Address}</div>
                <div>{farm.GoogleLink}</div>
                <div>{farm.Products}</div>
                <div>{farm.Schedule}</div>
            </div>)
        }

        return (   
            <div>
                <Button onClick={() => this.handleFarmSearch()} variant="primary">Find Farms!</Button>
                <div>{ans}</div>
            </div>             
        )
    }
}

export default Farms


