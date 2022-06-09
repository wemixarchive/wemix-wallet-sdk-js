import { auth } from "./components/auth";
import { sendWemix } from "./components/sendWemix";
import { sendToken } from "./components/sendToken";
import { sendNFT } from "./components/sendNFT";
import { executeContract } from "./components/executeContract";
import { getResult } from "./components/getResult";
import { SendWemix, SendToken, SendNFT, ContractExecute } from "./constructor";
declare const wemixSDK: {
    auth: typeof auth;
    sendWemix: typeof sendWemix;
    sendToken: typeof sendToken;
    sendNFT: typeof sendNFT;
    executeContract: typeof executeContract;
    getResult: typeof getResult;
    txConstructor: {
        SendWemix: typeof SendWemix;
        SendToken: typeof SendToken;
        SendNFT: typeof SendNFT;
        ContractExecute: typeof ContractExecute;
    };
};
export default wemixSDK;
