import { SeriesCategoryWrapper } from "components/Series"
import { CATEGORIES } from "../../constants"

export const App = () => {
  return (
    <>
      {CATEGORIES.map((category) => (
        <SeriesCategoryWrapper key={category} category={category} />
      ))}
    </>
  )
}
