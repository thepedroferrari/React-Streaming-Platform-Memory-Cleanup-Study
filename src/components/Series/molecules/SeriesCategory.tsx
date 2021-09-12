import { ViaplayBlock } from "types/ViaplayApi"
import { SerieGrid } from "../atoms"
import { EmptySeriesCategory } from "./EmptySeriesCategory"
import { SeriesBlocks } from "./SeriesBlocks"

interface Props {
  blocks?: ViaplayBlock[]
  next: () => void
}

export const SeriesCategory = ({ blocks, next }: Props) => {
  // We only want to render the block if there is data to be rendered
  if (blocks === undefined || blocks.length === 0) {
    return <EmptySeriesCategory />
  }

  return (
    <>
      <header>
        <h2>{blocks[0].title}</h2>
      </header>
      <SerieGrid>
        {blocks.map((block) => (
          <SeriesBlocks
            loadNext={next}
            embedded={block._embedded}
            key={`${block.id}_${block.currentPage}`}
          />
        ))}
      </SerieGrid>
    </>
  )
}
