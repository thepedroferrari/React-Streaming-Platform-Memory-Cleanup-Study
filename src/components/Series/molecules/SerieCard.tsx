import { Content } from "types/ViaplayApi"

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
    <>
      <img src={images.landscape.url} alt="Box Poster" loading="lazy" />
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
    </>
  )
}
