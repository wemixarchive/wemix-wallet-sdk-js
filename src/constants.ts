export let baseURL: string = "https://a2a.test.wemix.com/api/v1/a2a";

export function setBaseURL(newURL: string): void {
  baseURL = newURL;
}
