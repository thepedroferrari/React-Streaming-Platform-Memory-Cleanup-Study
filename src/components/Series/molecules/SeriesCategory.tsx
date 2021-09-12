import { ViaplayBlock } from "types/ViaplayApi"
import { SerieGrid } from "../atoms"
import { SeriesBlocks } from "./SeriesBlocks"

interface Props {
  blocks?: ViaplayBlock[]
  next: () => void
}
export const SeriesCategory = ({ blocks, next }: Props) => {
  // We only want to render the block if there is data to be rendered
  if (blocks === undefined || blocks.length === 0) return null

  console.log("BLOCKS:", blocks)
  return (
    <section>
      <header>
        <h2>{blocks[0].title}</h2>
        <SerieGrid>
          {blocks.map((block) => (
            <SeriesBlocks
              loadNext={next}
              embedded={block._embedded}
              key={`${block.id}_${block.currentPage}`}
            />
          ))}
        </SerieGrid>
      </header>
    </section>
  )
}
