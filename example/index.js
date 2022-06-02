import wemixSDK, { SendWemix, SendToken } from "../src/index";
import QRCode from "../node_modules/qrcode/lib";

// HTML DOM 객체
const authBtn = document.getElementById("auth");
const wemixBtn = document.getElementById("wemix_send");
const tokenBtn = document.getElementById("token_send");
const nftBtn = document.getElementById("nft_send");
const contractBtn = document.getElementById("contract_execute");

const qrContent = document.getElementById("qrcode_content");
const qrCanvas = document.getElementById("qrcode");
const qrDialog = document.getElementById("qrcode_popup");
const dialogBtn = document.getElementById("qrCloseBtn");

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

// request input value
let from, to, requestValue, contract, tokenId, abi, params;

// input onchange
fromAddress.addEventListener("change", (e) => {
  from = e.target.value;
});
toAddress.addEventListener("change", (e) => {
  to = e.target.value;
});
reqValue.addEventListener("change", (e) => {
  requestValue = Number(e.target.value);
});
reqContract.addEventListener("change", (e) => {
  contract = e.target.value;
});
reqTokenId.addEventListener("change", (e) => {
  tokenId = e.target.value;
});

// request content init
resetReqContent();
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

// 요청하는 앱의 서비스 정보
const meta = {
  name: "Wemix JS SDK Sample",
  description: "JS SDK 테스트 요청",
};

/**
 * WeMix Wallet 에서 인증 완료시 까지 대기
 */
function responseWait(requestId, completed) {
  const clearFunc = () => {
    clearInterval(timer);
    qrDialog.close();
  };

  const timer = setInterval(() => {
    wemixSDK.getResult(requestId).then((res) => {
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
 * 지갑앱을 실행하기 위한 URL Scheme을  QRCODE 로 보여줌
 */
function showQRCode(requestId) {
  const content = "wemix://wallet?requestId=" + requestId;
  qrContent.innerText = content;
  QRCode.toCanvas(qrCanvas, content);
  qrDialog.showModal();
}

// 지갑 연결
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
      alert("지갑 연결 완료");
    };

    // 처리 대기
    responseWait(res.requestId, completeCallback);
  });
}

// 코인 전송
function sendWemixHandler() {
  // transcation data
  const transaction = new SendWemix(from, to, requestValue);

  // 전송 요청
  wemixSDK.sendWemix(meta, transaction).then((res) => {
    // QRCODE
    showQRCode(res.requestId);

    // 전송 성공 시 callback 함수
    const completeCallback = (response) => {
      resultContent.innerText = "트랜잭션 해시 : " + response.tx_hash;
      alert("코인 전송 완료");
    };

    // 처리 대기
    responseWait(res.requestId, completeCallback);
  });
}

// 토큰 전송
function sendTokenHandler() {
  // transcation data
  const transaction = new SendToken(from, to, requestValue, contract);

  // 전송 요청
  wemixSDK.sendToken(meta, transaction).then((res) => {
    // QRCODE
    showQRCode(res.requestId);

    // 전송 성공 시 callback 함수
    const completeCallback = (response) => {
      resultContent.innerText = "트랜잭션 해시 : " + response.tx_hash;
      alert("토큰 전송 완료");
    };

    // 처리 대기
    responseWait(res.requestId, completeCallback);
  });
}

// html dom display 세팅
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

function showRequestContent(type) {
  resetReqContent(); // 입력값 초기화
  domDisplaySet(type); // html dom display 세팅

  switch (type) {
    case "auth":
      authHandler();
      break;
    case "sendWemix":
      qrReqBtn.addEventListener("click", sendWemixHandler);
      break;
    case "sendToken":
      qrReqBtn.addEventListener("click", sendTokenHandler);
      break;
  }
}

authBtn.addEventListener("click", () => showRequestContent("auth"));
wemixBtn.addEventListener("click", () => showRequestContent("sendWemix"));
tokenBtn.addEventListener("click", () => showRequestContent("sendToken"));
nftBtn.addEventListener("click", () => showRequestContent("sendNFT"));
contractBtn.addEventListener("click", () => showRequestContent("contract"));

dialogBtn.addEventListener("click", () => qrDialog.close());
