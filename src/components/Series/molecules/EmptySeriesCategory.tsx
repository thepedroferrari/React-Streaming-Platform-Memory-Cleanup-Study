import { EMPTY_SERIE_CARD } from "../../../constants"
import { SerieGrid } from "../atoms"
import { SerieCard } from "./SerieCard"

const emptyBlock = Array.from(Array(4))
  .map((_, i) => ({
    ...EMPTY_SERIE_CARD,
    parentalRating: i.toString(),
  }))
  .map((item) => (
    <li key={item.parentalRating}>
      <SerieCard content={item} />
    </li>
  ))

export const EmptySeriesCategory = () => (
  <>
    <header>
      <h2>- - - - - -</h2>
    </header>
    <SerieGrid>{emptyBlock}</SerieGrid>
  </>
)
