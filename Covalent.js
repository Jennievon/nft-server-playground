const axios = require("axios");

const fetchNFTS = async () => {
  const { data } = await axios.get(
    `https://api.covalenthq.com/v1/42161/address/0x8bacCa9f607025974AbE1c486E45F7CeD02f54Ce/balances_v2/?format=JSON&nft=true&no-nft-fetch=false&key=ckey_e26519be33bb4587a8145b2df06`
  );

  const result = [];

  data.data.items.forEach((asset) => {
    if (asset.type === "nft") {
      console.log(asset);
      const {
        contract_name,
        contract_ticker_symbol,
        contract_address,
        supports_erc,
        nft_data,
      } = asset;
      const schema_type = supports_erc?.pop()?.toUpperCase();

      if (nft_data.length) {
        nft_data.forEach((data) => {
          const { external_data } = data;

          const nftAsset = {
            token_id: data?.token_id,
            name: external_data?.name,
            description: external_data?.description,
            external_link: external_data?.external_url,
            image_original_url: external_data?.image,
            image_preview_url: external_data?.image,
            image_thumbnail_url: external_data?.image,
          };

          result.push(nftAsset);
        });
      }
    }
  });

  console.log(result);
};

module.exports = fetchNFTS;
