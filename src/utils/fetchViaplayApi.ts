import { ViaplaySeriesPage } from "types/ViaplayApi"
import { API_URL, SITE_URL } from "../constants"

/**
 * @returns Promisified HTTP Response
 * @description Fetches the Viaplay API Endpoint for series
 * @fires window.fetch
 * @emits O(1)
 */
export const fetchViaplayApi = async () => {
  const controller = new AbortController()
  const config: RequestInit = {
    method: "GET",
    signal: controller.signal,
  }

  try {
    return await window.fetch(API_URL, config).then(async (response) => {
      if (response.status === 401) {
        // refresh the page for the user
        window.location.assign(SITE_URL)
        return Promise.reject({
          message: "Could not reach the server, please try again later.",
        })
      }

      const data: ViaplaySeriesPage = await response.json()

      if (response.ok) return data
      return Promise.reject(data)
    })
  } catch (error) {
    if (!controller.signal.aborted) {
      // Send to DataDog or similar
      // eslint-disable-next-line no-console
      console.error({ error })
    }
    return Promise.reject(error)
  }
}