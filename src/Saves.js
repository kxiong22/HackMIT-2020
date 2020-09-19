import React from 'react';
import {Container, Row, Button, Modal} from 'react-bootstrap';

export class Saves extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: Array(8).fill(false)
        }
    }

    setModalShow = (i, val) => {
        const modalShowCopy = [...this.state.modalShow];
        modalShowCopy[i] = val;
        this.setState({modalShow: modalShowCopy});
    }

    renderRecipeCard = (i) => {
        const name = this.props.saves[i].title;
        return (
            <Row>
                <div className="meal-card">
                    <Button className="modal-button" variant="light" onClick={() => this.setModalShow(i, true)}>
                        <div>{name}</div>
                    </Button>
                    <Modal size="lg" 
                                aria-labelledby="contained-modal-title-vcenter" 
                                centered 
                                show={this.state.modalShow[i]} onHide={() => this.setModalShow(i, false)}>
                        {this.props.saves[i].visual}
                    </Modal>
                </div>
            </Row>
        )
    }

    render() {
        const allSaves = [];
        for (let i = 0; i < this.props.saves.length; i++) {
            allSaves.push(this.renderRecipeCard(i));
        }
        return (
            <Container>
                {allSaves}
            </Container>
        )
    }
}
export default Saves
