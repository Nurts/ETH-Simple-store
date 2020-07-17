import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css';
import { ethers } from "ethers";
import "./App.css";
import { Row, Col, Input, Button, Spin } from 'antd';
import { Transactor } from "./helpers"
import { useExchangePrice, useGasPrice, useContractLoader, useContractReader, useEventListener } from "./hooks"
import { Header, Account, Provider, Faucet, Ramp, Address, Contract} from "./components"
import AddItem from "./components/store/AddItem";
import ItemList from "./components/store/ItemList";
import CollapseSection from "./components/store/CollapseSection";
import 'bootstrap/dist/css/bootstrap.min.css';

// const { TextArea } = Input;
// const { BufferList } = require('bl')

const ipfsAPI = require('ipfs-http-client');
const ipfs = ipfsAPI({host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

// const getFromIPFS = async hashToGet => {
//   for await (const file of ipfs.get(hashToGet)) {
//     console.log(file.path)
//     if (!file.content) continue;
//     const content = new BufferList()
//     for await (const chunk of file.content) {
//       content.append(chunk)
//     }
//     console.log(content)
//     return content
//   }
// }

const addToIPFS = async fileToUpload => {
  for await (const result of ipfs.add(fileToUpload)) {
    return result
  }
}

const mainnetProvider = new ethers.providers.InfuraProvider("mainnet","2717afb6bf164045b5d5468031b93f87")
const localProvider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_PROVIDER?process.env.REACT_APP_PROVIDER:"http://localhost:8545")

const contractName = "SimpleStore"

function App() {
/*-------------------------------------------------------------------------------------------------------------*/
  const [address, setAddress] = useState();
  const [injectedProvider, setInjectedProvider] = useState();
  const price = useExchangePrice(mainnetProvider)
  const gasPrice = useGasPrice("fast")

  const tx = Transactor(injectedProvider,gasPrice)

  const readContracts = useContractLoader(localProvider);
  const writeContracts = useContractLoader(injectedProvider);

  /*-------------------------------------------------------------------------------------------------------------*/
  //set that last number to the block the contract is deployed (this needs to be automatic in the contract loader!?!)s
  const allItems = useEventListener(readContracts, contractName, "AllItems", localProvider, 1);

  //Find postedItems
  var postedItems = [], boughtItems = [], storeItems = [];
  allItems.forEach( function(element){
    if(element["owner"] == address){
      postedItems.push(element);
    }
  });



  const allBoughtItems = useEventListener(readContracts, contractName, "BoughtItems", localProvider, 1);
  var boughtDict = {};
  
  allBoughtItems.forEach( function(element){
    let idx = element["id"].toNumber();
    boughtDict[idx] = element["buyer"];
  });

  //Find boughtItems
  allItems.forEach( function(element){
    let idx = element["id"].toNumber(); 
    if(idx in boughtDict){
      if(boughtDict[idx] == address){
        boughtItems.push(element);
      }
    }else{
      storeItems.push(element);
    }
  });

  // console.log("HERE COMES THE ALL ITEMS");
  console.log(allItems);
  // console.log(allBoughtItems);

  const postItem = async (name, image_hash, price) => {
    // console.log(price);
    let wei = ethers.utils.parseEther(price);
    tx( writeContracts["SimpleStore"].postItem(name, image_hash, wei) );
  }

  const buyItem = async (item) => {
    console.log("Buying Item: " + item["name"]);
    tx( writeContracts["SimpleStore"].buyItem(item["id"], {
      value : item["price"]
    }));
  }

  return (
    <div className="App" style = {{width: '100%'}}>
      <Header />
      <div style={{position:'fixed',textAlign:'right',right:0,top:0,padding:10}}>
        <Account
          address={address}
          setAddress={setAddress}
          localProvider={localProvider}
          injectedProvider={injectedProvider}
          setInjectedProvider={setInjectedProvider}
          mainnetProvider={mainnetProvider}
          price={price}
        />
      </div>

      <CollapseSection firstText = "Post New Item" secondText = "Bought Items" thirdText = "Posted Items">
        <div>
          <AddItem
            addToIPFS = {addToIPFS}
            postItem = {postItem}
          />
        </div>

        <div>
          <ItemList
            allItems = {boughtItems}
            disable = {true}
          />
        </div>

        <div>
          <ItemList
            allItems = {postedItems}
            disable = {true}
          />
        </div>
      </CollapseSection>
      

      <div>
        <ItemList
          buyItem = {buyItem}
          allItems = {storeItems}
        />
      </div>

      <div style={{textAlign:'left',left:0,bottom:20,padding:10, width: "30vw"}}>
        <Row align="middle" gutter={4}>
          <Col span={9}>
            <Ramp
              price={price}
              address={address}
            />
          </Col>
          <Col span={15}>
            <Faucet
              localProvider={localProvider}
              price={price}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
