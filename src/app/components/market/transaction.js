import { TonClient, WalletContractV4, internal } from "ton";
import { mnemonicToWalletKey } from "ton-crypto";
import { getHttpEndpoint } from "@orbs-network/ton-access";

export const sendTransaction = async (recipientAddress) => {
    const mnemonic = 'best antique maximum message release fish stove hurdle carpet unfold fade arrive argue rate kidney afford interest truth review brief flee want dream involve'; 
    const key = await mnemonicToWalletKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });
    const endpoint = await getHttpEndpoint({ network: "testnet" });
    const client = new TonClient({ endpoint });

    if (!await client.isContractDeployed(wallet.address)) {
        throw new Error("Wallet is not deployed");
    }

    const walletContract = client.open(wallet);
    const seqno = await walletContract.getSeqno();

    await walletContract.sendTransfer({
        secretKey: key.secretKey,
        seqno: seqno,
        messages: [
            internal({
                to: recipientAddress,
                value: "0.04",
                body: "meow",
                bounce: false
            })
        ]
    });
};