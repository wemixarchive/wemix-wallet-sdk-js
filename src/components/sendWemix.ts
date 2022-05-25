import { baseURL } from "../constant";
import { ERROR_RES, METADATA, PROPOSAL_RES, SEND_WEMIX } from "../type";
import { getErrorMsg } from "./getErrorMsg";

export async function sendWemix(
  meta_data: METADATA,
  send_wemix: SEND_WEMIX
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
        type: "send",
        transaction: send_wemix,
      }),
    });
    const res = await response.json();

    return { requestId: res?.requestId };
  } catch (error) {
    return { error: getErrorMsg(error) };
  }
}
