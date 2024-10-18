import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = 'http://app:3000/api/';

// Make axios return the response without throwing an exception regardless of the status code
const AXIOS_CONFIG: AxiosRequestConfig = {
  validateStatus: () => true,
};

/**
 * Class containing wrappers for axios methods.
 * The wrappers will all return the response regardless of status code rather than throwing an exception
 */
export class AxiosTestInstance {
  private baseUrl: string;

  /**
   *
   * @param baseUrl The base url to be used for all requests.
   * Appended to the base url that is used for all endpoints in the app.
   */
  constructor(baseUrl: string) {
    this.baseUrl = encodeURI(BASE_URL + baseUrl);
  }

  private formatUrl(url: string) {
    return encodeURI(`${this.baseUrl}/${url}`);
  }

  /**
   * Makes a GET request
   * @param url The url for the request, relative to the base url
   * @returns The response returned by the request
   */
  async getRequest(url: string) {
    const formattedUrl = this.formatUrl(url);
    return await axios.get(formattedUrl, AXIOS_CONFIG);
  }

  /**
   * Makes a POST request
   * @param url The url for the request, relative to the base url
   * @param requestBody The body of the request
   * @returns The response returned by the request
   */
  async postRequest(url: string, requestBody?: object) {
    const formattedUrl = this.formatUrl(url);
    return await axios.post(formattedUrl, requestBody, AXIOS_CONFIG);
  }

  /**
   * Makes a PUT request
   * @param url The url for the request, relative to the base url
   * @param requestBody The body of the request
   * @returns The response returned by the request
   */
  async putRequest(url: string, requestBody?: object) {
    const formattedUrl = this.formatUrl(url);
    return await axios.put(formattedUrl, requestBody, AXIOS_CONFIG);
  }

  /**
   * Makes a DELETE request
   * @param url The url for the request, relative to the base url
   * @returns The response returned by the request
   */
  async deleteRequest(url: string) {
    const formattedUrl = this.formatUrl(url);
    return await axios.delete(formattedUrl);
  }
}
