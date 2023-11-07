import ky from 'ky'

export const apiRootUrl = import.meta.env.VITE_APP_REST_API ?? ''

if (!apiRootUrl) {
  throw new Error('apiRootUrl is not defined')
}

export const unraidApi = ky.create({
  prefixUrl: apiRootUrl
})

