import { baseURL } from "../constant";
import { CONTRACT_EXECUTE, ERROR_RES, METADATA, PROPOSAL_RES } from "../type";
import { getErrorMsg } from "./getErrorMsg";

export async function executeContract(
  meta_data: METADATA,
  contract_execute: CONTRACT_EXECUTE
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
        type: "contract_execute",
        transaction: contract_execute,
      }),
    });
    const res = await response.json();

    return { requestId: res?.requestId };
  } catch (error) {
    return { error: getErrorMsg(error) };
  }
}
