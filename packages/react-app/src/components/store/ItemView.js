import React,{ useState, useEffect } from 'react'; 
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import { ethers } from "ethers";

export default function ItemView(props){ 
    // console.log(props.itemData["id"].toNumber());
    // console.log(props.itemData["owner"]);
    // console.log(props.itemData[""])

    const [show, setShow] = useState(false);

    let button = function(disabled){
        if(disabled){
            return (<></>);
        }else{
            return (<Button variant="primary" 
                    onClick={() => {
                        props.buyItem(props.itemData);
                    }}
                    >Buy</Button>);
        }
    }

    var img_src = "https://ipfs.io/ipfs/" + props.itemData["image_hash"];
    // var img_src = "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg";
    console.log(img_src);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Card style={{ width: '18rem' }} >
            <Card.Img variant="top" src = {img_src} style={{width: '18rem'}} onClick = {handleShow} />
            <Card.Body>
                <Card.Title>{props.itemData["name"]}</Card.Title>
                <Card.Text>
                Cost: {ethers.utils.formatEther(props.itemData["price"])} ETH
                </Card.Text>
                {button(props.disable)}
            </Card.Body>
            <Modal show = {show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Image src= {img_src} fluid rounded/>
            </Modal>
        </Card>
    );
}