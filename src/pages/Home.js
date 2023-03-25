import {useState, useEffect, useCallback} from 'react'
import { getPriceFeed, priceFeedAddress } from '../utils'
import { useContract } from '../hooks'
import PriceFeed from '../artifacts/contracts/PriceFeeds.sol/PriceFeeds.json'
import { useCelo } from '@celo/react-celo'



const Home = () => {
  const { address } = useCelo()
  const Contract = useContract(PriceFeed.abi, priceFeedAddress)

  const getPriceFeeds = async () => {
    const res = await getPriceFeed(Contract)
    console.log('test method ',res)

  }

  // const getNFTsHandler = useCallback(async () => {
  //
  //   let NFTs = await getNfts(NFTContract)
  //   if (NFTs.length) {
  //     NFTs = NFTs.filter(NFT => NFT.forSale)
  //     setNFTs(NFTs)
  //   }
  //
  // }, [])

  useEffect(() => {
    if (address) {
      getPriceFeeds()
    }
  }, [Contract])


  return (
    <section className="overflow-hidden text-gray-700">
      <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
        <div className="flex flex-wrap -m-1 md:-m-2">

          <div class="marquee">
            <div class="inline-block w-64 bg-gray-100 shadow-md mx-4 rounded-lg animate-marquee">
              Hello 2
            </div>
            <div class="inline-block w-64 bg-gray-100 shadow-md mx-4 rounded-lg animate-marquee">
              Hello 2
            </div>
            <div class="inline-block w-64 bg-gray-100 shadow-md mx-4 rounded-lg animate-marquee">
              Hello 2
            </div>
            <div class="inline-block w-64 bg-gray-100 shadow-md mx-4 rounded-lg animate-marquee">
              Hello 2
            </div>
            <div class="inline-block w-64 bg-gray-100 shadow-md mx-4 rounded-lg animate-marquee">
              Hello 2
            </div>
          </div>


          {/*{NFTs && NFTs.map(nft => <NFTCard nft={nft} key={nft.tokenId} updateUI={updateUI} />)}*/}
        </div>
      </div>
    </section>
  )
}


export default Home