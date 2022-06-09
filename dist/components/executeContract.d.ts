import { CONTRACT_EXECUTE, ERROR_RES, METADATA, PROPOSAL_RES } from "../type";
export declare function executeContract(meta_data: METADATA, contract_execute: CONTRACT_EXECUTE): Promise<PROPOSAL_RES | ERROR_RES>;
