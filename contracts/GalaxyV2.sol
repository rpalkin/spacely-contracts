// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract GalaxyV2 is Initializable, ERC1155Upgradeable, OwnableUpgradeable, UUPSUpgradeable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    struct Token {
        uint256 likes;
        string uri;
    }

    mapping (uint256 => Token) private _tokens;

    uint256 _mintFee;


    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(uint256 newMintFee) initializer public {
        _mintFee = newMintFee;
        __ERC1155_init("");
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    function setMintFee(uint256 newMintFee) public onlyOwner {
        _mintFee = newMintFee + 2;
    }

    function getMintFee() public view returns (uint256) {
        return _mintFee;
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        onlyOwner
        override
    {}
}