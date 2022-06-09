import { ERROR_RES, RESULT_RES } from "../type";
import { baseURL } from "../constants";
import { getErrorMsg } from "./getErrorMsg";

export async function getResult(
  request_id: string
): Promise<RESULT_RES | ERROR_RES> {
  try {
    const response = await fetch(baseURL + "/result?requestId=" + request_id, {
      headers: {
        Accept: "application/json",
      },
    });
    const res = await response.json();

    if (res.errorMessage) {
      throw new Error(res.errorMessage);
    }

    return {
      status: res?.status,
      address: res?.result?.address,
      tx_hash: res?.result?.transactionHash,
    };
  } catch (error) {
    return { error: getErrorMsg(error) };
  }
}
