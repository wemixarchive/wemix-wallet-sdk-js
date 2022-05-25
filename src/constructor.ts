export class SendWemix {
  from: string;
  to: string;
  value: string;

  constructor(from: string, to: string, value: string) {
    this.from = from;
    this.to = to;
    this.value = value;
  }
}

export class SendToken {
  from: string;
  to: string;
  value: string;
  contract: string;

  constructor(from: string, to: string, value: string, contract: string) {
    this.from = from;
    this.to = to;
    this.value = value;
    this.contract = contract;
  }
}

export class SendNFT {
  from: string;
  to: string;
  contract: string;
  tokenId: string;

  constructor(from: string, to: string, contract: string, tokenId: string) {
    this.from = from;
    this.to = to;
    this.contract = contract;
    this.tokenId = tokenId;
  }
}

export class ContractExecute {
  from: string;
  to: string;
  abi: string;
  params: string;

  constructor(from: string, to: string, abi: string, params: string) {
    this.from = from;
    this.to = to;
    this.abi = abi;
    this.params = params;
  }
}
