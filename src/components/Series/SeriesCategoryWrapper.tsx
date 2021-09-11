import { usePagination } from "hooks"
import { useLayoutEffect, useState } from "react"
import InView from "react-intersection-observer"
import { ViaplayCategoryTitle, ViaplaySeriesPage } from "types/ViaplayApi"
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
 * Renders the first block of data if available, otherwise returns null.
 * In case we don't know how many blocks are there and we want to render them 
 * all, we should consider it as O(n2). Category is similar but not equal to
 * Genre
 * @fires usePagination
 * @fires useLayoutEffect 
 * @fires useState 
 * @fires fetchViaplayApi
 * @emits O(n)

 */
export const SeriesCategoryWrapper = ({ category }: Props) => {
  const { lastPage, next, page, prev } = usePagination()
  const [data, setData] = useState<ViaplaySeriesPage>()
  const [isVisible, setIsVisible] = useState(false)
  const [, setIsLastInPage] = useState(false)

  useLayoutEffect(() => {
    if (!isVisible) return undefined
    const controller = new AbortController()

    const getData = async () => {
      const viaplayData = await fetchViaplayApi(controller, category, page)
      setData(viaplayData)
      if (lastPage.current === -1) {
        lastPage.current = viaplayData._embedded["viaplay:blocks"][0].pageCount
      }
    }
    getData()

    return () => {
      controller.abort()
    }
  }, [isVisible, page, category, lastPage])

  if (!data || data._embedded["viaplay:blocks"].length === 0) return null
  const block = data._embedded["viaplay:blocks"][0]

  return (
    <InView
      as="section"
      onChange={(inView, entry) => {
        console.log("Inview:", category, inView, entry)
        setIsVisible(inView)
      }}>
      <h2>{category}</h2>
      <button type="button" onClick={prev} value="PREV">
        PREV
      </button>
      <button type="button" onClick={next} value="NEXT">
        NEXT
      </button>
      <SeriesCategory
        setIsLastInPage={setIsLastInPage}
        title={block.title}
        embedded={block._embedded}
        key={block.title}
      />
    </InView>
  )
}
