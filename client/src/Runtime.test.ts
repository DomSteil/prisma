import { test } from 'ava'
import { Client } from './Client'
import { Model } from './types'
import TestClient from './utils/TestClient';

test('server instantiation', async t => {
  const typeDefs = `
    type Query {
      hello(name: String): String!
    }
  `
  const testClient = new TestClient()
  const endpoint = await testClient.init()

  const models: Model[] = [
    {
      embedded: false,
      name: 'User',
    },
    {
      embedded: false,
      name: 'Post',
    },
  ]

  const client: any = new Client({
    typeDefs,
    endpoint,
    models,
  })

  client.hello()
  
  const document = client.getDocumentForInstructions(
    Object.keys(client._currentInstructions)[0],
  )

  const req = await testClient.request(document)

  t.is(req, null)
})