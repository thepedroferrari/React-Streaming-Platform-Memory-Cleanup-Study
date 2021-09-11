import { SeriesWrapper } from "components/Series"
import { CATEGORIES } from "../../constants"

export const App = () => {
  return (
    <div>
      {CATEGORIES.map((category) => (
        <SeriesWrapper key={category} category={category} />
      ))}
    </div>
  )
}
