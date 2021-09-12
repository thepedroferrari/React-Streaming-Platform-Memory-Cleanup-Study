import { usePagination } from "hooks"
import { useLayoutEffect, useState } from "react"
import InView from "react-intersection-observer"
import {
  ViaplayBlock,
  ViaplayCategoryTitle,
  ViaplaySeriesPage,
} from "types/ViaplayApi"
import { fetchViaplayApi } from "utils/fetchViaplayApi"
import { SeriesCategory } from "./molecules/SeriesCategory"

interface Props {
  category: ViaplayCategoryTitle
}

/**
 * @param Props
 * @returns JSX.Element || null
 * @description The wrapper is responsible for organising the logic necessary
 * to its children. Some methods/functions may be passed down or contextualised.
 * Renders the blocks of data if available, otherwise returns null. Blocks
 * are the number of pages and each block contain 10 pages by default.
 * The component should only load when the Intersection Observer can see it,
 * otherwise it should unload from the memory completely saving resources.
 * @fires usePagination
 * @fires useLayoutEffect 
 * @fires useState 
 * @fires fetchViaplayApi
 * @emits O(n²)

 */

export const SeriesCategoryWrapper = ({ category }: Props) => {
  const { nextPageUrl, lastPage, next, page, prev, resetPagination } =
    usePagination()
  const [data, setData] = useState<ViaplaySeriesPage | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useLayoutEffect(() => {
    if (!isVisible) return undefined
    const controller = new AbortController()

    /**
     * @description The fetchdata function is quite generic, and it will allow
     * to fetch for either blocks or full pages.
     * The nextPageUrl can be either a URL (string), null or undefined.
     * If undefined: it means it has never been defined yet, and needs to fetch
     * the entire page.
     * If null: It means we already reached a page where we couldn't find the
     * next url, therefore we want to cease trying to fetch the data.
     * If otherwise (string): Fetch a block since it is much smaller than the
     * entire page.
     *
     * If data is not found, or we're not fetching since it doesn't have a next
     * page, we return immediately.
     * Otherwise we are going to set the data in the component. Each Category
     * will render an entire page, but will add blocks to the viaplay:blocks
     * array.
     * The first load should fetch the Page, the subsequent ones should fetch
     * the data.
     *
     * We start by default on the first page, but the logic also works if we
     * start fetching from a random page, which can help later when we want to
     * unload the data from the memory, but to keep the user where they were
     * before scrolling out.
     *
     * Lastly, it will update the nextPageUrl ref, and if it was the first
     * load, it will set the lastPage ref.
     * @fires fetchViaplayApi
     * @fires setData
     * @emits O(n)
     */
    const getData = async () => {
      /* eslint-disable no-nested-ternary */
      try {
        const fetchedData =
          nextPageUrl.current === undefined
            ? await fetchViaplayApi({ controller, category, page })
            : nextPageUrl.current !== null
            ? await fetchViaplayApi({
                controller,
                url: nextPageUrl.current,
              })
            : null

        if (!fetchedData) return

        setData((prevProps: ViaplaySeriesPage | null) => {
          if (!prevProps) {
            return fetchedData as ViaplaySeriesPage
          }
          return {
            ...prevProps,
            _embedded: {
              ...prevProps._embedded,
              "viaplay:blocks": [
                ...prevProps._embedded["viaplay:blocks"],
                fetchedData as ViaplayBlock,
              ],
            },
          }
        })

        if (lastPage.current === -1) {
          lastPage.current = (fetchedData as ViaplaySeriesPage)._embedded[
            "viaplay:blocks"
          ][0].pageCount
        }

        nextPageUrl.current =
          (fetchedData as ViaplaySeriesPage)?._embedded?.["viaplay:blocks"]?.[0]
            ._links?.next?.href ||
          (fetchedData as ViaplayBlock)?._links?.next?.href ||
          null
      } catch (error) {
        if (!controller.signal.aborted) {
          if (!window.navigator.onLine) {
            // Connection lost, notify the user or handle with available resources
            return
          }
          // eslint-disable-next-line no-console
          console.error("Error:", error)
          throw new Error("Error fetching the API while not aborted")
        }
      }
    }
    getData()

    return () => {
      controller.abort()
    }
  }, [isVisible, page, category, lastPage, nextPageUrl])

  return (
    <InView
      as="section"
      onChange={(inView) => {
        setIsVisible(inView)
        if (!inView && data !== null) {
          // Reset component so it leaves the memory
          resetPagination()
          setData(null)
        }
      }}>
      <button type="button" onClick={prev} value="PREV">
        PREV
      </button>
      <button type="button" onClick={next} value="NEXT">
        NEXT
      </button>

      <SeriesCategory blocks={data?._embedded["viaplay:blocks"]} next={next} />
    </InView>
  )
}
