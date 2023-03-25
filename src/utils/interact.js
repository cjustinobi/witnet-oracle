
export const priceFeedAddress = '0xA93B1b35FBDC8668b7cE96811522CFc787bc29Be'

export const createNFT = async (NFTContract, NFTURI, price, address) => {
  try {
    return await NFTContract.methods.createNFT(NFTURI, price).send({from: address})
  } catch (e) {
    console.log(e)
  }
}

export const getNfts = async (NFTContract) => {
  try {

    const NFTs = []
    const NFTCount = await NFTContract.methods.getNFTCount().call()

    for (let i = 1; i <= NFTCount; i++) {
      const NFT = new Promise(async (resolve) => {

        const NFTItem = await NFTContract.methods.getNFT(i).call()
        const NFTURI = await NFTContract.methods.tokenURI(i).call()

        // const NFTMeta = await getNFTMeta(NFTURI)

        // resolve({
        //   tokenId: NFTItem._NFTId,
        //   price: NFTItem._price,
        //   seller: NFTItem._seller,
        //   forSale: NFTItem._forSale,
        //   sales: NFTItem._sales,
        //   earnings: NFTItem._earnings,
        //   name: NFTMeta.name,
        //   image: NFTMeta.image,
        //   initialPrice: NFTMeta.price,
        //   description: NFTMeta.description
        // })
      })
      NFTs.push(NFT)
    }
    return Promise.all(NFTs)
  } catch (e) {
    console.log({ e })
  }
}

export const getPriceFeed = async (NFTContract, address) => {

  return await NFTContract.methods.getPriceFeedLastValues('0x21a79821').call()

}


export const getMyNFTs = async (NFTContract, address) => {
  try {

    const NFTCount = await NFTContract.methods.getMyNFTCount(address).call()

    let NFTs = []

    for (let i = 1; i < NFTCount; i++) {
      const NFTItem = await NFTContract.methods.getMyNFTs(i, address).call()

      if (NFTItem._sold) {
        continue
      }

      const NFTURI = await NFTContract.methods.tokenURI(NFTItem._NFTId).call()

      // const NFTMeta = await getNFTMeta(NFTURI)

      // NFTs.push({
      //   tokenId: NFTItem._NFTId,
      //   price: NFTItem._price,
      //   seller: NFTItem._seller,
      //   forSale: NFTItem._forSale,
      //   name: NFTMeta.name,
      //   image: NFTMeta.image,
      //   initialPrice: NFTMeta.price,
      //   description: NFTMeta.description,
      // })
    }

    return NFTs

  } catch (e) {
    console.log(e)
  }
}