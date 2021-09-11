import { ViaplayBlock } from "types/ViaplayApi"
import { SerieGrid } from "../atoms"
import { SeriesBlocks } from "./SeriesBlocks"

interface Props {
  blocks: ViaplayBlock[]
  next: () => void
}
export const SeriesCategory = ({ blocks, next }: Props) => {
  // We only want to render the block if there is data to be rendered
  if (blocks.length === 0) return null

  return (
    <section>
      <header>
        <h2>{blocks[0].title}</h2>
        <SerieGrid>
          {blocks.map((block) => (
            <SeriesBlocks
              loadNext={next}
              embedded={block._embedded}
              key={block.title}
            />
          ))}
        </SerieGrid>
      </header>
    </section>
  )
}
