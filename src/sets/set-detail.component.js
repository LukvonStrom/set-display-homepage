import {Card} from "react-bootstrap";
import React from "react";
import Img from 'react-image'


export function SetDetailComponent(props) {
    let convertLinkToThumb = (link) => `${(link.replace('https://youtu.be/', 'https://img.youtube.com/vi/')).replace(/([?&]t)=[^?&]+/, "")}/0.jpg`;
    let addTimestamp = (link) => link.includes("?t=") ? link : `${link}?t=1`;
    let {link, title, venue, artists, genre} = props.set;
    return (
        <Card className="mx-4 mx-lg-2" key={Object.values(props.set).join(',') + "-" + props.selectedGenre}>
                <a href={addTimestamp(link)} target="_blank" rel="noopener noreferrer">
                    <Img src={[convertLinkToThumb(link)]} className="card-img-top"/>

                    <Card.Body>
                        <Card.Title>{title} {title && venue ? `@ ${venue}` : venue}</Card.Title>
                        <Card.Text>
                            <b>{artists.join(', ')}</b>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <b>
                            {genre}
                        </b>
                    </Card.Footer>
                </a>
            </Card>
    )
}
