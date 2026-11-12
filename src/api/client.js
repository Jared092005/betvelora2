const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL

if (!configuredBaseUrl) {
  throw new Error(
    'Falta VITE_API_BASE_URL. Crea un archivo .env con la URL de la API.',
  )
}

export const API_BASE_URL = configuredBaseUrl.replace(/\/+$/, '')
export const API_BRAND = import.meta.env.VITE_API_BRAND || '12'

export class ApiError extends Error {
  constructor(message, status = 0) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

function buildUrl(path, params) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const url = new URL(`${API_BASE_URL}${normalizedPath}`)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') return
      url.searchParams.set(key, String(value))
    })
  }

  return url.toString()
}

export async function request(path, { params, signal, ...init } = {}) {
  let response

  try {
    response = await fetch(buildUrl(path, params), {
      ...init,
      signal,
      headers: {
        Accept: 'application/json',
        Brand: API_BRAND,
        'X-Requested-With': 'XMLHttpRequest',
        ...init.headers,
      },
    })
  } catch (error) {
    if (error?.name === 'AbortError') throw error
    throw new ApiError('No se pudo conectar con el servidor.')
  }

  let payload

  try {
    payload = await response.json()
  } catch {
    throw new ApiError('La respuesta del servidor no es válida.', response.status)
  }

  if (!response.ok) {
    throw new ApiError(
      typeof payload?.message === 'string' ? payload.message : 'No se pudo completar la petición.',
      response.status,
    )
  }

  if (!payload || payload.status !== true) {
    throw new ApiError(
      typeof payload?.message === 'string' ? payload.message : 'La API devolvió un error.',
      response.status,
    )
  }

  return payload.message
}
