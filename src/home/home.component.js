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
                        DJ Sets #StayatHome
                    </h1>
                </Col>
            </Row>
            <SetDisplayComponent/>
        </Container>
    )
}


