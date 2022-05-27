import wemixSDK from "../src/index";
import QRCode from "../node_modules/qrcode/lib";

// HTML DOM 객체
var authBtn = document.getElementById("auth");
var wemixBtn = document.getElementById("wemix_send");
var tokenBtn = document.getElementById("token_send");
var nftBtn = document.getElementById("nft_send");
var contractBtn = document.getElementById("contract_execute");

var qrContent = document.getElementById("qrcode_content");
var qrCanvas = document.getElementById("qrcode");
var qrDialog = document.getElementById("qrcode_popup");
var dialogBtn = document.getElementById("qrCloseBtn");

var walletAddress = document.getElementById("wallet_address");

// 요청하는 앱의 서비스 정보
var meta = {
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

  var timer = setInterval(() => {
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
  var content = "wemix://wallet?requestId=" + requestId;
  qrContent.innerText = content;
  QRCode.toCanvas(qrCanvas, content);
  console.log(1);
  qrDialog.showModal();
}

// 지갑 연결
function authHandler() {
  // 인증 요청
  wemixSDK.auth(meta).then((res) => {
    // QRCODE
    showQRCode(res.requestId);

    // 인증 대기
    responseWait(res.requestId, function (response) {
      walletAddress.innerText = response.address;
      alert("지갑 연결 완료");
    });
  });
}

function dialogClose() {
  qrDialog.close();
}

authBtn.addEventListener("click", authHandler);

dialogBtn.addEventListener("click", dialogClose);
