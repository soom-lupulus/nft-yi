import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { HexString } from "@openzeppelin/merkle-tree/dist/bytes";

export const generateMerkleProof = async (userAddress: string): Promise<HexString[]> => {
    // 1. 从服务器获取最新白名单
    const result = await fetch('/api/whitelist').then(d => d.json());
    const whitelist = result.data as string[][] || [];

    // 2. 用OpenZeppelin库生成树
    const tree = StandardMerkleTree.of(
        whitelist,
        ["address", "uint256"]
    );

    console.log("Merkle Root:", tree.root);
    console.log("Proof for address 0:", tree.getProof(0)); // 返回 []
    console.log("Is valid?", tree.verify(0, whitelist[0])); // 返回 true

    // 3. 为用户生成证明
    for (const [i, addr] of tree.entries()) {
        if (addr[0] === userAddress) {
            return tree.getProof(i); // 返回hex格式的证明
        }
    }
    throw new Error("Not in whitelist");
}
