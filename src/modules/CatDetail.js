import React, {useState, useEffect} from "react"
import { Link, useParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { FetchCatDetail } from "../helpers/Fetchers";


export default function Home() {
    const [catDetail, setCatDetail] = useState({})
    const [valid, setValid] = useState(false)
    //fetch cat id
    const {catid} = useParams()
    //fetch data once and on catid change
    useEffect(() =>{
        fetch(`https://api.thecatapi.com/v1/images/${catid}`, {
            method: 'GET',
            headers: {'x-api-key': '02ceefbf-c916-4863-80cb-447aa001cd82'},
        })
        .then(res => res.json())
        .then(res => {
            if(res.message === undefined){
                //set cat details
                setCatDetail(res)
                setValid(true)
            }else{
                //id error
                console.log(res.message)
                setValid(false)
                alert(`This cat doesn't exist! Miau!`)
            }
            
        })
        .catch(e =>{
            //possible server error
            console.log(e)
            setValid(false)
            alert(`Apologies but we could not load new cats for you at this time! Miau!`)
        })
    }, [catid])
    return (
        <Container fluid="md" style={{paddingTop: 50}}>
            <Card>
                <Card.Title style={{padding: 20}}>
                    <Link to={valid ? `/${catDetail.breeds[0].id}` : '/'} className="btn btn-outline-primary">
                        Back
                    </Link>
                </Card.Title>
                {/* Check if data is valid */}
                {valid ? (
                    <>
                        <Image src={catDetail.url} />
                        <div style={{padding: 20}}>
                            <h2>{catDetail.breeds[0].name}</h2>
                            <h4>Origin: {catDetail.breeds[0].origin}</h4>
                            <h6>{catDetail.breeds[0].temperament}</h6>
                            <p>{catDetail.breeds[0].description}</p>
                        </div>
                    </>
                ) : ''}
                
            </Card>
        
        </Container>
    );
}