pragma solidity 0.5.16;

//Declares a new contract
contract SimpleStorage {
    //Storage. Persists in between transactions
    uint x;

    //Allows the unsigned integer stored to be changed
    function set(uint newValue) public {
        x = newValue;
    }
    
    //Returns the currently stored unsigned integer
    function get() public view returns (uint) {
        return x;
    }
}