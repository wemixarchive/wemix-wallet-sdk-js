export let baseURL: string = "http://a2a.test.wemix.com/api/v1/a2a";

export function setBaseURL(newURL: string): void {
  baseURL = newURL;
}
