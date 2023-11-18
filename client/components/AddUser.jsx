// ContractInteractionComponent.jsx
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import WalletConnect from './../utils/WalletConnect';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './../utils/contractDetails';

const ContractInteractionComponent = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [newUser, setNewUser] = useState('');
  const [newUserRole, setNewUserRole] = useState('');
  const [userToUpdate, setUserToUpdate] = useState('');
  const [newUserRoleUpdate, setNewUserRoleUpdate] = useState('');
  const [connectedWallet, setConnectedWallet] = useState('');

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.enable();
          setWeb3(web3Instance);

          const accounts = await web3Instance.eth.getAccounts();
          setAccounts(accounts);

          const contract = new web3Instance.eth.Contract(
            CONTRACT_ABI,
            CONTRACT_ADDRESS
          );
          setContract(contract);
        } else {
          console.error('Web3 provider not found. Please install MetaMask.');
        }
      } catch (error) {
        console.error('Error initializing Web3:', error);
      }
    };

    initWeb3();
  }, []);

  const handleAddUser = async () => {
    try {
      await contract.methods.addUser(newUser, newUserRole).send({ from: accounts[0] });
      console.log('User added successfully');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleUpdateUserRole = async () => {
    try {
      await contract.methods.updateUserRole(userToUpdate, newUserRoleUpdate).send({ from: accounts[0] });
      console.log('User role updated successfully');
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const handleWalletConnect = (walletAddress) => {
    // Perform any additional actions when the wallet is connected
    console.log(`Wallet connected: ${walletAddress}`);
    setConnectedWallet(walletAddress);
  };

  return (
    <div>
      <h1>Contract Interaction</h1>
      <WalletConnect onWalletConnect={handleWalletConnect} />
      {connectedWallet && (
        <div>
          <p>Connected Wallet: {connectedWallet}</p>
        </div>
      )}
      <div>
        <h2>Add User</h2>
        <input
          type="text"
          placeholder="New User Address"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        <input
          type="text"
          placeholder="New User Role"
          value={newUserRole}
          onChange={(e) => setNewUserRole(e.target.value)}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
      <div>
        <h2>Update User Role</h2>
        <input
          type="text"
          placeholder="User Address to Update"
          value={userToUpdate}
          onChange={(e) => setUserToUpdate(e.target.value)}
        />
        <input
          type="text"
          placeholder="New User Role"
          value={newUserRoleUpdate}
          onChange={(e) => setNewUserRoleUpdate(e.target.value)}
        />
        <button onClick={handleUpdateUserRole}>Update User Role</button>
      </div>
    </div>
  );
};

export default ContractInteractionComponent;
