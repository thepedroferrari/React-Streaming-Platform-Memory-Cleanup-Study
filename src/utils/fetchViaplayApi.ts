import {
  ViaplayBlock,
  ViaplayCategoryTitle,
  ViaplaySeriesPage,
} from "types/ViaplayApi"
import { API_URL, SITE_URL } from "../constants"

interface FetchViaplayApi {
  controller: AbortController
  category?: ViaplayCategoryTitle
  page?: number
  url?: string
}

export async function fetchViaplayApi(
  settings: Pick<FetchViaplayApi, "controller" | "category" | "page">,
): Promise<ViaplaySeriesPage>

export async function fetchViaplayApi(
  settings: Pick<FetchViaplayApi, "controller" | "url">,
): Promise<ViaplayBlock>

/**
 * @param controller AbortController
 * @param category ViaplayCategoryTitle
 * @param page number
 * @returns Promisified HTTP Response for the ViaplaySeriesPage
 * @description Fetches the Viaplay API Endpoint for series. Created with a
 * function overloading for the settings to help utilising the function and
 * making it generic.
 * @fires window.fetch
 * @emits O(1)
 */
export async function fetchViaplayApi({
  controller,
  category,
  page,
  url,
}: FetchViaplayApi): Promise<ViaplaySeriesPage | ViaplayBlock> {
  const config: RequestInit = {
    method: "GET",
    signal: controller.signal,
  }

  // Handles the overloading
  const urlToFetch = url || `${API_URL}/${category}?pageNumber=${page}`

  try {
    return await window.fetch(urlToFetch, config).then(async (response) => {
      if (response.status === 401) {
        // refresh the page for the user
        window.location.assign(SITE_URL)
        return Promise.reject(
          new Error("Could not reach the server, please try again later."),
        )
      }

      const data: ViaplaySeriesPage | ViaplayBlock = await response.json()

      if (response.ok) {
        return data
      }
      return Promise.reject(data)
    })
  } catch (error) {
    // Send to DataDog or similar
    if (!controller.signal.aborted) {
      // eslint-disable-next-line no-console
      console.error("Error:", error)
      throw new Error("Error fetching the API while not aborted")
    }
    return Promise.reject(error)
  }
}
