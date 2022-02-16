import React, {useContext, useEffect, useState} from "react"
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { CatContext } from "../context/CatProvider";

export default function CatCard(){
    const {cats, page} = useContext(CatContext)
    const [catDB, setCatDB] = useState([])
    useEffect(() => {
        setCatDB(cats)
    }, [cats])
    return(
    <Row style={{marginTop: 10}}>
        {catDB.length !== 0 ? catDB.map(cat => {
            return(
                <Col md={3} xs={6} key={cat.id} style={{marginTop: 10}}>
                    <Card>
                    <Image src={cat.url} />
                    <Link to={`/cat/${cat.id}`} className="btn btn-outline-primary">View Details</Link>
                    </Card>
                </Col>
            )
        }) : page === -1 ? 'No cats available' : 'Select a breed first'}
    </Row>
    )

}