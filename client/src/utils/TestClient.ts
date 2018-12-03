import * as http from 'http'
import * as https from 'https'
import { GraphQLClient } from 'graphql-request'
import { GraphQLServer } from 'graphql-yoga'
import { server } from './TestServer'

export default class TestClient {
  app: GraphQLServer
  server!: http.Server
  address!: string
  client!: GraphQLClient
  initPromise: Promise<string>
  constructor() {
    this.app = server
    this.initPromise = this.init()
  }
  async init(): Promise<string> {
    if (!this.server) {
      this.server = (await this.app.start({
        port: 0,
        debug: false,
      })) as any
    }
    const { port } = this.server.address() as any
    const protocol = this.server instanceof https.Server ? 'https' : 'http'
    this.address = `${protocol}://127.0.0.1:${port}/`
    this.client = new GraphQLClient(this.address)
    return this.address
  }
  async request<T = any>(
    query: string,
    variables?: any,
    headers?: any,
  ): Promise<any> {
    await this.initPromise
    if (headers) {
      return new GraphQLClient(this.address, { headers }).request(
        query,
        variables,
      )
    }
    return this.client.request<T>(query, variables)
  }
}
