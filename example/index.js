import { auth } from "../src/components/auth";
import { getResult } from "../src/components/getResult";
import QRCode from "../node_modules/qrcode/lib";

// 요청하는 앱의 서비스 정보
var meta = {
  name: "Wemix JS SDK Sample",
  description: "JS SDK 테스트 요청",
};

var dialog = document.getElementById("qrcode_popup");

/**
 * WeMix Wallet 에서 인증 완료시 까지 대기
 */
function responseWait(requestId, completed) {
  var timer = setInterval(() => {
    getResult(requestId).then((res) => {
      if (res.status === "completed") {
        clearInterval(timer);
        dialog.close();

        completed(res);
      } else if (res.status === "canceled") {
        clearInterval(timer);
        dialog.close();

        alert("사용자 취소");
      } else if (res.status === "expired") {
        clearInterval(timer);
        dialog.close();

        alert("만료");
      } else if (res.error) {
        clearInterval(timer);
        dialog.close();

        alert("에러 : " + res.error);
      }
    });
  }, 1000);
}

/**
 * 지갑앱을 실행하기 위한 URL Scheme을  QRCODE 로 보여줌
 */
function showQRCode(requestId) {
  var content = "wemix://wallet?requestId=" + requestId;
  document.getElementById("qrcode_content").textContent = content;
  QRCode.toCanvas(document.getElementById("qrcode"), content);

  dialog.showModal();
}

// 지갑 연결
document.getElementById("auth").onclick = function () {
  // 인증 요청
  auth(meta).then((res) => {
    // QRCODE
    showQRCode(res.requestId);

    // 인증 대기
    responseWait(res.requestId, function (response) {
      document.getElementById("wallet_address").textContent = response.address;
      alert("지갑 연결 완료");
    });
  });
};
