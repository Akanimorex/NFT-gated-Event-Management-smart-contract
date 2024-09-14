import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";
import { ethers } from "hardhat";

describe("Event", function () {

  let eventCount = 0;
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployEventContractAndNFT() {

    const NFT = await ethers.getContractFactory("SimpleNFT");

    const nft = await NFT.deploy();
   
    // Contracts are deployed using the first signer/account by default
    const [owner, addr1, addr2,addr3] = await ethers.getSigners();

    const Event = await hre.ethers.getContractFactory("Event");
    const eventContract = await Event.deploy();

    return { eventContract, owner, addr1, addr2,addr3,nft};
  }

  describe("Event Creation", function () {

    it("should check for zero address in token address",async function(){
      const { eventContract,owner, addr1, addr2,addr3,nft } = await loadFixture(deployEventContractAndNFT);

      await expect(nft.getAddress()).not.to.be.equal(ethers.ZeroAddress);
    })


    it("should check for empty fields",async function(){
      const { eventContract,owner, addr1, addr2,addr3,nft } = await loadFixture(deployEventContractAndNFT);
      await expect(eventContract.createEvent("web3Lagos","Hello Lagos",0,nft.getAddress())).to.be.revertedWithCustomError(eventContract,"FieldEmpty");
      await expect(eventContract.createEvent("","Hello Lagos",20056204,nft.getAddress())).to.be.revertedWithCustomError(eventContract,"FieldEmpty");
    })

    it("Should create event and mint NFT for event", async function () {
      const { eventContract,owner, addr1, addr2,addr3,nft } = await loadFixture(deployEventContractAndNFT);

     await expect(eventContract.createEvent("web3Lagos","Hello Lagos",242004,nft.getAddress()));

     //addresses mint token
    
    //  await nft.mint(addr1.address);

    //  //should have the particular token the creator wants to be minted

    //  await eventContract.connect(addr1).registerEvent(1,)

    



    });


    describe("Event registration",function(){
      it("should check for zero address in token address",async function(){
        const { eventContract,owner, addr1, addr2,addr3,nft } = await loadFixture(deployEventContractAndNFT);
  
        await expect(nft.getAddress()).not.to.be.equal(ethers.ZeroAddress);
      })


      it("should revert if user dosent select an event",async function(){
        const { eventContract,owner, addr1, addr2,addr3,nft } = await loadFixture(deployEventContractAndNFT);
        
        await (eventContract.createEvent("web3Lagos","Hello Lagos",200000,nft.getAddress()));
        eventCount++;


        // addresses mint token
    
        await nft.mint(addr1.address);

        //should have the particular token the creator wants to be minted

        await expect(eventContract.connect(addr1).registerEvent(4,nft.getAddress())).to.be.revertedWithCustomError(eventContract,"InvalidEvent");

        // const isRegistered =  await eventContract.hasRegistered(addr1,1);

        // expect(isRegistered).to.be.true;


      })


      it("should revert if user is registering twice",async function(){
        const { eventContract,owner, addr1, addr2,addr3,nft } = await loadFixture(deployEventContractAndNFT);
        
        await (eventContract.createEvent("web3Lagos","Hello Lagos",200000,nft.getAddress()));
        eventCount++;


        // addresses mint token
    
        await nft.mint(addr1.address);

        //should have the particular token the creator wants to be minted
        await eventContract.connect(addr1).registerEvent(1,nft.getAddress())

        await expect(eventContract.connect(addr1).registerEvent(1,nft.getAddress())).to.be.revertedWithCustomError(eventContract,"AlreadyRegistered")
        // .to.be.revertedWithCustomError(eventContract,"AlreadyRegistered");

        // const isRegistered =  await eventContract.hasRegistered(addr1,1);

        // expect(isRegistered).to.be.true;


      })


      it("should not allow registration without nft",async function(){
        const { eventContract,owner, addr1, addr2,addr3,nft } = await loadFixture(deployEventContractAndNFT);
        await (eventContract.createEvent("web3Lagos","Hello Lagos",200000,nft.getAddress()));

        // addresses mint token
    
      await nft.mint(addr1.address);

      //should have the particular token the creator wants to be minted

      await expect(eventContract.connect(addr2).registerEvent(1,nft.getAddress())).to.be.revertedWith("user do not own the required nft");

      })

      it("should check if user has registered",async function(){
        const { eventContract,owner, addr1, addr2,addr3,nft } = await loadFixture(deployEventContractAndNFT);
        await (eventContract.createEvent("web3Lagos","Hello Lagos",200000,nft.getAddress()));

        // addresses mint token
    
     await nft.mint(addr1.address);

     //should have the particular token the creator wants to be minted

     await eventContract.connect(addr1).registerEvent(1,nft.getAddress());

     const isRegistered =  await eventContract.hasRegistered(addr1,1);

     expect(isRegistered).to.be.true;


      })


  
    })

   

 


  });


});
