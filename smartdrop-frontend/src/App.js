import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { ContractFactory, ethers } from 'ethers';
import token from "./utils/AirDrop.json";

function App() {
  const [tokenAddress, setTokenAddress] = useState();
  const [airdropAmount, setAirdropAmount] = useState();
  const [tokenName, setTokenName] = useState();
  const [tokenSymbol, setTokenSymbol] = useState();
  const [tokenSupply, setTokenSupply] = useState();
  const [isConnected, setIsConnected] = useState();

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum
        .request({ method: 'eth_requestAccounts' });
      console.log({ account: accounts[0] });
      setIsConnected(true);
    } else {
      window.alert("Wallet not found!");
    }
  }

  const createToken = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    // console.log({ signer });
    const factory = new ContractFactory(token.abi, token.bytecode, signer);
    // If your contract requires constructor args, you can specify them here
    const contract = await factory.deploy(tokenName, tokenSymbol, tokenSupply);

    // console.log(contract.address);
    // console.log(contract.deployTransaction);
    setTokenAddress(contract.address)
  }

  const doAirdrop = () => {

  }

  return (
    <div className="App">
      <header className="header">
        <h1>Welcome to SmartDrop</h1>
        <p>SmartDrop allows you to easily create a token and airdrop some of it to your community members.</p>
        {!tokenAddress &&
          <form>
            <label>Token Name:</label><br />
            <input type="text" onChange={(e) => setTokenName(e.target.value)} /><br />
            <label>Token Symbol:</label><br />
            <input type="text" onChange={(e) => setTokenSymbol(e.target.value)} /><br />
            <label>Total Supply:</label><br />
            <input type="number" onChange={(e) => setTokenSupply(e.target.value)} /><br /><br />

            {isConnected ?
              <button type='button' className="button" onClick={createToken}>Create Token</button> :
              <button type='button' className="button" onClick={connectWallet}>Connect Wallet</button>}
          </form>
        }
      </header>
      {tokenAddress &&
        <div className='main'>
          <h3>Your token address is: <span className='tokenAddress'>{tokenAddress}</span></h3>
          <p>Enter all members wallet address:</p>
          <textarea rows="8" cols="40" />
          <p>Enter airdrop amount: </p>
          <input type="number" step="0.01" />
          <button className='button' onClick={doAirdrop}>Submit</button>
        </div>
      }
    </div>
  );
}

export default App;
