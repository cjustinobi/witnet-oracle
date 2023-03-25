import {useState, useEffect} from 'react'
import { getPriceFeed, priceFeedAddress } from '../utils'
import { useContract } from '../hooks'
import PriceFeed from '../artifacts/contracts/PriceFeeds.sol/PriceFeeds.json'
import { useCelo } from '@celo/react-celo'



const Home = () => {

  const { address } = useCelo()
  const Contract = useContract(PriceFeed.abi, priceFeedAddress)

  const [feeds, setFeeds] = useState()

  const getPriceFeeds = async () => {
    const res = await getPriceFeed(Contract)
    setFeeds(res)
  }

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
            {feeds && feeds.map(feed => <div class="inline-block w-64 bg-gray-100 shadow-md mx-4 rounded-lg animate-marquee">
              {feed.price}
              {feed.caption}
            </div>)}
          </div>
        </div>
      </div>
    </section>
  )
}


export default Home