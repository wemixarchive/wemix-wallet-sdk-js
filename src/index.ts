import { getResult } from "./components/getResult";
import { proposal } from "./components/proposal";
import { SendWemix, SendToken, SendNFT, ContractExecute } from "./constructor";

const wemixSDK = {
  getResult,
  proposal,
  txConstructor: { SendWemix, SendToken, SendNFT, ContractExecute },
};

export default wemixSDK;
