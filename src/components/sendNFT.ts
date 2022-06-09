import { baseURL } from "../constants";
import { ERROR_RES, METADATA, PROPOSAL_RES, SEND_NFT } from "../type";
import { getErrorMsg } from "./getErrorMsg";

export async function sendNFT(
  meta_data: METADATA,
  send_nft: SEND_NFT
): Promise<PROPOSAL_RES | ERROR_RES> {
  try {
    const response = await fetch(baseURL + "/proposal", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        metadata: meta_data,
        type: "send_nft",
        transaction: send_nft,
      }),
    });

    const res = await response.json();

    if (res.errorMessage) {
      throw new Error(res.errorMessage);
    }

    return { requestId: res?.requestId };
  } catch (error) {
    return { error: getErrorMsg(error) };
  }
}
