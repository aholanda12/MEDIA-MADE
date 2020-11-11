import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/API";
import { Row, Col, Container, Button } from "react-bootstrap";
import UserContext from "../utils/UserContext";

function OutfitPage(props) {

  const { updateUserCloset, setUpdateUserCloset } = useContext(UserContext);
  const [outfit, setOutfit] = useState({
    outfitImage: "",
    items: [],
  });

  let styles = {
    outfitCard: {
      backgroundColor: "#d8dbe2",
      color: "white",
      paddingTop: "40px",
      width: "70vw",
      minHeight: "70vh",
      marginTop: "0px",
    },
    outfitImg: {
      padding: "20px",
      float: "right",
    },
    outfitText: {
      fontFamily: "'Rubik', sans-serif",
      fontSize: "25px",
      float: "right",
    },
    emily: {
      float: "left",
    },
  };

  const { outfitid } = useParams();

  useEffect(() => {
    if (props.outfitid) {
      API.getOutfit(props.outfitid)
        .then((res) => {
          setOutfit(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      API.getOutfit(outfitid)
        .then((res) => {
          setOutfit(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [props]);

  const handleAddToCloset = async () => {
    console.log(outfitid);
    await API.updateUserOutfits(outfitid).then((data) => {
      console.log(data);
      
    });
    setUpdateUserCloset(updateUserCloset => !updateUserCloset);
  };

  const handleDelete = () => {
    API.deleteUserOutfit(outfitid).then((data) => {
      console.log(data);
    });
  };

  return (
    <div>
      <Container style={styles.outfitCard}>
        <img style={styles.emily} src={outfit.outfitImage} alt="outfit-image" />
        {outfit.items.map((items) => (
          <Row>
            <Col size="md-3">
              <img
                style={styles.outfitImg}
                className="itemImg"
                src={process.env.PUBLIC_URL + items.image}
              ></img>
            </Col>
            <Col size="md-8">
              <p style={styles.outfitText} className="itemName">
                {items.name}
              </p>
              <p style={styles.outfitText} className="itemLink">
                <a href={items.url}>Click here to buy this product</a>
              </p>
            </Col>
          </Row>
        ))}
        {(() => {
          if (props.showAddToCloset) {
            return <Button onClick={handleAddToCloset}>ADD TO CLOSET</Button>;
          } else {
            return <Button onClick={handleDelete}>DELETE OUTFIT</Button>;
          }
        })()}
      </Container>
    </div>
  );
}

export default OutfitPage;
