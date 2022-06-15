# Wemix A2A JavaScript SDK

Wemix A2A JavaScript SDK는 Wemix Wallet에 App2App 요청을 간편하게 처리하도록 도와주는 라이브러리입니다.
더 자세한 설명 및 사용 방법은 [개발자 문서](https://www.임시.com/)를 참고해주세요.

## 설치 방법

[다운로드 페이지](https://www.임시.com)에서 파일을 다운받은 후, 다운 받은 파일을 repository에 복사합니다. HTML 파일에 다음과 같이 스크립트 태그를 삽입합니다.

```html
<script src="./lib/wemixSDK.js"></script>
```

ES 모듈 사용 시 아래와 같이 삽입합니다.

```javascript
import wemixSDK from "./lib/wemixSDK.js";
```

이후 (글로벌 네임스페이스에) 선언된 wemixSDK 변수를 활용하여 각 메소드에 접근합니다.

```javascript
wemixSDK.proposal(...)
wemixSDK.getResult(...)
{ SendWemix, SendToken, SendNFT, ContractExecute } = wemixSDK.txConstructor
```

## Example 실행

**parcel 추가**

```
npm install -g parcel-bundler
```

**예제 실행**

```
npm run example
```

## API

### 개요

JavaScript SDK에서 App2App 요청은 크게 `Proposal`, `Result`의 순서로 진행이 됩니다.

- `Proposal`은 DApp에서 실행할 작업을 요청하는 단계로 총 5가지 종류의 요청이 존재
- `Result`는 함수 호출을 통해 결과값을 받고 확인

### Proposal

실행할 App2App 요청을 보내고 request Id를 받습니다.

#### Request Parameter

요청 시 필요한 매개변수

**metadata**

| Key         | Type   | Value                | Required |
| ----------- | ------ | -------------------- | -------- |
| name        | string | DApp 이름            | true     |
| description | string | 요청 설명            | true     |
| url         | string | DApp 대표 URL        | false    |
| icon        | string | DApp 로고 이미지 URL | false    |

Example

```javascript
const meta = {
  name: "Wemix DApp Name",
  description: "JS SDK Test Request",
  url: "대표 URL",
  icon: "로고 이미지 URL",
};
```

**transaction**

| Key      | Type   | Value                                                      | Required |
| -------- | ------ | ---------------------------------------------------------- | -------- |
| from     | string | 전송자의 주소. 지갑 사용자가 맞는지 확인용                 | true     |
| to       | string | 전송 시 수신 주소                                          | false    |
| value    | string | 전송하려는 코인 또는 토큰 수량, 10^18 기준                 | false    |
| contract | string | 토큰 전송, NFT 전송, 컨트랙트 실행 시 해당 컨트랙트의 주소 | false    |
| tokenId  | string | 전송하려는 NFT token Id                                    | false    |
| abi      | string | 스마트 컨트랙트 실행 시 함수의 abi                         | false    |
| params   | string | 스마트 컨트랙트 실행 시 함수 파라미터                      | false    |

Example

```javascript
new SendWemix(from, to, value);
new SendToken(from, to, value, contract);
new SendNFT(from, to, contract, tokenId);
new ContractExecute(from, contract, abi, params);
```

#### Response Parameter

요청시 응답 매개변수

| Key       | Type   | Value               | Required |
| --------- | ------ | ------------------- | -------- |
| requestId | string | App2App 요청 식별자 | true     |

#### Auth

지갑을 인증하는 요청입니다.

**Example**

```javascript
const meta = {...}  // metadata

wemixSDK.proposal(meta).then((res) => {
    if (res.error) {
      // 에러 처리
    } else if (res.requestId) {
      // requestId 보관 및 처리
    }
})
```

#### Send Wemix

유저가 보유한 코인을 특정 주소로 전송하는 요청입니다.

**Example**

```javascript
const meta = {...}
const transaction = new SendWemix(...)

wemixSDK.proposal(meta, transaction).then((res) => {
    if (res.error) {
      // 에러 처리
    } else if (res.requestId) {
      // requestId 보관 및 처리
    }
})
```

#### Send Token

유저가 보유한 토큰을 특정 주소로 전송하는 요청입니다.

**Example**

```javascript
const meta = {...}
const transaction = new SendToken(...)

wemixSDK.proposal(meta, transaction).then((res) => {
    if (res.error) {
      // 에러 처리
    } else if (res.requestId) {
      // requestId 보관 및 처리
    }
})
```

#### Send NFT

유저가 보유한 NFT를 특정 주소로 전송하는 요청입니다.

**Example**

```javascript
const meta = {...}
const transaction = new SendNFT(...)

wemixSDK.proposal(meta, transaction).then((res) => {
    if (res.error) {
      // 에러 처리
    } else if (res.requestId) {
      // requestId 보관 및 처리
    }
})
```

#### Execute Contract

유저가 특정 컨트랙트의 함수를 실행하도록 하는 요청입니다.

**Example**

```javascript
const meta = {...}
const transaction = new ContractExecute(...)

wemixSDK.proposal(meta, transaction).then((res) => {
    if (res.error) {
      // 에러처리
    } else if (res.requestId) {
      // requestId 보관 및 처리
    }
})
```

### Result

App2App 요청에 대한 결과를 확인합니다.

#### Request Parameter

요청 결과 확인 시 필요한 매개변수

| Key       | Type   | Value               | Required |
| --------- | ------ | ------------------- | -------- |
| requestId | string | App2App 요청 식별자 | true     |

#### Response Parameter

요청 결과 확인 시 응답 매개변수

| Key     | Type   | Value                                                                                                                                                                                     | Required |
| ------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| status  | string | 상태 유형<br>&nbsp;&nbsp;&nbsp;• proposal (실행 요청)<br>&nbsp;&nbsp;&nbsp;• completed (실행 완료)<br>&nbsp;&nbsp;&nbsp;• canceled (실행 취소)<br>&nbsp;&nbsp;&nbsp;• expired (시간 만료) | true     |
| address | string | 인증된 지갑 주소                                                                                                                                                                          | false    |
| tx_hash | string | 요청 결과에 대한 트랜잭션 해시                                                                                                                                                            | false    |

#### Get Result

App2App API 요청에 대한 결과를 확인합니다.

**Example**

```javascript
wemixSDK.getResult(requestId).then((res) => {
  if (res.error) {
    // 에러 처리
  } else if (res.status) {
    // status에 따른 처리
  }
});
```

## Directory 구조

```
project
│── dist/
│   ├── esm/
│   │   ├── wemixSDK.js
│   │   └── wemixSDK.min.js
│   ├── wemixSDK.js
│   └── wemixSDK.min.js
│── example/
│   ├── constants.js
│   ├── index.html
│   ├── index.js
│   ├── style.css
│── src/
│   ├── components/
│   │   ├── getErrorMsg.ts
│   │   ├── getResult.ts
│   │   └── proposal.ts
│   ├── constants.ts
│   ├── constructor.ts
│   ├── index.ts
│   └── type.ts
│── package.json
│── rollup.config.js
└── tsconfig.json
```

- `dist/` : 빌드된 파일 (umd 모듈)
- `dist/esm/` : 빌드된 파일 (esm 모듈)
- `example/` : JS SDK 예제 코드
- `src/`: SDK 소스 코드
- `package.json`: 프로젝트 속성 정의
- `rollup.config.js` : 롤업 설정 파일
- `tsconfig.json` : Typescript 설정 파일

## License

[MIT](LICENSE)
