// default로 메인넷 url 설정
export let baseURL: string = "https://a2a.wemix.com/api/v1/a2a";

export function setBaseURL(newURL: string): void {
  baseURL = newURL;
}
