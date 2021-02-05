import Web3 from 'web3'

import SimpleStorage from './build/contracts/SimpleStorage.json'

const web3 = new Web3('http://127.0.0.1:8545'); // ganache
const ganacheAddress1 = '0xc96a4110AA93879608756A9d22a88614634BD564';

(async () => {
    console.log(`SANITY CHECK should be true: ${await web3.eth.getBalance(ganacheAddress1) !== '0'}`)

    let deployedAddress
    let contract

    // @ts-ignore
    contract = new web3.eth.Contract(SimpleStorage.abi)
    await contract.deploy({data: SimpleStorage.bytecode})
        .send({
            from: ganacheAddress1,
            gas: 1500000,
            gasPrice: '30000000000000'
        }, (err, txHash) => {
            console.log(`TxHash: ${txHash}`)
        })
        .on('receipt', (receipt) => {
            console.log(`Tx Receipt: ${JSON.stringify(receipt, null, 4)}`)
        })
        .then(deployed => {
            console.log(`Deployed contract address: ${deployed.options.address}`)
            deployedAddress = deployed.options.address
        })

    // @ts-ignore
    contract = new web3.eth.Contract(SimpleStorage.abi, deployedAddress)
    contract.methods.set(4)
    .send({
        from: ganacheAddress1,
        gas: 1500000,
        gasPrice: '30000000000000'
    }, (err: any, txHash: any) => {
        console.log(`TxHash: ${txHash}`)
    })
    .on('receipt', (receipt: any) => {
        console.log(`Tx Receipt: ${JSON.stringify(receipt, null, 4)}`)
    })
    .then((receipt: any) => {
        console.log(`Tx Receipt 2: ${JSON.stringify(receipt, null, 4)}`)
    })
})()
