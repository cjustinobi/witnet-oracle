
import { ID4s } from './constants'

export const priceFeedAddress = '0xFDBa5E9544411E19C5B4809Df0DE7337DCC67b64'

export const createNFT = async (NFTContract, NFTURI, price, address) => {
  try {
    return await NFTContract.methods.createNFT(NFTURI, price).send({from: address})
  } catch (e) {
    console.log(e)
  }
}

export const getPriceFeed = async (contract) => {
  console.log('contract ', contract)
  try {
    // let values = ID4s.map(obj => "0x" + Object.values(obj)[0].toString(16))
    let values = ID4s.map(item => item.value)
    values = values.map(item => '0x' + item.toString(16));

    let priceFeeds = []

    for (let i = 0; i < ID4s.length; i++) {
      const priceFeed = new Promise(async (resolve) => {

        const priceFeed = await contract.methods.getPriceFeedLastValues(values[i]).call()
        resolve({
          price: (priceFeed._lastPrices / 1000000).toFixed(2),
          caption: ID4s[i].caption
        })
      })
      priceFeeds.push(priceFeed)
    }
    return Promise.all(priceFeeds)
  } catch (e) {
    console.log({ e })
  }
}