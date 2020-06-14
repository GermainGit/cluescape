import { Api, ApiConfig, DEFAULT_API_CONFIG } from "../api"

export class Facade {
    apiConfig: ApiConfig
    apiInstance: Api

    constructor(config: ApiConfig = DEFAULT_API_CONFIG, api: Api = new Api()) {
      this.apiConfig = config
      this.apiInstance = api
    }
}
