const connectButton = document.getElementById("connect-button");
const currentAccount = document.getElementById("current-account");
const sendEthers = document.getElementById("send-ethers");

let isWalletConnected;
console.log(isWalletConnected);

async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
        // Request Account
        try {
            let accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
            currentAccount.innerText = accounts[0];
            isWalletConnected = ethereum.isConnected();
            ethereum.on('accountsChanged', (acc) => {
                currentAccount.innerText = acc[0];
            });
        } catch (error) {
            console.log(error);
            if (error.code === 4001) {
                console.log('Please connect to MetaMask.');
            } else {
                console.error(error);
            }
        }

        // Switch to Ethereum Chain
        if (isWalletConnected) {
            try {
                await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: '0x5' }] });
            } catch (error) {
                console.log(error)
            }
        }

    } else {
        console.log("Please Install MetaMask First");
    }
}

connectButton.addEventListener('click', connectWallet);

async function sendTransaction() {
    if (isWalletConnected) {
        const transactionParameters = {
            gasPrice: Number(40 * 1000000000).toString(16), //'0x09184e72a000'  
            gas: Number(21000).toString(16), //'0x5208'
            to: '0x018b28eA884a0988E5d331Aa292443e496238429',
            from: ethereum.selectedAddress,
            value: Number(0.048 * 1000000000000000000).toString(16)
        };
        try {
            let txHash = await ethereum.request({ method: "eth_sendTransaction", params: [transactionParameters] });
            console.log("Transaction Hash: " + txHash);
        } catch (error) {
            console.log(error)
        }
    } else {
        console.log("Connect Your MetaMask Wallet");
    }
}

sendEthers.addEventListener('click', sendTransaction);