import { getResult } from "./components/getResult";
import { proposal } from "./components/proposal";
import { setBaseURL } from "./constants";
import { SendWemix, SendToken, SendNFT, ContractExecute } from "./constructor";
declare const wemixSDK: {
    getResult: typeof getResult;
    proposal: typeof proposal;
    setBaseURL: typeof setBaseURL;
    txConstructor: {
        SendWemix: typeof SendWemix;
        SendToken: typeof SendToken;
        SendNFT: typeof SendNFT;
        ContractExecute: typeof ContractExecute;
    };
};
export default wemixSDK;
