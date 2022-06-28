import { getResult } from "./components/getResult";
import { proposal } from "./components/proposal";
import { setBaseURL } from "./constants";
import { SendWemix, SendToken, SendNFT, ContractExecute } from "./constructor";

const wemixSDK = {
  getResult,
  proposal,
  setBaseURL,
  txConstructor: { SendWemix, SendToken, SendNFT, ContractExecute },
};

export default wemixSDK;
