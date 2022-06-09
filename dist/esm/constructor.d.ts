export declare class SendWemix {
    from: string;
    to: string;
    value: string;
    constructor(from: string, to: string, value: string);
}
export declare class SendToken {
    from: string;
    to: string;
    value: string;
    contract: string;
    constructor(from: string, to: string, value: string, contract: string);
}
export declare class SendNFT {
    from: string;
    to: string;
    contract: string;
    tokenId: string;
    constructor(from: string, to: string, contract: string, tokenId: string);
}
export declare class ContractExecute {
    from: string;
    to: string;
    abi: string;
    params: string;
    constructor(from: string, contract: string, abi: string, params: string);
}
