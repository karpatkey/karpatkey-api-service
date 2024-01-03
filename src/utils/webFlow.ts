export const getCollectionItems = async (collectionId: string, apiKey: string) => {
  const url = `https://api.webflow.com/collections/${collectionId}/items`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  }

  const result = await (await fetch(url, options)).json()
  return result
}

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export const postCollectionItem = async (collectionId: string, apiKey: string, data: any) => {
  const url = `https://api.webflow.com/collections/${collectionId}/items?live=true&access_token=${apiKey}`
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Accept-Version': '1.0.0',
      'content-type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      fields: {
        _archived: false,
        _draft: false,
        ...data
      }
    })
  }

  const result = await (await fetch(url, options)).json()
  return result
}
