import React, {useContext, useEffect} from "react"
import { CatContext } from "../context/CatProvider";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { FetchBreeds } from "../helpers/Fetchers";

export default function CatSearch({}){
    const {catSearch, breedList, cats, dispatchUserEvent, loadMore} = useContext(CatContext)
    //Load breeds
    useEffect(() =>{
        FetchBreeds(dispatchUserEvent)
    }, [])
    //Load Cat Pictures on catSearch change
    return(
        <Row>
            <h1>Cat Browser</h1>
            <Col md={3} sm={6} xs={12}>
                <Form style={{paddingTop: 10}}>
                    <Form.Group>
                        <Form.Label>Breed</Form.Label>
                        <Form.Select value={catSearch} onChange={(e) => dispatchUserEvent('SEARCH_CATS', e.target.value)}>
                            <option value='' >Select Breed</option>
                            {breedList.map(breed => {
                                return <option value={breed.id} key={breed.id}>{breed.name}</option>
                            })}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Col>
        </Row>      
    )
}