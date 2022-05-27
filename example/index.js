import { auth } from "../src/components/auth";
import { getResult } from "../src/components/getResult";
import QRCode from "../node_modules/qrcode/lib";

// 요청하는 앱의 서비스 정보
var meta = {
  name: "Wemix JS SDK Sample",
  description: "JS SDK 테스트 요청",
};

/**
 * WeMix Wallet 에서 인증 완료시 까지 대기
 */
function responseWait(requestType, requestId) {
  var timer = setInterval(() => {
    getResult(requestId).then((res) => {
      if (res.status === "completed") {
        clearInterval(timer);

        if (requestType === "auth") {
          document.getElementById("wallet_address").textContent = res.address;
          alert("지갑 연결 완료");
        }
      } else if (res.status === "canceled") {
        clearInterval(timer);
        alert("사용자취소");
      } else if (res.status === "expired") {
        clearInterval(timer);
        alert("만료");
      } else if (res.error) {
        clearInterval(timer);
        alert("에러");
      }
    });
  }, 1000);
}

document.getElementById("auth").onclick = function () {
  // 인증 요청
  auth(meta).then((res) => {
    // QRCODE
    var content = "wemix://wallet?requestId=" + res.requestId;
    document.getElementById("qrcodd_content").textContent = content;
    QRCode.toCanvas(
      document.getElementById("qrcode"),
      content,
      function (error) {
        if (!error) {
          // 처리 요청 대기
          responseWait("auth", res.requestId);
        }
      }
    );
  });
};
