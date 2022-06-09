import { ERROR_RES, METADATA, PROPOSAL_RES, SEND_NFT } from "../type";
export declare function sendNFT(meta_data: METADATA, send_nft: SEND_NFT): Promise<PROPOSAL_RES | ERROR_RES>;
