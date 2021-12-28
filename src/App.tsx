import { SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from 'ethers'; // need for web3 stuff

import styles from "./App.module.css";

import { RootState } from "./store/store";
import { setGender, setRow2, setRow3 } from "./store/reducers";

import Generator from "./components/Generator";
import Row1 from "./components/Row1";
import Row2 from "./components/Row2";
import Row3 from "./components/Row3";

import titleSVG from "./assets/images/pictures/make-your-own-milliway-citizen.svg";
import buttonSVG from "./assets/images/buttons/download.svg";
import female from "./assets/images/pictures/generator-female-picture.png";
import male from "./assets/images/pictures/generator-male-picture.png";

import { bgDataLength } from "./assets/data/Row2BGData";
import { skinDataLength } from "./assets/data/Row2SkinData";
import { femaleMouthDataLength,  maleMouthDataLength,} from "./assets/data/Row2MouthData";
import {
  femaleHairDataLength,
  maleHairDataLength,
} from "./assets/data/Row2HairData";
import {
  femaleClothesDataLength,
  maleClothesDataLength,
} from "./assets/data/Row2ClothesData";
import { accessoiresDataLength } from "./assets/data/Row2AccessoiresData";


import Greeter from './Greeter.json'; // where do you want to store this json ? 
import { connect } from "tls";
import { WebSocketProvider } from "@ethersproject/providers";
// import { stringify } from "querystring";

const greeterAddress = "0x59b670e9fA9D0A427751Af201D676719a970857b";
declare var window: any // does this line bother you?

function App() {

  // deploy simple storage contract and paste deployed contract address here. This value is local ganache chain
	let contractAddress = '0xEd3AAE51d33138ef67555AE0925A38E77Df5B7e0';

	const [errorMessage, setErrorMessage] = useState('');
	const [defaultAccount, setDefaultAccount] = useState('');
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const [currentContractVal, setCurrentContractVal] = useState('');

	const [provider, setProvider] = useState(new ethers.providers.Web3Provider(window.ethereum));
	const [signer, setSigner] = useState(new ethers.providers.Web3Provider(window.ethereum).getSigner());



  let tempSigner = new ethers.providers.Web3Provider(window.ethereum).getSigner()
  let contract = new ethers.Contract(contractAddress, Greeter.abi, tempSigner);

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then((result: any[])  => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
			})
			.catch((error : any) => {
				setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	// update account, will cause component re-render
	const accountChangedHandler = (newAccount: string) => {
		setDefaultAccount(newAccount);
		updateEthers();
	}

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}


	// listen for account changes
	window.ethereum.on('accountsChanged', accountChangedHandler);

	window.ethereum.on('chainChanged', chainChangedHandler);

	const updateEthers = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner);

		let tempContract = new ethers.Contract(contractAddress, Greeter.abi, tempSigner);
		// setContract(tempContract);	

    tempContract.setGreetingPayable("tchunkla");
	}

	const setHandler = (event : any) => {
		event.preventDefault();
		console.log('sending ' + event.target.setText.value + ' to the contract');
		contract.set(event.target.setText.value);
	}

	const getCurrentVal = async () => {
		let val = await contract.get();
		setCurrentContractVal(val);
	}





  const dispatch = useDispatch();

  const [refresh, setRefresh] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(true);

  const gender = useSelector((state: RootState) => state.gender);
  const row2 = useSelector((state: RootState) => state.row2);
  const seed = useSelector((state: RootState) => state.seed);

  const mouthDataLength =
    gender === "male" ? maleMouthDataLength : femaleMouthDataLength;
  const hairDataLength =
    gender === "male" ? maleHairDataLength : femaleHairDataLength;
  const clothesDataLength =
    gender === "male" ? maleClothesDataLength : femaleClothesDataLength;

  let hairLength = hairDataLength.length;
  let row3HairColorLength = hairDataLength[row2[3]];

  let clothesLength = clothesDataLength.length;
  let row3ClothesDataLength = clothesDataLength[row2[4]];

  let accessoiresLength = accessoiresDataLength.length;
  let row3AccessoiresDataLength = accessoiresDataLength[row2[5]];

  const closeModal = () => {
    setIsOpen(false);
  };

  const chooseFemale = () => {
    dispatch(setGender("female"));
    closeModal();
  };

  const chooseMale = () => {
    dispatch(setGender("male"));
    closeModal();
  };

  
  const downloadHandler = () => {
    let JSONseed = JSON.stringify(seed);
  };
  

  // Backend func

  useEffect(() => {
    let randomRow2 = [
      Math.floor(Math.random() * bgDataLength),
      Math.floor(Math.random() * skinDataLength),
      Math.floor(Math.random() * mouthDataLength),
      Math.floor(Math.random() * hairLength),
      Math.floor(Math.random() * clothesLength),
      Math.floor(Math.random() * accessoiresLength),
    ];

    let randomRow3 = [
      Math.floor(Math.random() * row3HairColorLength),
      Math.floor(Math.random() * row3ClothesDataLength),
      Math.floor(Math.random() * row3AccessoiresDataLength),
    ];
    dispatch(setRow2(randomRow2));
    dispatch(setRow3(randomRow3));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, refresh, gender]);

  let showModal = modalIsOpen ? "" : styles.modalClose;

  return (
    <main className={styles.App}>
      <div className={`${styles.modal} ${showModal}`}>
        <img
          className={styles.gender}
          src={female}
          alt="female"
          onClick={chooseFemale}
        />
        <img
          className={styles.gender}
          src={male}
          alt="male"
          onClick={chooseMale}
        />
      </div>
      <div className={`${styles.placeholder} ${showModal}`} />

      <img src={titleSVG} alt="title svg" className={styles.mobileTitle} />
      <Generator setRefresh={setRefresh} />
      <div className={styles.container}>
        <img src={titleSVG} alt="title svg" className={styles.title} />
        
        <div className={styles.rowsContainer}>
          <Row1 />
          <Row2 />
          <Row3 />
        </div>
        <div className={styles.downloadContainer}>
          <div onClick={downloadHandler} className={styles.button}>
            <img src={buttonSVG} alt="download button" />
          </div>
          <p>Download your own Miliway as a .png</p>

          <div>
          <h4> {"Get/Set Contract interaction"} </h4>
            <button onClick={connectWalletHandler}>{connButtonText}</button>
            <div>
              <h3>Address: {defaultAccount}</h3>
            </div>
            <form onSubmit={setHandler}>
              <input id="setText" type="text"/>
              <button type={"submit"}> Update Contract </button>
            </form>
            <div>
            <button onClick={getCurrentVal} style={{marginTop: '5em'}}> Get Current Contract Value </button>
            </div>
            {currentContractVal}
            {errorMessage}
          </div>


        </div>
      </div>
    </main>
  );
};

export default App;
