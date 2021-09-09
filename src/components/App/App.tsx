/* eslint-disable */
import { useLayoutEffect, useState } from "react"
import { ViaplaySeriesPage } from "types/ViaplayApi"
import { fetchViaplayApi } from "utils/fetchViaplayApi"

export const App = () => {
  const [data, setData] = useState<ViaplaySeriesPage>()
  const [page, setPage] = useState(1)
  useLayoutEffect(() => {
    console.log("RELOADING:", page)
    const controller = new AbortController()

    const getData = async () => {
      const viaplayData = await fetchViaplayApi(controller, page)
      setData(viaplayData)
    }
    getData()

    return () => {
      controller.abort()
    }
  }, [page])

  const next = (): void => {
    setPage((prev) => (prev += 1))
  }
  const prev = (): void => {
    setPage((prev) => (prev -= 1))
  }

  return (
    <div>
      <button type="button" onClick={prev} value="PREV">
        PREV
      </button>
      <button type="button" onClick={next} value="NEXT">
        NEXT
      </button>
      {data?._links["viaplay:sections"].map((sections) => sections.title)}
      {data?._embedded["viaplay:blocks"].map((b) => {
        const { title, _embedded } = b
        return (
          <section>
            <header>
              <h2>{title}</h2>
              <ul>
                {_embedded["viaplay:products"].map((product) => {
                  const {
                    content: {
                      originalTitle,
                      people,
                      images,
                      imdb,
                      series,
                      synopsis,
                    },
                  } = product

                  return (
                    <li>
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
                      <div>
                        Images: <img src={images.boxart.url} alt="Box Image" />
                      </div>
                      <div>IMDB: {imdb?.rating}</div>
                    </li>
                  )
                })}
              </ul>
            </header>
          </section>
        )
      })}
    </div>
  )
}
