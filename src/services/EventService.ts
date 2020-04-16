import { ApiClient } from './ApiService'

// const apiClient: AxiosInstance =

class ApiEventService extends ApiClient {
  private path: string

  constructor(_path?: string) {
    super()
    this.path = _path || '/event'
  }

  public getEvents<T = any>(
    axiosConfigOptions?: { [key: string]: any },
    callback: any = (data: T) => data
  ) {
    return this.get(this.path, axiosConfigOptions, (data: T) =>
      callback(data)
    )
  }

  public getEventById<T = any>(
    id: string,
    axiosConfigOptions?: { [key: string]: any },
    callback: any = (data: T) => data
  ) {
    return this.get(`${this.path}/${id}`, axiosConfigOptions, (data: T) =>
      callback(data)
    )
  }

  public postEvent<T = any>(event: T, callback: any = (data: any) => data) {
    return this.post(this.path, event, (data: any) => callback(data))
  }
}

export default new ApiEventService('/event')
