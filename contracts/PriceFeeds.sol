// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "witnet-solidity-bridge/contracts/interfaces/IWitnetPriceRouter.sol";
import "witnet-solidity-bridge/contracts/interfaces/IWitnetPriceFeed.sol";

contract PriceFeeds {
    IWitnetPriceRouter public immutable witnetPriceRouter;
    mapping(bytes4 => IWitnetPriceFeed) public priceFeeds;
    bytes4[] ID4;

    constructor(IWitnetPriceRouter _router, bytes4[] memory _ID4) {
        witnetPriceRouter = _router;
        ID4 = _ID4;
        updatePriceFeeds();
    }

    function updatePriceFeeds() public {
        for (uint256 i = 0; i < ID4.length; i++) {
            bytes4 _ID4 = ID4[i];
            IERC165 _newPriceFeed = witnetPriceRouter.getPriceFeed(bytes4(_ID4));
            if (address(_newPriceFeed) != address(0)) {
                priceFeeds[_ID4] = IWitnetPriceFeed(address(_newPriceFeed));
            }
        }
    }

    function getPriceFeedLastValues(bytes4 _ID4) public view returns (int256 _lastPrices, uint256 _lastTimestamps) {
        IWitnetPriceFeed priceFeed = priceFeeds[_ID4];
        (int256 lastPrice, uint256 lastTimestamp, , ) = priceFeed.lastValue();

        _lastPrices = lastPrice;
        _lastTimestamps = lastTimestamp;
    }
}
