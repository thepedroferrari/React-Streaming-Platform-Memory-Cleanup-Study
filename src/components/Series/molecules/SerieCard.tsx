import { useState } from "react"
import { Content } from "types/ViaplayApi"
import { SerieCard as Card } from "../atoms"

interface Props {
  content: Content
}

export const SerieCard = ({
  content: {
    images,
    imdb,
    // originalTitle,
    // parentalRating,
    // people,
    // production,
    series,
    // synopsis,
  },
}: Props) => {
  const [isFocused, setIsFocused] = useState(false)
  const handleFocus = () => {
    setIsFocused(true)
  }
  const handleBlur = () => {
    setIsFocused(false)
  }

  return (
    <Card bg={images.landscape.url} onFocus={handleFocus} onBlur={handleBlur}>
      {isFocused && (
        <footer>
          <div>
            {series.seasons} Season{series.seasons > 1 && "s"}
          </div>

          <div>IMDB: {imdb?.rating}</div>
        </footer>
      )}
    </Card>
  )
}
