export interface Transaction {
    from: string;
    to?: string;
    value?: string;
    contract?: string;
    tokenId?: string;
    abi?: string;
    params?: string;
    type: string;
}
export interface ERROR_RES {
    error: string;
}
export interface RESULT_RES {
    status: "proposal" | "completed" | "canceled" | "expired";
    address?: string;
    tx_hash?: string;
}
export interface METADATA {
    name: string;
    description: string;
    url: string;
    icon: string;
    successCallback: string;
    failureCallback: string;
}
export interface PROPOSAL_RES {
    requestId: string;
}
export interface SEND_WEMIX {
    from: string;
    to: string;
    value: string;
}
export interface SEND_TOKEN {
    from: string;
    to: string;
    value: string;
    contract: string;
}
export interface SEND_NFT {
    from: string;
    to: string;
    contract: string;
    tokenId: string;
}
export interface CONTRACT_EXECUTE {
    from: string;
    to: string;
    abi: string;
    params: string;
}
