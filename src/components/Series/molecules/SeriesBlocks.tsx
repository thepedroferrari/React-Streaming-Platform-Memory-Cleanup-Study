import InView from "react-intersection-observer"
import { EmbeddedProducts } from "types/ViaplayApi"
import { ITEMS_PER_PAGE } from "../../../constants"
import { SerieCard } from "./SerieCard"

interface Props {
  embedded: EmbeddedProducts
  loadNext: () => void
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
export const SeriesBlocks = ({ embedded, loadNext }: Props) => {
  // We only want to render the block if there is data to be rendered
  if (!embedded?.["viaplay:products"]) return null

  const blocks = embedded["viaplay:products"].map((product, productIdx) => {
    const { content, publicPath } = product
    const isLastInBlock = (productIdx + 1) % ITEMS_PER_PAGE === 0

    return isLastInBlock ? (
      <InView
        triggerOnce
        key={publicPath + product.content.synopsis}
        onChange={(inview) => {
          if (inview) {
            loadNext()
          }
        }}>
        <SerieCard content={content} />
      </InView>
    ) : (
      <SerieCard key={publicPath} content={content} /> || null
    )
  })

  return <>{blocks}</>
}
