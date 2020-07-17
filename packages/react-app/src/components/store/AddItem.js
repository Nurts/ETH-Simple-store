import React,{ useState, useEffect } from 'react'; 
import SelectImage from './SelectImage';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function AddItem(props){ 

    var image = null;

    let _selector = null;
    
    let [ item_name, setItemName ] = useState();
    let [ price, setPrice] = useState();

    return (
        
        <div style = {{marginTop : '10px', marginBottom : '10px'}}>
            <Card  style={{ width: '50rem', margin: 'auto' }} >
                <SelectImage  ref = {(ref) => _selector = ref}/>

                <Form.Control type="text" placeholder="Enter Item Name" 
                    style = {{
                        width: "30em",
                        marginInlineStart: '10px'
                    }}
                    onChange = {
                        (e)=>{
                            setItemName(e.target.value)
                        }
                    }
                />

                <Form.Control type="number" step = "0.000000000001" placeholder="Enter ETH Price"
                    style = {{
                        width: "15em",
                        margin: '10px'
                    }}
                    onChange = {
                        (e)=>{
                            setPrice(e.target.value)
                        }
                    }
                />
                
                <Button style={{margin:8}} onClick={async()=>{
                    console.log(_selector.getImage());    
                    const result =  await props.addToIPFS(_selector.getImage());
                    if(result && result.path) {
                        console.log("IMAGE: " + result.path);
                    }
                    console.log("NAME: " + item_name);
                    console.log("PRICE: " + price);
                    if(parseFloat(price) > 0.0){
                        props.postItem(item_name, result.path, price);
                    }
                }}>Submit</Button>
            </Card>
        </div>
    );
}

/* <input type="text" placeholder = "Type Item Name" onChange={
                    
                }/> */


/* <div>
Price: $<input type="number" step="0.000000000001" value = {price} onChange={
    (e)=>{
        setPrice(e.target.value)
    }
}/>

</div> */