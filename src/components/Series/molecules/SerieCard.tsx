import { Content } from "types/ViaplayApi"
import { SerieCard as Card } from "../atoms"

interface Props {
  content: Content
}

export const SerieCard = ({
  content: {
    images,
    imdb,
    originalTitle,
    // parentalRating,
    people,
    // production,
    series,
    synopsis,
  },
}: Props) => {
  return (
    <Card bg={images.landscape.url}>
      {false && (
        <div style={{ display: "none" }}>
          <div>Title: {originalTitle}</div>
          <div>Series: {series.title}</div>
          <div>
            Synopsis: <p>{synopsis}</p>
          </div>
          <div>
            Actors:{" "}
            {people?.actors?.map((a, i) =>
              i === people?.actors?.length ? a : `${a}, `,
            )}
          </div>
          <div>IMDB: {imdb?.rating}</div>
        </div>
      )}
    </Card>
  )
}
