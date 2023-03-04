import { ethers, network, upgrades } from "hardhat";
import * as fs from "fs";

async function main() {

  const dir = "./deployed";

  const deployedProxyAddress = fs.readFileSync(`${dir}/proxy.txt`, { encoding: "utf-8" });

  console.log('Galaxy Contract Proxy Address: ' + deployedProxyAddress)

  const UpgradeGalaxyContract = await ethers.getContractFactory("GalaxyV2")
  console.log("Upgrading Galaxy at " + network.name);

  await upgrades.upgradeProxy(
    deployedProxyAddress, UpgradeGalaxyContract
  );

  console.log("Galaxy contract upgraded")
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
