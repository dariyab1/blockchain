//Dariya Beksultan, Mr. Irimina, Period 3/4, Even

const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash=""){
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.previousHash=previousHash;
        this.hash=this.calculateHash();
    }
    calculateHash(){
    return SHA256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)).toString();
}
}

class Blockchain{
    constructor(){
        this.chain=[this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "03/01/2009", "Genesis Block","0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previousHash=this.getLatestBlock().hash;
        newBlock.hash=newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    //v3
    isChainValid(){
        for(let i=1; i<this.chain.length; i++){
            const currentBlock=this.chain[i];
            const prevBlock=this.chain[i-1];
            if(!(prevBlock.hash===currentBlock.previousHash)){
                return false;
            }
            if(!(currentBlock.hash===currentBlock.calculateHash())){
                return false;
            }
        }
        return true;
    }
}


let btCoin=new Blockchain();
btCoin.addBlock(new Block(1, "1/2/2022", {name:"TM", amount:4}));
btCoin.addBlock(new Block(2, "2/2/2022", {name:"TMI", amount:4}));

//v3
btCoin.addBlock(new Block(3, "2/11/2022", {name:"db", amount:2}));
btCoin.addBlock(new Block(4, "2/12/2022", {name:"dbm", amount:1}));

btCoin.chain[1].hash = btCoin.chain[2].calculateHash();
console.log(JSON.stringify(btCoin, null, 4));
console.log("is this chain valid? " + btCoin.isChainValid());
