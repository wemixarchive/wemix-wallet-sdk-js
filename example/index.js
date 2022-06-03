import wemixSDK, {
  SendWemix,
  SendToken,
  SendNFT,
  ContractExecute,
} from "../src/index";
import QRCode from "../node_modules/qrcode/lib";
import { abi_sample, explorer_url, params_sample } from "./constants";

// HTML DOM 객체
const authBtn = document.getElementById("auth");
const wemixBtn = document.getElementById("wemix_send");
const tokenBtn = document.getElementById("token_send");
const nftBtn = document.getElementById("nft_send");
const contractBtn = document.getElementById("contract_execute");

const qrContent = document.getElementById("qrcode_content");
const qrCanvas = document.getElementById("qrcode");
const qrDialog = document.getElementById("qrcode_dialog");
const dialogCloseBtn = document.getElementById("qrCloseBtn");

const fromAddress = document.getElementById("from_address");
const toAddress = document.getElementById("to_address");
const reqValue = document.getElementById("request_value");
const reqContract = document.getElementById("contract");
const reqTokenId = document.getElementById("tokenId");
const qrReqBtn = document.getElementById("qr_request");

const valueWrap = document.getElementById("value_wrap");
const contractWrap = document.getElementById("contract_wrap");
const tokenIdWrap = document.getElementById("tokenId_wrap");

const requestContent = document.getElementById("request_content");
const resultContent = document.getElementById("result_content");

// 변수
let from, to, requestValue, contract, tokenId, timer;
let abi = abi_sample;
let params = params_sample;
let event_func = null;

// 요청하는 앱의 서비스 정보
const meta = {
  name: "Wemix JS SDK Sample",
  description: "JS SDK 테스트 요청",
};

// input onChange 설정
fromAddress.addEventListener("change", (e) => {
  from = e.target.value;
});
toAddress.addEventListener("change", (e) => {
  to = e.target.value;
});
reqValue.addEventListener("change", (e) => {
  requestValue = e.target.value;
});
reqContract.addEventListener("change", (e) => {
  contract = e.target.value;
});
reqTokenId.addEventListener("change", (e) => {
  tokenId = e.target.value;
});

/**
 * 변수, input, 결과 데이터 초기화
 */
function resetReqContent() {
  to = "";
  requestValue = 0;
  contract = "";
  tokenId = "";

  toAddress.value = to;
  reqValue.value = requestValue;
  reqContract.value = contract;
  reqTokenId.value = tokenId;

  resultContent.innerText = "";
}
resetReqContent();

/**
 * 요청된 requestId에 대한 결과 확인
 */
function responseWait(requestId, completed) {
  const clearFunc = () => {
    clearInterval(timer);
    qrDialog.style.display = "none";
  };

  // 요청에 대한 결과가 proposal에서 다른 상태로 변경될 때 까지 1초 간격으로 조회
  timer = setInterval(() => {
    wemixSDK.getResult(requestId).then((res) => {
      // wemixSDK.getResult(tmp_reqid).then((res) => {
      if (res.error) {
        clearFunc();
        alert("Error: " + res.error);
        return;
      }

      switch (res.status) {
        case "proposal":
          break;
        case "completed":
          clearFunc();
          completed(res);
          break;
        case "canceled":
          clearFunc();
          alert("사용자 취소");
          break;
        case "expired":
          clearFunc();
          alert("만료");
      }
    });
  }, 1000);
}

/**
 * 지갑앱을 실행하기 위한 URL Scheme을 QRCODE로 보여줌
 */
function showQRCode(requestId) {
  const content = "wemix://wallet?requestId=" + requestId;
  qrContent.innerText = content;
  QRCode.toCanvas(qrCanvas, content);
  qrDialog.style.display = "flex";
}

/**
 * 지갑 인증 요청
 */
function authHandler() {
  // 인증 요청
  wemixSDK.auth(meta).then((res) => {
    // QRCODE
    showQRCode(res.requestId);

    // 인증 성공 시 callback 함수
    const completeCallback = (response) => {
      from = response.address;
      fromAddress.value = response.address;
      resultContent.innerText = "연결된 지갑 주소 : " + response.address;
      alert("지갑 인증 완료");
    };

    // 처리 대기
    responseWait(res.requestId, completeCallback);
  });
}

/**
 * 코인 전송
 */
function sendWemixHandler() {
  // transaction data
  const transaction = new SendWemix(from, to, requestValue);

  // 전송 요청
  wemixSDK.sendWemix(meta, transaction).then((res) => {
    // QRCODE
    showQRCode(res.requestId);

    // 전송 성공 시 callback 함수
    const completeCallback = (response) => {
      resultContent.innerHTML =
        "트랜잭션 해시 : " +
        `<a href="${explorer_url + response.tx_hash}" target="_blank">${
          response.tx_hash
        }</a>`;
      alert("코인 전송 완료");
    };

    // 처리 대기
    responseWait(res.requestId, completeCallback);
  });
}

