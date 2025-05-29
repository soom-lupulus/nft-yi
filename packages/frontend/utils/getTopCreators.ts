import { NFTInfoType } from "@/context/typing";

/**
 * 计算用户中当前正在售卖的NFT，总量价值最高的用户
 * @param creators 所有的NFT数组
 * @returns {address: total_ethers}
 */
export const getTopCreators = (creators: NFTInfoType[]) =>
    creators.reduce((preV, curV) => {
        preV[curV.seller] = preV[curV.seller] ? preV[curV.seller] + Number(curV.price) : Number(curV.price)
        return preV
    }, {} as Record<string, number>)