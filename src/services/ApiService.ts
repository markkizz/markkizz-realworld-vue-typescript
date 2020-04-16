import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import NProgress from 'nprogress'

export class ApiClient {
  protected service: AxiosInstance

  constructor() {
    const _service = axios.create({
      baseURL: process.env.BASE_URL || `http://localhost:3000`,
      withCredentials: false, // This is the default
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })

    _service.interceptors.request.use((config: AxiosRequestConfig) => {
      NProgress.start()
      return config
    })

    _service.interceptors.response.use((response: AxiosResponse) => {
      NProgress.done()
      return response
    })

    this.service = _service
  }

  public get<T>(
    path: string,
    options: { [key: string]: any },
    callback: any = (response: AxiosResponse<T>) => response
  ) {
    return this.service
      .get(path, options)
      .then(({ data }) => callback(data))
      .catch((err) => this.handleErrors(err))
  }

  public async post<T = any>(
    path: string,
    payload?: T,
    callback: any = (response: AxiosResponse<T>) => response
  ) {
    return this.service
      .request({
        method: 'POST',
        url: path,
        data: payload
      })
      .then((response: AxiosResponse) => callback(response.data))
      .catch((err) => this.handleErrors(err))
  }

  public async patch<T = any>(
    path: string,
    payload?: T,
    callback: any = (response: AxiosResponse) => response
  ) {
    return this.service
      .request({
        method: 'PATCH',
        url: path,
        data: payload
      })
      .then((response: AxiosResponse) => callback(response.data))
      .catch((err) => this.handleErrors(err))
  }

  public async put<T = any>(
    path: string,
    payload?: T,
    callback: any = (response: AxiosResponse) => response as Data
  ) {
    return this.service
      .request({
        method: 'PUT',
        url: path,
        data: payload
      })
      .then((response: AxiosResponse) => callback(response.data))
      .catch((err) => this.handleErrors(err))
  }

  public async delete<T = any>(
    path: string,
    payload?: T,
    callback: any = (response: AxiosResponse) => response
  ) {
    return this.service
      .request({ method: 'DELETE', url: path, data: payload })
      .then((response: AxiosResponse) => callback(response.data))
      .catch((err) => this.handleErrors(err))
  }

  public handleErrors(error: AxiosError) {
    console.error(error)
    throw { error }
  }
}

export default new ApiClient()
