// pages/index.js: Metamask 연결 및 NFT URL 업로드

import { useState } from "react";
import Web3 from "web3";
import HistoryGenerator from "../components/HistoryGenerator";
import CanvasMerger from "../components/CanvasMerger";

export default function Home() {
  const [account, setAccount] = useState(null);
  const [nftData, setNftData] = useState([]);
  const [history, setHistory] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Wallet connection failed", error);
      }
    } else {
      alert("Please install Metamask!");
    }
  };

  const handleNftUpload = (e) => {
    const files = Array.from(e.target.files);
    const newNftData = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setNftData((prev) => [...prev, ...newNftData]);
  };

  return (
    <div>
      <h1>NFT 기반 커뮤니티 생성</h1>
      {!account ? (
        <button onClick={connectWallet}>Metamask 지갑 연결</button>
      ) : (
        <div>
          <p>지갑 주소: {account}</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleNftUpload}
          />
          {nftData.length > 0 && (
            <HistoryGenerator
              nftData={nftData}
              account={account}
              onGenerate={(data) => setHistory(data)}
            />
          )}
          {history && <CanvasMerger nftData={nftData} />}
        </div>
      )}
    </div>
  );
}
