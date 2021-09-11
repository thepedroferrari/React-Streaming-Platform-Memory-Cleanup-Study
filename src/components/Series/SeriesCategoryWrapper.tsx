import { usePagination } from "hooks"
import { useLayoutEffect, useState } from "react"
import InView from "react-intersection-observer"
import { ViaplayCategoryTitle, ViaplaySeriesPage } from "types/ViaplayApi"
import { fetchViaplayApi } from "utils/fetchViaplayApi"
import { SeriesCategory } from "./molecules/SeriesCategory"

interface Props {
  category: ViaplayCategoryTitle
}
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

  return (
    <InView
      as="section"
      onChange={(inView, entry) => {
        console.log("Inview:", category, inView, entry)
        setIsVisible(inView)
      }}>
      <h1>{category}</h1>
      <button type="button" onClick={prev} value="PREV">
        PREV
      </button>
      <button type="button" onClick={next} value="NEXT">
        NEXT
      </button>
      {data?._embedded["viaplay:blocks"].map((b) => (
        <SeriesCategory
          setIsLastInPage={setIsLastInPage}
          title={b.title}
          embedded={b._embedded}
          key={b.title}
        />
      ))}
    </InView>
  )
}
