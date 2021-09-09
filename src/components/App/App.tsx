import { useLayoutEffect, useRef, useState } from "react"
import { ViaplaySeriesPage } from "types/ViaplayApi"
import { fetchViaplayApi } from "utils/fetchViaplayApi"

export const App = () => {
  const [data, setData] = useState<ViaplaySeriesPage>()
  const [page, setPage] = useState(1)
  const lastPage = useRef(-1)

  useLayoutEffect(() => {
    const controller = new AbortController()

    const getData = async () => {
      const viaplayData = await fetchViaplayApi(controller, page)
      setData(viaplayData)
      if (lastPage.current === -1) {
        lastPage.current = viaplayData._embedded["viaplay:blocks"][0].pageCount
      }
    }
    getData()

    return () => {
      controller.abort()
    }
  }, [page])

  const next = () =>
    setPage((prevState) =>
      prevState !== lastPage.current && lastPage.current !== -1
        ? prevState + 1
        : 1,
    )

  const prev = () => {
    setPage((prevState) =>
      prevState !== 1 && lastPage.current !== -1
        ? prevState - 1
        : lastPage.current,
    )
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
                        Images: <img src={images.boxart.url} alt="Box Poster" />
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
