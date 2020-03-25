import {Card} from "react-bootstrap";
import React, {Component} from "react";
import Img from 'react-image'




export class SetDetailComponent extends Component {

    render() {
        let convertLinkToThumb = (link) => `${(link.replace('https://youtu.be/', 'https://img.youtube.com/vi/')).replace(/([?&]t)=[^?&]+/, "")}/0.jpg`;
        let addTimestamp = (link) => link.includes("?t=") ? link : `${link}?t=1`;
        return (
            <Card className="mx-4 mx-lg-2">
                <a href={addTimestamp(this.props.set.link)} target="_blank" rel="noopener noreferrer">
                    <Img src={[convertLinkToThumb(this.props.set.link)]} className="card-img-top"/>

                    <Card.Body>
                        <Card.Title>{this.props.set.title} {this.props.set.title && this.props.set.venue ? `@ ${this.props.set.venue}` : this.props.set.venue}</Card.Title>
                        <Card.Text>
                            <b>{this.props.set.artists.join(', ')}</b>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <b>
                            {this.props.set.genre}
                        </b>
                    </Card.Footer>
                </a>
            </Card>
        )
    }
}
