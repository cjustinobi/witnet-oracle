// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "witnet-solidity-bridge/contracts/interfaces/IWitnetPriceRouter.sol";
import "witnet-solidity-bridge/contracts/interfaces/IWitnetPriceFeed.sol";

contract PriceFeeds {
    IWitnetPriceRouter public witnetPriceRouter;
    mapping(bytes4 => IWitnetPriceFeed) public priceFeeds;
    bytes4[] ID4;
    uint256 public lastUpdateTime;

    constructor(IWitnetPriceRouter _router, bytes4[] memory _ID4) {
        witnetPriceRouter = _router;
        ID4 = _ID4;
        lastUpdateTime = block.timestamp;
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

    function checkAndUpdatePriceFeeds() public {
        if (block.timestamp >= lastUpdateTime + 60) { // Check if a minute has passed
            updatePriceFeeds();
            lastUpdateTime = block.timestamp; // Update last update time
        }
    }


    function getPriceFeedLastValues(bytes4 _ID4) public returns (int256 _lastPrices, uint256 _lastTimestamps) {
        checkAndUpdatePriceFeeds();
        IWitnetPriceFeed priceFeed = priceFeeds[_ID4];
        (int256 lastPrice, uint256 lastTimestamp, , ) = priceFeed.lastValue();

        _lastPrices = lastPrice;
        _lastTimestamps = lastTimestamp;
    }
}
