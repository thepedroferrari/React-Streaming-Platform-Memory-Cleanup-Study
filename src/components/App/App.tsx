import { SeriesCategory } from "components/SeriesCategory"
import { CATEGORIES } from "../../constants"

export const App = () => {
  return (
    <div>
      {CATEGORIES.map((category) => (
        <SeriesCategory category={category} />
      ))}
    </div>
  )
}
