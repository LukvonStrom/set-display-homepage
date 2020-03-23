import React, {Component} from "react";
import Row from "react-bootstrap/Row";
import {DataProvider} from "../data/data-provider";
import {SetDetailComponent} from "./set-detail.component";
import {CardDeck, Container} from "react-bootstrap";

export class SetDisplayComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sets: null,
            isFetching: true
        };
    }

    /*
    See: https://stackoverflow.com/a/6274381
     */
    shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    /*
    See: https://stackoverflow.com/a/24782004
     */
    chunk(arr, chunkSize) {
        let R = [];
        for (let i = 0, len = arr.length; i < len; i += chunkSize)
            R.push(arr.slice(i, i + chunkSize));
        return R;
    }

    updateSets() {
        this.setState({isFetching: true});
        DataProvider.getSets()
            .then(sets => {
                this.setState({sets, isFetching: false})
            })
            .catch(error => this.setState({isFetching: false, error}))
    }

    componentDidMount() {
        this.updateSets();
    }

    render() {
        return (<Container>

            {this.state.sets && this.state.sets.length > 0 && this.chunk(this.state.sets, 3).map((partition, index) =>
                <Row key={index}>
                    <CardDeck className="my-2" key={index}>
                        {partition.map(set => <SetDetailComponent set={set} key={set.link}/>)}
                    </CardDeck>
                </Row>)
            }


        </Container>)
    }
}
