import { Dispatch, SetStateAction } from "react"
import InView from "react-intersection-observer"
import { EmbeddedProducts } from "types/ViaplayApi"
import { ITEMS_PER_PAGE } from "../../../constants"
import { SerieGrid } from "../atoms"
import { SerieCard } from "."

interface Props {
  title: string
  embedded: EmbeddedProducts
  setIsLastInPage: Dispatch<SetStateAction<boolean>>
}

/**
 * @param Props
 * @returns JSX.Element | null
 * @description checks if the Category contain the minimum necessary data to be
 * loaded, then either loads the category block or returns null.
 * It partially renders the content by pagination. Once the last Serie appears
 * in view (caught by the Intersection Observer using the InView component)
 * it should trigger a load on the next page and fill up the data.
 *
 * This component can grow in memory usage really fast in the application, since
 * it is the one responsible to add new series to the browser memory. In a best
 * case scenario we would have loaded in memory only the series that the user
 * can see in their screen at any given moment and remove from the memory the
 * remaining series. This is especially necessary considering TVs/TV boxes.
 *
 * For the sake of a small-scope application I won't worry about such things
 * and treat the resourses with a bit leniency, however IMO it is a must that
 * the developing team spends a good amount of time tinkering a component like
 * this one to perfection
 * @fires InView
 * @emits O(n)
 */
export const SeriesCategory = ({ title, embedded, setIsLastInPage }: Props) => {
  // We only want to render the block if there is data to be rendered
  if (embedded?.["viaplay:products"].length === 0) return null

  return (
    <section>
      <header>
        <h2>{title}</h2>
        <SerieGrid>
          {embedded &&
            embedded["viaplay:products"] &&
            embedded["viaplay:products"].map((product, productIdx) => {
              const { content, publicPath } = product

              const isUseful = (productIdx + 1) % ITEMS_PER_PAGE === 0

              return isUseful ? (
                <InView
                  key={publicPath}
                  onChange={(inView2, entry2) => {
                    console.log("LAST IN PAGE:", title, inView2, entry2)
                    setIsLastInPage(inView2)
                  }}>
                  <SerieCard content={content} />
                </InView>
              ) : (
                <SerieCard key={publicPath} content={content} />
              )
            })}
        </SerieGrid>
      </header>
    </section>
  )
}
