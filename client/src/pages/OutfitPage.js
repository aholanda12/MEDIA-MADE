import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import API from "../utils/API";
import { Row, Col, Container } from "react-bootstrap";


function OutfitPage(props) {

    const [outfit, setOutfit] = useState({
        outfitImage: "",
        items: []
    });

    const { outfitid } = useParams();

    useEffect(() => {
        if(props.outfitid){
            API.getOutfit(props.outfitid)
            .then(res => {
                // console.log(res);
                setOutfit(res.data)
            })
            .catch(err => console.log(err));
        }
        else{
            API.getOutfit(outfitid)
            .then(res => {
                // console.log(res);
                setOutfit(res.data)
            })
            .catch(err => console.log(err));
        }
        
    }, [props])

    return (
        <>
            <p style={{ color: "white" }}>Outfit Card</p>
            <Container>
                <img src={outfit.outfitImage} alt="outfit-image" />
                {outfit.items.map((items) =>
                    <Row>
                        <Col size="md-3">
                            <img className="itemImg" src={process.env.PUBLIC_URL + items.image}></img>
                        </Col>
                        <Col size="md-8">
                            <p className="itemName">{items.name}</p>
                            <p className="itemLink"><a href={items.url}>Click here to buy this product</a></p>
                        </Col>
                    </Row>
                )})
        </Container>
        </>
    )
}

export default OutfitPage;