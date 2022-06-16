import { Transaction } from "../type";
import { ERROR_RES, METADATA, PROPOSAL_RES } from "../type";
export declare function proposal(metadata: METADATA, transaction: Transaction): Promise<PROPOSAL_RES | ERROR_RES>;
