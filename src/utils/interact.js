
import { ID4s } from './constants'

export const priceFeedAddress = '0xB40bf553be448345C09891682636cf632a77c419'

export const getPriceFeed = async (contract) => {

  if (contract) {
    try {
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
      console.log({e})
    }
  }
}