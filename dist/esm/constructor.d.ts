import { Transaction } from "./type";
export declare class SendWemix implements Transaction {
    from: string;
    to: string;
    value: string;
    type: string;
    constructor(from: string, to: string, value: string);
}
export declare class SendToken implements Transaction {
    from: string;
    to: string;
    value: string;
    contract: string;
    type: string;
    constructor(from: string, to: string, value: string, contract: string);
}
export declare class SendNFT implements Transaction {
    from: string;
    to: string;
    contract: string;
    tokenId: string;
    type: string;
    constructor(from: string, to: string, contract: string, tokenId: string);
}
export declare class ContractExecute implements Transaction {
    from: string;
    to: string;
    abi: string;
    params: string;
    type: string;
    constructor(from: string, contract: string, abi: string, params: string);
}
