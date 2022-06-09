import { ERROR_RES, METADATA, PROPOSAL_RES, SEND_WEMIX } from "../type";
export declare function sendWemix(meta_data: METADATA, send_wemix: SEND_WEMIX): Promise<PROPOSAL_RES | ERROR_RES>;
