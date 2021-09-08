import { useLayoutEffect, useState } from "react"
import { ViaplaySeriesPage } from "types/ViaplayApi"
import { fetchViaplayApi } from "utils/fetchViaplayApi"

export const App = () => {
  const [data, setData] = useState<ViaplaySeriesPage>()
  useLayoutEffect(() => {
    const controller = new AbortController()

    const getData = async () => {
      const viaplayData = await fetchViaplayApi(controller)
      setData(viaplayData)
    }
    getData()

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <div>
      {data?._links["viaplay:sections"].map((sections) => sections.title)}
    </div>
  )
}
