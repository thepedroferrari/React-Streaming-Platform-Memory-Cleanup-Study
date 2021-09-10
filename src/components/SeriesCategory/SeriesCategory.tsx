import { usePagination } from "hooks"
import { useLayoutEffect, useState } from "react"
import InView from "react-intersection-observer"
import { ViaplayCategoryTitle, ViaplaySeriesPage } from "types/ViaplayApi"
import { fetchViaplayApi } from "utils/fetchViaplayApi"
import { ITEMS_PER_PAGE } from "../../constants"

interface Props {
  category: ViaplayCategoryTitle
}
export const SeriesCategory = ({ category }: Props) => {
  const { lastPage, next, page, prev } = usePagination()
  const [data, setData] = useState<ViaplaySeriesPage>()
  const [isVisible, setIsVisible] = useState(false)
  const [isLastInPage, setIsLastInPage] = useState(false)

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
      {data?._embedded["viaplay:blocks"].map((b) => {
        const { title, _embedded } = b
        return (
          <section key={title}>
            <header>
              <h2>{title}</h2>
              <ul
                style={{
                  display: "grid",
                  gridAutoFlow: "column",
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  overflowY: "scroll",
                  maxWidth: "90vw",
                }}>
                {_embedded &&
                  _embedded["viaplay:products"]?.map((product, productIdx) => {
                    const {
                      content: {
                        images,
                        imdb,
                        originalTitle,
                        // parentalRating,
                        people,
                        // production,
                        series,
                        synopsis,
                      },
                      publicPath,
                    } = product

                    const isUseful = (productIdx + 1) % ITEMS_PER_PAGE === 0

                    return isUseful ? (
                      <InView
                        as="li"
                        key={publicPath}
                        onChange={(inView2, entry2) => {
                          console.log(
                            "LAST IN PAGE:",
                            title,
                            inView2,
                            entry2,
                            isLastInPage,
                          )
                          setIsLastInPage(inView2)
                        }}
                        style={{
                          display: "grid",
                          listStyle: "none",
                          margin: 0,
                          padding: 0,
                        }}>
                        <img
                          src={images.landscape.url}
                          alt="Box Poster"
                          loading="lazy"
                        />
                        <div style={{ display: "none" }}>
                          <div>Title: {originalTitle}</div>
                          <div>Series: {series.title}</div>
                          <div>
                            Synopsis: <p>{synopsis}</p>
                          </div>
                          <div>
                            Actors:{" "}
                            {people?.actors?.map((a, i) =>
                              i === people?.actors?.length ? a : `${a}, `,
                            )}
                          </div>
                          <div>IMDB: {imdb?.rating}</div>
                        </div>
                      </InView>
                    ) : (
                      <li
                        key={publicPath}
                        style={{
                          display: "grid",
                          listStyle: "none",
                          margin: 0,
                          padding: 0,
                        }}>
                        <img
                          src={images.landscape.url}
                          alt="Box Poster"
                          loading="lazy"
                        />
                        <div style={{ display: "none" }}>
                          <div>Title: {originalTitle}</div>
                          <div>Series: {series.title}</div>
                          <div>
                            Synopsis: <p>{synopsis}</p>
                          </div>
                          <div>
                            Actors:{" "}
                            {people?.actors?.map((a, i) =>
                              i === people?.actors?.length ? a : `${a}, `,
                            )}
                          </div>
                          <div>IMDB: {imdb?.rating}</div>
                        </div>
                      </li>
                    )
                  })}
              </ul>
            </header>
          </section>
        )
      })}
    </InView>
  )
}
