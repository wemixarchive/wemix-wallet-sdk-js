# Klip A2A JavaScript SDK

Wemix A2A JavaScript SDK는 Wemix Wallet에 App2App 요청을 간편하게 처리하도록 도와주는 라이브러리입니다.
더 자세한 설명 및 사용 방법은 [개발자 문서](https://xxxx.com/)를 참고해주세요.

## 설치 방법

### npm이용 하는 경우 (node 10 이상 권장)

`npm install wemix-sdk` 혹은 `yarn add wemix-sdk` 커맨드를 통해 설치 후 다음과 같이 ES module import 방식으로 사용할 수 있습니다.

```javascript
import WemixSDK, {
  SendWemix,
  SendToken,
  SendNFT,
  ContractExecute,
} from "wemix-sdk";
```

### 직접 파일을 다운 받아 사용하는 경우 (IIFE Module import)

[다운로드 페이지](https://docs.klipwallet.com/a2a-sdk/a2a-sdk-download)에서 파일을 다운받은 후, 다운 받은 파일을 repository에 복사합니다. HTML 파일에 다음과 같이 스크립트 태그를 삽입합니다.

```html
<script src="./lib/klipSDK-2.0.0.min.js"></script>
```

이후 글로벌 네임스페이스에 선언된 klipSDK 변수를 활용하여 각 메소드에 접근합니다.

```javascript
klipSDK.prepare(...)
klipSDK.request(...)
klipSDK.getResult(...)
klipSDK.getCardList(...)
```

## API

### 개요

App2App 요청은 크게 `prepare`, `request`, `getResult`의 순서로 진행이 됩니다.

- `prepare`는 어떠한 요청을 할지 요청을 정의하는 단계로 총 5가지 종류의 요청이 존재
- `request`는 함수 호출을 통해 Klip으로 화면이 전환되어 실제 서명 프로세스를 진행
- `getResult`는 함수 호출을 통해 결과값을 받고 확인

추가적으로 `getCardList`는 BApp 개발의 편의를 위해 Klip 사용자의 NFT 목록을 받아올 수 있도록 제공되는 함수입니다.

### prepare

App2App 요청을 준비하고 request key를 받습니다.

#### prepare.auth

사용자의 정보를 획득하는 요청입니다.

**Parameters**

| Name        | Type   | Description                                                  |
| ----------- | ------ | ------------------------------------------------------------ |
| bappName    | string | 유저에게 표시될 BApp의 이름                                  |
| successLink | string | 유저 동의과정 완료 후 돌아올 링크 (optional)                 |
| failLink    | string | 유저 동의과정에서 문제가 발생 할 경우 돌아올 링크 (optional) |

**Example**

```javascript
const bappName = "my app";
const successLink = "myApp://...";
const failLink = "myApp://...";
const res = await prepare.auth({ bappName, successLink, failLink });
if (res.err) {
  // 에러 처리
} else if (res.request_key) {
  // request_key 보관
}
```

#### prepare.sendKLAY

유저의 클레이를 특정 주소로 전송하는 요청입니다.

**Parameters**

| Name        | Type   | Description                                                         |
| ----------- | ------ | ------------------------------------------------------------------- |
| bappName    | string | 유저에게 표시될 BApp의 이름                                         |
| to          | string | 받는 사람의 주소                                                    |
| amount      | string | 보낼 클레이 수량 (단위: KLAY, 소수점 최대 6자리 허용)               |
| from        | string | 유저의 클립 계정 주소가 from 주소와 일치하는 경우만 진행 (optional) |
| successLink | string | 유저 동의과정 완료 후 돌아올 링크 (optional)                        |
| failLink    | string | 유저 동의과정에서 문제가 발생 할 경우 돌아올 링크 (optional)        |

**Example**

```javascript
const bappName = "my app";
const from = "0xB21F0285d27beb2373EC...";
const to = "0xD8b1dC332...";
const amount = "13.2";
const successLink = "myApp://...";
const failLink = "myApp://...";
const res = await prepare.sendKLAY({
  bappName,
  from,
  to,
  amount,
  successLink,
  failLink,
});
if (res.err) {
  // 에러 처리
} else if (res.request_key) {
  // request_key 보관
}
```

#### prepare.sendToken

유저가 보유한 토큰을 특정 주소로 전송하는 요청입니다.

**Parameters**

| Name        | Type   | Description                                                         |
| ----------- | ------ | ------------------------------------------------------------------- |
| bappName    | string | 유저에게 표시될 BApp의 이름                                         |
| to          | string | 받는 사람의 주소                                                    |
| amount      | string | 보낼 토큰 수량 (단위: 토큰의 default 단위, 소수점 최대 6자리 허용)  |
| contract    | string | 토큰 컨트랙트 주소                                                  |
| from        | string | 유저의 클립 계정 주소가 from 주소와 일치하는 경우만 진행 (optional) |
| successLink | string | 유저 동의과정 완료 후 돌아올 링크 (optional)                        |
| failLink    | string | 유저 동의과정에서 문제가 발생 할 경우 돌아올 링크 (optional)        |

**Example**

```javascript
const bappName = "my app";
const from = "0xB21F0285d27beb2373EC...";
const to = "0xD8b1dC332...";
const amount = "10.123";
const contract = "0x813FB7677BbBAA...";
const successLink = "myApp://...";
const failLink = "myApp://...";
const res = await prepare.sendToken({
  bappName,
  from,
  to,
  amount,
  contract,
  successLink,
  failLink,
});
if (res.err) {
  // 에러 처리
} else if (res.request_key) {
  // request_key 보관
}
```

#### prepare.sendCard

유저가 보유한 카드(NFT)를 특정 주소로 전송하는 요청입니다.

**Parameters**

| Name        | Type   | Description                                                         |
| ----------- | ------ | ------------------------------------------------------------------- |
| bappName    | string | 유저에게 표시될 BApp의 이름                                         |
| to          | string | 받는 사람의 주소                                                    |
| id          | string | NFT id                                                              |
| contract    | string | NFT 컨트랙트 주소                                                   |
| from        | string | 유저의 클립 계정 주소가 from 주소와 일치하는 경우만 진행 (optional) |
| successLink | string | 유저 동의과정 완료 후 돌아올 링크 (optional)                        |
| failLink    | string | 유저 동의과정에서 문제가 발생 할 경우 돌아올 링크 (optional)        |

**Example**

```javascript
const res = await prepare.sendCard({
  bappName,
  from,
  to,
  id,
  contract,
  successLink,
  failLink,
});
if (res.err) {
  setErrorMsg(res.err);
} else {
  setRequestKey(res.request_key);
}
```

#### prepare.executeContract

유저가 특정 컨트랙트의 함수를 실행하도록 하는 요청입니다.

**Parameters**

| Name        | Type   | Description                                                         |
| ----------- | ------ | ------------------------------------------------------------------- |
| bappName    | string | 유저에게 표시될 BApp의 이름                                         |
| to          | string | 컨트랙트의 주소                                                     |
| value       | string | 컨트랙트 실행하면서 같이 보낼 KLAY 수량 (단위: peb)                 |
| abi         | string | 실행할 함수의 abi                                                   |
| params      | string | 실행할 함수의 인자 목록                                             |
| from        | string | 유저의 클립 계정 주소가 from 주소와 일치하는 경우만 진행 (optional) |
| successLink | string | 유저 동의과정 완료 후 돌아올 링크 (optional)                        |
| failLink    | string | 유저 동의과정에서 문제가 발생 할 경우 돌아올 링크 (optional)        |

**Example**

```javascript
const bappName = "my app";
const from = "0xB21F0285d27beb2373EC...";
const to = "0xD8b1dC332...";
const value = "800000000";
const abi =
  '{"constant":false,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"buyCard","outputs":[],"payable":true,"stateMutability":"payable","type":"function"}';
const params = '["2829"]';
const successLink = "myApp://...";
const failLink = "myApp://...";
const res = await prepare.executeContract({
  bappName,
  from,
  to,
  value,
  abi,
  params,
  successLink,
  failLink,
});
if (res.err) {
  // 에러 처리
} else if (res.request_key) {
  // request_key 보관
}
```

### request

Deep Link를 통해 Klip에 인증 또는 서명을 요청합니다. 만약, 실행 중인 스마트폰 기기에 KakaoTalk이 설치되어 있지 않으면,
자동으로 AppStore의 KakaoTalk 다운로드 화면으로 이동됩니다. prepare 요청을 통해 받은 request key를 인자로 받습니다.

**Parameters**

| Name                     | Type     | Description                                          |
| ------------------------ | -------- | ---------------------------------------------------- |
| requestKey               | String   | 요청 번호                                            |
| onUnsupportedEnvironment | Function | 모바일 환경이 아닌 경우 실행 할 콜백 함수 (optional) |

**Example**

```javascript
request("b37f873d-32ce-4d5d-b72e-08d528e7fb8e", () =>
  alert("모바일 환경에서 실행해주세요")
);
```

### getResult

App2App 요청에 대한 결과를 확인합니다.

**Parameters**

| Name       | Type   | Description |
| ---------- | ------ | ----------- |
| requestKey | String | 요청 번호   |

**Example**

```javascript
getResult("b37f873d-32ce-4d5d-b72e-08d528e7fb8e");
```

### getCardList

사용자의 카드(NFT) 보유 목록을 가져옵니다. 조회하고자 하는 NFT 컨트랙트 주소를 알고 있어야 하며, 클립에서 지원하는 컨트랙트만 가능합니다.

**Parameters**

| Name     | Type   | Description                                                                                                       |
| -------- | ------ | ----------------------------------------------------------------------------------------------------------------- |
| contract | String | 조회할 카드의 컨트랙트 주소                                                                                       |
| eoa      | String | 조회할 사용자 주소                                                                                                |
| cursor   | String | 조회할 커서값입니다. 만약, 조회할 카드의 보유목록이 100개 이상이면, 다음 100개 정보를 받을 수 있습니다.(optional) |

**Example**

```javascript
const contract = "0xB21F0285d27beb2373EC...";
const eoa = "0xD8b1dC332...";
const cursor = "";
getCardList({ contract, eoa, cursor });
```

## 예제 코드

간단한 예제 코드는 [다운로드 페이지](https://docs.klipwallet.com/a2a-sdk/a2a-sdk-download)를 참고해 주세요.

## Directory 구조

```
project
├── dist/
│   ├── klipSDK.js
│   ├── klipSDK-2.0.0.min.js
│── src/
│   ├── config.js
│   ├── index.js
│   ├── web2app-standalone-1.1.1.js
├── example_react/
├── example_vanilla/
├── rollup.config.js
...
```

- `/dist` : 빌드된 파일
- `/src` : 소스
- `/example_react`: 리액트 예제 코드
- `/example_vanilla`: 바닐라 자바스크립트 예제 코드
- `rollup.config.js` : 롤업 설정 파일

## License

[MIT](LICENSE)
