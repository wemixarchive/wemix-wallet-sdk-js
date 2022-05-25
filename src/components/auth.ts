import { baseURL } from "../constant";
import { ERROR_RES, METADATA, PROPOSAL_RES } from "../type";
import { getErrorMsg } from "./getErrorMsg";

export async function auth(
  meta_Data: METADATA
): Promise<PROPOSAL_RES | ERROR_RES> {
  try {
    const response = await fetch(baseURL + "/proposal", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        metadata: meta_Data,
        type: "auth",
      }),
    });
    const res = await response.json();

    return { requestId: res?.requestId };
  } catch (error) {
    return { error: getErrorMsg(error) };
  }
}