/**
 * 토큰 전송
 */
function sendTokenHandler() {
  // transaction data
  const transaction = new SendToken(from, to, requestValue, contract);

  // 전송 요청
  wemixSDK.sendToken(meta, transaction).then((res) => {
    // QRCODE
    showQRCode(res.requestId);

    // 전송 성공 시 callback 함수
    const completeCallback = (response) => {
      resultContent.innerHTML =
        "트랜잭션 해시 : " +
        `<a href="${explorer_url + response.tx_hash}" target="_blank">${
          response.tx_hash
        }</a>`;
      alert("토큰 전송 완료");
    };

    // 처리 대기
    responseWait(res.requestId, completeCallback);
  });
}

/**
 * NFT 전송
 */
function sendNFTHandler() {
  // transaction data
  const transaction = new SendNFT(from, to, contract, tokenId);

  // 전송 요청
  wemixSDK.sendNFT(meta, transaction).then((res) => {
    // QRCODE
    showQRCode(res.requestId);

    // 전송 성공 시 callback 함수
    const completeCallback = (response) => {
      resultContent.innerHTML =
        "트랜잭션 해시 : " +
        `<a href="${explorer_url + response.tx_hash}" target="_blank">${
          response.tx_hash
        }</a>`;
      alert("NFT 전송 완료");
    };

    // 처리 대기
    responseWait(res.requestId, completeCallback);
  });
}

/**
 * 컨트랙트 실행
 */
function executeContractHandler() {
  // transaction data
  const transaction = new ContractExecute(from, to, abi, params);

  // 전송 요청
  wemixSDK.executeContract(meta, transaction).then((res) => {
    // QRCODE
    showQRCode(res.requestId);

    // 전송 성공 시 callback 함수
    const completeCallback = (response) => {
      resultContent.innerHTML =
        "트랜잭션 해시 : " +
        `<a href="${explorer_url + response.tx_hash}" target="_blank">${
          response.tx_hash
        }</a>`;
      alert("컨트랙트 실행 완료");
    };

    // 처리 대기
    responseWait(res.requestId, completeCallback);
  });
}

/**
 * html dom display 세팅
 */
function domDisplaySet(type) {
  requestContent.style.display = "block";
  switch (type) {
    case "auth":
      requestContent.style.display = "none";
      break;
    case "sendWemix":
      valueWrap.style.display = "block";
      contractWrap.style.display = "none";
      tokenIdWrap.style.display = "none";
      break;
    case "sendToken":
      valueWrap.style.display = "block";
      contractWrap.style.display = "block";
      tokenIdWrap.style.display = "none";
      break;
    case "sendNFT":
      valueWrap.style.display = "none";
      contractWrap.style.display = "block";
      tokenIdWrap.style.display = "block";
      break;
    default:
      valueWrap.style.display = "none";
      contractWrap.style.display = "none";
      tokenIdWrap.style.display = "none";
  }
}

/**
 * 현재 컨텐츠에 따른 Display 및 event 세팅
 */
function showRequestContent(type) {
  // 요청 버튼의 기존 event 제거
  if (event_func && typeof event_func == "function") {
    qrReqBtn.removeEventListener("click", event_func);
  }
  resetReqContent(); // 변수, input 초기화
  domDisplaySet(type); // html dom display 세팅

  switch (type) {
    case "auth":
      authHandler();
      event_func = null;
      break;
    case "sendWemix":
      qrReqBtn.addEventListener("click", sendWemixHandler);
      event_func = sendWemixHandler;
      break;
    case "sendToken":
      qrReqBtn.addEventListener("click", sendTokenHandler);
      event_func = sendTokenHandler;
      break;
    case "sendNFT":
      qrReqBtn.addEventListener("click", sendNFTHandler);
      event_func = sendNFTHandler;
      break;
    case "contract":
      qrReqBtn.addEventListener("click", executeContractHandler);
      event_func = executeContractHandler;
  }
}

// 컨텐츠 버튼 클릭 이벤트 등록
authBtn.addEventListener("click", () => showRequestContent("auth"));
wemixBtn.addEventListener("click", () => showRequestContent("sendWemix"));
tokenBtn.addEventListener("click", () => showRequestContent("sendToken"));
nftBtn.addEventListener("click", () => showRequestContent("sendNFT"));
contractBtn.addEventListener("click", () => showRequestContent("contract"));

// dialog 닫기 버튼 이벤트 등록
dialogCloseBtn.addEventListener("click", () => {
  clearInterval(timer);
  qrDialog.style.display = "none";
});
