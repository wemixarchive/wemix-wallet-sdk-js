import { baseURL } from "../constants";
import { Transaction } from "../type";
import { ERROR_RES, METADATA, PROPOSAL_RES } from "../type";
import { getErrorMsg } from "./getErrorMsg";

export async function proposal(
  metadata: METADATA,
  transaction: Transaction
): Promise<PROPOSAL_RES | ERROR_RES> {
  try {
    // metadata 들어왔는지 검증
    if (!metadata) {
      throw new Error("metadata is required");
    }

    // metadata name 값 들어왔는지 검증
    if (metadata && !metadata.name) {
      throw new Error(`The name of a metadata cannot be ${metadata.name}`);
    }

    // 트랜잭션 from 값 들어왔는지 검증
    if (transaction && !transaction.from) {
      throw new Error(
        `The from of a transaction cannot be ${transaction.from}`
      );
    }

    const bodyData = transaction
      ? { metadata, type: transaction.type, transaction }
      : { metadata, type: "auth" };

    const response = await fetch(baseURL + "/proposal", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
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
