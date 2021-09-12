import { EMPTY_SERIE_CARD } from "../../../constants"
import { SerieGrid } from "../atoms"
import { SerieCard } from "./SerieCard"

const emptyBlock = Array.from(Array(4))
  .map((_, i) => ({
    id: i,
    content: EMPTY_SERIE_CARD,
  }))
  .map((item) => <SerieCard key={item.id} content={item.content} />)

export const EmptySeriesCategory = () => (
  <section>
    <header>
      <h2>- - - - - -</h2>
    </header>
    <SerieGrid>{emptyBlock}</SerieGrid>
  </section>
)
