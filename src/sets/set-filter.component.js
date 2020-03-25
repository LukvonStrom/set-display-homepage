import React, {Component} from "react";
import {Dropdown} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from '@fortawesome/free-regular-svg-icons'

export class SetFilterComponent extends Component {

    constructor(props){
        super(props);
        this.selectGenre = this.selectGenre.bind(this);
        this.state ={
            selectedGenre: null
        }
    }

    selectGenre(genre) {
        this.props.selectGenre(genre);
        this.setState({selectedGenre: genre});
    }

    render(){
        return(<Col xs={2} className="offset-2 offset-md-10 mt-1">
            <Dropdown>
                <Dropdown.Toggle variant="primary">
                    Filter Sets by Genre
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => this.selectGenre()} disabled={!this.state.selectedGenre}><FontAwesomeIcon icon={faTrashAlt} /> Filter l&ouml;schen</Dropdown.Item>
                    <Dropdown.Divider />
                    {this.props.genres.map(genre => !!genre && <Dropdown.Item onClick={() => this.selectGenre(genre)} key={genre}>{genre}</Dropdown.Item>)}
                </Dropdown.Menu>
            </Dropdown>
        </Col>)
    }
}

