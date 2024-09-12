import axios from "axios";

export class HttpAdapter {
  async post(url: string, data: any, config?: any) {
    return axios.post(url, data, config);
  }

  async get(url: string, config?: any) {
    return axios.get(url, config);
  }

  async put(url: string, data: any, config?: any) {
    return axios.put(url, data, config);
  }

  async delete(url: string, config?: any) {
    return axios.delete(url, config);
  }

  async patch(url: string, data: any, config?: any) {
    return axios.patch(url, data, config);
  }
}
