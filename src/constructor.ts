import { Transaction } from "./type";

export class SendWemix implements Transaction {
  from: string;
  to: string;
  value: string;
  type: string;

  constructor(from: string, to: string, value: string) {
    this.from = from;
    this.to = to;
    this.value = value;
    this.type = "send";
  }
}

export class SendToken implements Transaction {
  from: string;
  to: string;
  value: string;
  contract: string;
  type: string;

  constructor(from: string, to: string, value: string, contract: string) {
    this.from = from;
    this.to = to;
    this.value = value;
    this.contract = contract;
    this.type = "send_token";
  }
}

export class SendNFT implements Transaction {
  from: string;
  to: string;
  contract: string;
  tokenId: string;
  type: string;

  constructor(from: string, to: string, contract: string, tokenId: string) {
    this.from = from;
    this.to = to;
    this.contract = contract;
    this.tokenId = tokenId;
    this.type = "send_nft";
  }
}

export class ContractExecute implements Transaction {
  from: string;
  to: string;
  abi: string;
  params: string;
  type: string;

  constructor(from: string, contract: string, abi: string, params: string) {
    this.from = from;
    this.to = contract;
    this.abi = abi;
    this.params = params;
    this.type = "contract_execute";
  }
}
