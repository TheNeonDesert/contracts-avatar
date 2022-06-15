/* eslint-disable camelcase */
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { MockErc20 } from "../typechain/MockErc20";

describe("Avatar", function () {
  let Avatar: Contract;
  let NeonToken: MockErc20;

  const _name = "Avatar";
  const _symbol = "NEONAvatar";

  let owner: SignerWithAddress;
  // addr1: SignerWithAddress,
  // addr2: SignerWithAddress,
  // addrs: SignerWithAddress[]

  beforeEach(async function () {
    const AvatarFactory = await ethers.getContractFactory("Avatar");
    // [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    [owner] = await ethers.getSigners();

    if (process.env.NEON_TOKEN_ADDRESS) {
      const NeonTokenFactory = await ethers.getContractFactory("MockErc20");
      NeonToken = await NeonTokenFactory.deploy();
      const oneEth = ethers.utils.parseUnits("1", 18);
      const twoEth = ethers.utils.parseUnits("2", 18);
      console.log("oneEth:", oneEth);
      await NeonToken.mint(owner.address, twoEth);
      // NeonToken = await ethers.getContractAt(
      //   "NeonToken",
      //   process.env.NEON_TOKEN_ADDRESS
      // );

      Avatar = await AvatarFactory.deploy(NeonToken.address);

      const balance = await NeonToken.balanceOf(owner.address);
      await NeonToken.approve(Avatar.address, oneEth);
      console.log("owner.address:", owner.address);
      console.log("balance:", balance);
    }
  });

  it("Should has the correct name and symbol", async function () {
    expect(await Avatar.name()).to.equal(_name);
    expect(await Avatar.symbol()).to.equal(_symbol);
  });

  it("Allow creation of a character", async function () {
    const c = await Avatar.generateCharacter("Character 1");
    console.log("Avatar.generateCharacter complete", c);
    expect(1).to.equal(2);
  });

  // it("Should mint a token with token ID 1 & 2 to account1", async function () {
  //   const address1 = addr1.address;
  //   await token721.mintTo(address1);
  //   expect(await token721.ownerOf(1)).to.equal(address1);

  //   await token721.mintTo(address1);
  //   expect(await token721.ownerOf(2)).to.equal(address1);

  //   expect(await token721.balanceOf(address1)).to.equal(2);
  // });
});
