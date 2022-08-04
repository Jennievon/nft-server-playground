const axios = require("axios");
const { Moralis } = require("moralis/node");
const {
  Connection,
  PublicKey,
  Keypair,
  Transaction,
} = require("@solana/web3.js");
const {
  createTransferInstruction,
  createAccount,
  getAssociatedTokenAddress,
  getAccount,
  TokenAccountNotFoundError,
} = require("@solana/spl-token");
const { mnemonicToSeedSync } = require("bip39");
const { derivePath } = require("ed25519-hd-key");
const nacl = require("tweetnacl");

const address = new PublicKey("CyRyKBXNPzTdjvbAjrry3bYp6Ze3fnvyLDJp34GzBdDm");
const mainnet_rpc =
  "https://solana--mainnet.datahub.figment.io/apikey/d7d9844ccf72ad4fef9bc5caaa957a50";
const connection = new Connection(mainnet_rpc, "confirmed");

const serverUrl = "https://ceipzvbghkgv.usemoralis.com:2053/server";
const appId = "aNqGUXCbvGynWKFDat8NXlpv243cf7Vd5lzqxd0S";
const masterKey = "kX7nPRSg5HHkF2935oGjHNcD8GmXgF9FPn6qnwUA";
Moralis.start({ serverUrl, appId, masterKey });

(async () => {
  const nfts = await Moralis.Web3API.account.getNFTs({
    address: "0xaDa3bCCF641DA3b1B1553Ed70E7F38C7ad1b3023",
    chain: "polygon",
  });

  //

  const asd = nfts.result.filter(
    (nft) =>
      nft.token_address === "0x2953399124f0cbb46d2cbacd8a89cf0599974963" &&
      nft.token_id ===
        "79878392158992066930965209155561399463522637681325877961483264265116352349855"
  );

  console.log(asd);
})();

// const options = {
//   network: 'mainnet',
//   address: '4HBeuDKWUyoDASoZNMzhDRmJ7UPTBmq63Lv1pjk3SJrG'
// }

// const setSigner = () => {
//   const mnemonic = 'cotton link merge nerve cram burden gasp parrot muffin umbrella affair question'
//   const seed = mnemonicToSeedSync(mnemonic);
//   const seedAsHex = Buffer.from(seed).toString('hex');
//   const derivedSeed = derivePath(`m/44'/501'/0'/0'`, seedAsHex).key;
//   return Keypair.fromSecretKey(nacl.sign.keyPair.fromSeed(derivedSeed).secretKey)
// }

// const transferNft = async () => {
//   const signer = setSigner();
//   const to = new PublicKey('FroxBMpyJDW58oX1e9UBa8BTDTFsMCgRYyrzT31ap5W');

//   const nftAddress = new PublicKey('3AMYytmk8UUDXZSKcFV5D5xFccNQwfzYeJM4fvMxysZg')
//   const fromTokenAccount = await getAssociatedTokenAddress(nftAddress, signer.publicKey)
//   const toTokenAccount = await getAssociatedTokenAddress(nftAddress, to);

//   try {
//     await getAccount(connection, toTokenAccount)
//   } catch (e) {
//     if (e instanceof TokenAccountNotFoundError) {
//       await createAccount(connection, signer, nftAddress, to)
//     }
//   }

//   const instruction = createTransferInstruction(fromTokenAccount, toTokenAccount, signer.publicKey, 1);
//   const transaction = new Transaction().add(instruction);
//   const hash = await connection.sendTransaction(transaction, [signer])

//   console.log(hash)
// }

// transferNft()

// const fetchNfts = async () => {
//   const nftBalance = await Moralis.SolanaAPI.account.getNFTs(options);

//   nftBalance.forEach(async nft => {
//     const options = {
//       network: 'mainnet',
//       address: nft.mint,
//     };

//     const nftMetadata = await Moralis.SolanaAPI.nft.getNFTMetadata(options);
//     const { data } = await axios.get(nftMetadata.metaplex.metadataUri)

//   })
// }

// fetchNfts()
