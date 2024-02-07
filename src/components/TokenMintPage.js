import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Button } from 'react-bootstrap';
import Web3 from "web3";
import abi from '../abi.json'

const contractAddress = "0x60452dA2A22D49738B42CE1105a18be7133f4A94"

async function getCurrentAccount() {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  return accounts[0];
}

const TokenMintPage = () => {
  const [userAddress,setUserAddress] = useState('');
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userBalance, setUserBalance] =useState();

  const initializeContract = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      let instance = new web3.eth.Contract(abi, contractAddress);
      setContract(instance);
    } catch (error) {
      console.error('Error initializing contract:', error);
    }
  };

  useEffect(() => {
    initializeContract();
  }, []);

  useEffect(() => {
	console.log(userBalance);
  }, [userBalance])


  const loadWeb3 = async function connectMetamask() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });

            const connectedAddress = accounts[0];
            const connectedAddressElement = document.getElementById('connected-address');

            connectedAddressElement.innerHTML = `Connected Address: ${connectedAddress}`;

			setUserAddress(connectedAddress)
            alert('Metamask connected!');
        }catch (error) {
          console.error(error);
        }
    } else {
        console.error('MetaMask is not installed');
    }
};
  
  const mintTokens = async () => {
    try {
      
      window.ethereum.enable();
        const web3 = new Web3(window.ethereum);
        const account = userAddress ? userAddress :  await getCurrentAccount();
        //contract = new web3.eth.Contract(abi, contractAddress);
        const result = await contract.methods.mint(account,100).send({ from: account });

      alert('Tokens minted successfully!');
    } catch (error) {
      console.error('Error minting tokens:', error);
    }
  };


const balance = async () => {
	try {
	  setLoading(true);
	  // const web3 = new Web3(window.ethereum);
      
	  const result = await contract.methods.balanceOf(userAddress).call();
	  console.log("Balance:", result.toString()); 
	  setUserBalance(result.toString())

	} catch (error) {
	  console.error('Error fetching balance:', error);
	} finally {
	  setLoading(false);
	}
  };

  return (
    <div className="token-mint-page">
      <h1>Token Mint Page</h1>
      <Button variant="primary" onClick={loadWeb3}>Connect to MetaMask</Button>
      <div id="connected-address"></div>
      <Button variant="success" onClick={mintTokens} >Mint Tokens</Button>

      <div>
        <Button onClick={() =>{balance()}}>Get Balance</Button>
        <label>{userBalance}</label>
      </div>

    </div>
  );
};

export default TokenMintPage;