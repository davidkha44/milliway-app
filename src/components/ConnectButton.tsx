// ConnectButton.tsx
import { useEthers, useEtherBalance } from "@usedapp/core";

export default function ConnectButton() {
  const {activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  function handleConnectWallet() {
    activateBrowserWallet();
  }

  return account ? (
    <div>
      <h5 color="white" >
        // etherBalance will be an object, so we stringify it 
        {etherBalance && JSON.stringify(etherBalance)} ETH
      </h5>
    </div>
  ) : (
    <button onClick={handleConnectWallet}>
      Connect to a wallet
    </button>
  );
}