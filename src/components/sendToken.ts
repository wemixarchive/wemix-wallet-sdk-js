import { baseURL } from "../constant";
import { ERROR_RES, METADATA, PROPOSAL_RES, SEND_TOKEN } from "../type";
import { getErrorMsg } from "./getErrorMsg";

export async function sendToken(
  meta_data: METADATA,
  send_token: SEND_TOKEN
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
        type: "send_token",
        transaction: send_token,
      }),
    });
    const res = await response.json();

    return { requestId: res?.requestId };
  } catch (error) {
    return { error: getErrorMsg(error) };
  }
}
