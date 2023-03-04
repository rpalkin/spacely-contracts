import { ethers, network, upgrades } from "hardhat";
import * as fs from "fs";

async function main() {

  const dir = "./deployed";

  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  const GalaxyContract = await ethers.getContractFactory("Galaxy");
  console.log("Deploying Galaxy to " + network.name);

  const [account1] = await ethers.getSigners();

  const GalaxyContractDeploy = await upgrades.deployProxy(
    GalaxyContract,
    [ethers.utils.parseEther("0.1")],
    {initializer: "initialize"}
  );

  await GalaxyContractDeploy.deployed();
  fs.writeFileSync(`${dir}/proxy.txt`, GalaxyContractDeploy.address)
  console.log("Galaxy contract deployed to: " + GalaxyContractDeploy.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
