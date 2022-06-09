import { ERROR_RES, METADATA, PROPOSAL_RES, SEND_TOKEN } from "../type";
export declare function sendToken(meta_data: METADATA, send_token: SEND_TOKEN): Promise<PROPOSAL_RES | ERROR_RES>;
