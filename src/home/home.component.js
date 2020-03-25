import React from "react";
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {SetDisplayComponent} from "../sets/set-display.component";

export default function Home() {
    return(
        <Container>
            <Row >
                <Col >
                    <h1 className="text-center">
                        DJ Sets
                    </h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className="text-center my-0">During the ongoing Corona pandemic, I find it relaxing to listen to good DJ sets and music.</p>
                    <p className="text-center my-1">I collected sets from all over Techno, EDM, Dubstep, ... from October 2019 to today</p>
                    <p className="text-center my-1">Cheers, Lukas</p>
                </Col>
            </Row>
            <SetDisplayComponent/>
        </Container>
    )
}


