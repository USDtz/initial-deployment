import { TezosNodeReader, TezosNodeWriter, TezosConseilClient, TezosWalletUtil, setLogLevel, KeyStore, Tzip7ReferenceTokenHelper } from 'conseiljs';

setLogLevel('debug');

const tezosNode = '...';
const conseilServer = { url: '...', apiKey: '...', network: 'mainnet' };
const networkBlockTime = 60 + 1;

function clearRPCOperationGroupHash(hash: string) {
    return hash.replace(/\"/g, '').replace(/\n/, '');
}

async function initAccount(keyStore: KeyStore) {
    if (await TezosNodeReader.isManagerKeyRevealedForAccount(tezosNode, keyStore.publicKeyHash)) { return; }

    const nodeResult = await TezosNodeWriter.sendKeyRevealOperation(tezosNode, keyStore);
    const groupid = clearRPCOperationGroupHash(nodeResult.operationGroupID);
    console.log(`Injected reveal operation with ${groupid}`);

    await TezosConseilClient.awaitOperationConfirmation(conseilServer, conseilServer.network, groupid, 5, networkBlockTime);
}

async function deployTokenContract(keyStore: KeyStore) {
    console.log('deploying a tzip7 token contract');
    const groupid = await Tzip7ReferenceTokenHelper.deployContract(tezosNode, keyStore, 500_000, keyStore.publicKeyHash, true, 0, 150_000, 5_000);
}

async function enableToken(keyStore: KeyStore, contractAddress: string) {
    console.log(`enabling token at ${contractAddress}`);
    const groupid = await Tzip7ReferenceTokenHelper.activateLedger(tezosNode, keyStore, contractAddress, 500_000, 150_000, 1_000);
}

async function mintMinimumBalance(keyStore: KeyStore, contractAddress: string, targetAdmin: string) {
    console.log(`minting minimum balance future admin ${targetAdmin}`);
    const groupid = await Tzip7ReferenceTokenHelper.mint(tezosNode, keyStore, contractAddress, 500_000, targetAdmin, 1, 150_000, 1_000);
}

async function transferAdminRights(keyStore: KeyStore, contractAddress: string, targetAdmin: string) {
    console.log(`transferring ownership to ${targetAdmin}`);
    const groupid = await Tzip7ReferenceTokenHelper.setAdministrator(tezosNode, keyStore, contractAddress, targetAdmin, 500_000, 150_000, 1_000);
}

async function run() {
    let keyStore: KeyStore;
    const contractAddress = 'KT1LN4LPSqTMS7Sd2CJw4bbDGRkMv2t68Fy9';
    const targetAdmin = 'tz1P19MKNTwB7qxoU47bvsu2c3u54vdM8R4m';

    keyStore = await TezosWalletUtil.restoreIdentityWithSecretKey('');
    console.log(`loaded keys for ${keyStore.publicKeyHash}`);

    // step 1
    //await initAccount(keyStore);

    // step 2
    //await deployTokenContract(keyStore);

    // step 3
    //await enableToken(keyStore, contractAddress);

    // step 4
    //await mintMinimumBalance(keyStore, contractAddress, targetAdmin);

    // step 5
    //await transferAdminRights(keyStore, contractAddress, targetAdmin);
}

run();