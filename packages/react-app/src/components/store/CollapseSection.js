import React,{ useState, useEffect } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function CollapseSection(props){
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);

    return (
        <>  
            <Row style = {{width : "100%"}}>
                <Col>
                    <Button
                        onClick={() => {
                            setOpen1(!open1);
                            setOpen2(false);
                            setOpen3(false);
                        }}
                        aria-controls="example-collapse-text"
                        aria-expanded={open1}
                    >
                        {props.firstText}
                    </Button>
                </Col>

                <Col>
                    <Button
                        onClick={() => {
                            setOpen2(!open2);
                            setOpen1(false);
                            setOpen3(false);
                        }}
                        aria-controls="example-collapse-text"
                        aria-expanded={open2}
                    >
                        {props.secondText}
                    </Button>
                </Col>

                <Col>
                    <Button
                        onClick={() => {
                            setOpen3(!open3);
                            setOpen2(false);
                            setOpen1(false);
                        }}
                        aria-controls="example-collapse-text"
                        aria-expanded={open3}
                    >
                        {props.thirdText}
                    </Button>
                </Col>
            </Row>
            
            <Collapse in={open1}>
                {props.children[0]}
            </Collapse>

            <Collapse in={open2}>
                {props.children[1]}
            </Collapse>

            <Collapse in={open3}>
                {props.children[2]}
            </Collapse>
        </>
    );
}