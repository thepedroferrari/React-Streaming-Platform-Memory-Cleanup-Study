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
  const { nextPageUrl, lastPage, next, page, prev } = usePagination()
  const [data, setData] = useState<ViaplaySeriesPage | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useLayoutEffect(() => {
    if (!isVisible) return undefined
    const controller = new AbortController()
    console.log(nextPageUrl.current)

    const getData = async () => {
      // Should query different parts when I only need update chunks, but
      // am going to simplify and always get the full page here for the sake of
      // speed
      const fetchedData =
        nextPageUrl.current !== null
          ? await fetchViaplayApi({
              controller,
              url: nextPageUrl.current,
            })
          : await fetchViaplayApi({ controller, category, page })
      // setData(fetchedData)

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
        nextPageUrl.current === null
          ? (fetchedData as ViaplaySeriesPage)._embedded["viaplay:blocks"][0]
              ._links.next.href
          : (fetchedData as ViaplayBlock)._links.next.href
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
      }}>
      <h1>{category}</h1>
      <button type="button" onClick={prev} value="PREV">
        PREV
      </button>
      <button type="button" onClick={next} value="NEXT">
        NEXT
      </button>
      {data?._embedded["viaplay:blocks"] && (
        <SeriesCategory blocks={data._embedded["viaplay:blocks"]} next={next} />
      )}
    </InView>
  )
}
