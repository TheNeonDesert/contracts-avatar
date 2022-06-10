/* eslint-disable camelcase */
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { Avatar__factory } from "../typechain";

describe("Avatar", function () {
  let Avatar: Avatar__factory;
  let token721: Contract;

  const _name = "Avatar";
  const _symbol = "NEONAvatar";

  let owner: SignerWithAddress,
    addr1: SignerWithAddress,
    addr2: SignerWithAddress,
    addrs: SignerWithAddress[];

  beforeEach(async function () {
    Avatar = await ethers.getContractFactory("Avatar");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    token721 = await Avatar.deploy(_name, _symbol);
  });

  it("Should has the correct name and symbol", async function () {
    expect(await token721.name()).to.equal(_name);
    expect(await token721.symbol()).to.equal(_symbol);
  });

  it("Should mint a token with token ID 1 & 2 to account1", async function () {
    const address1 = addr1.address;
    await token721.mintTo(address1);
    expect(await token721.ownerOf(1)).to.equal(address1);

    await token721.mintTo(address1);
    expect(await token721.ownerOf(2)).to.equal(address1);

    expect(await token721.balanceOf(address1)).to.equal(2);
  });
});
