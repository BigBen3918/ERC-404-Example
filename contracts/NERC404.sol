//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Importing the ERC404 contract as the base and OpenZeppelin's Strings library for string operations
import "./ERC404.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// My404 contract inherits ERC404 to create a custom token with both ERC-20 and ERC-721 features
contract NERC404 is ERC404 {
    // Public variables to store URIs for token metadata
    string public dataURI;
    string public baseTokenURI;

    // Constructor to initialize the contract with token details and owner's initial balance
    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimal,
        uint256 _todalSupply,
        address _owner
    ) ERC404(_name, _symbol, _decimal, _todalSupply, _owner) {
        balanceOf[_owner] = _todalSupply * 10 ** 18; // Setting the initial balance of tokens for the owner
    }

    // Function to set the data URI, which can be used for additional metadata (change as needed)
    function setDataURI(string memory _dataURI) public onlyOwner {
        dataURI = _dataURI;
    }

    // Function to set the base URI for token metadata; this can be an IPFS link (changeable by the owner)
    function setTokenURI(string memory _tokenURI) public onlyOwner {
        baseTokenURI = _tokenURI;
    }

    // Allows the owner to update the token's name and symbol post-deployment (optional flexibility)
    function setNameSymbol(
        string memory _name,
        string memory _symbol
    ) public onlyOwner {
        _setNameSymbol(_name, _symbol);
    }

    // Override of the tokenURI function to return the base URI for token metadata; users can implement logic to return unique URIs per token ID
    function tokenURI(uint256 id) public view override returns (string memory) {
        // Potential place to append the token ID to the base URI for unique metadata per token
        // For now, it simply returns the base URI for all tokens
        return baseTokenURI;
    }
}
