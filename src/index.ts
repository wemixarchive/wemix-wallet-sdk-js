import { auth } from "./components/auth";
import { sendWemix } from "./components/sendWemix";
import { sendToken } from "./components/sendToken";
import { sendNFT } from "./components/sendNFT";
import { executeContract } from "./components/executeContract";
import { getResult } from "./components/getResult";
import { SendWemix, SendToken, SendNFT, ContractExecute } from "./constructor";

export default {
  auth,
  sendWemix,
  sendToken,
  sendNFT,
  executeContract,
  getResult,
};
export { SendWemix, SendToken, SendNFT, ContractExecute };
