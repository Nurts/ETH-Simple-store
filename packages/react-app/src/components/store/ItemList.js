import React,{ useState, useEffect } from 'react';
import ItemView from './ItemView';
import CardDeck from 'react-bootstrap/CardDeck';
import CardColumns from 'react-bootstrap/CardColumns';


export default function ItemList(props){

    let elements = [];

    props.allItems.forEach(element => {
        elements.push(
            (
            <>
                <ItemView
                    itemData = {element}
                    disable = {props.disable}
                    buyItem = {props.buyItem}
                />
            </>
            )
        )
    });

    if(elements.length > 0){
        return (
            <div style = {{margin: "1vw",border: "1px solid #BFBFBF", borderRadius: "3px", boxShadow: "10px 10px 5px #aaaaaa"}}>
                <CardColumns style = {{padding: "50px"}}>
                    {elements}
                </CardColumns>
            </div>
        );
    }
    else{
        return (
            <div style = {{margin: "1vw",border: "1px solid #BFBFBF", borderRadius: "3px", boxShadow: "10px 10px 5px #aaaaaa"}}>
                <h2 style = {{margin: "2vw"}}>Empty</h2>
            </div>
        );
    }

    
}