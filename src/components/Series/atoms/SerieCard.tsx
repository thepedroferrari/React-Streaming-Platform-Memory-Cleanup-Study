import styled from "styled-components"

export const SerieCard = styled.div<{ bg: string }>`
  scroll-snap-align: center;
  display: grid;
  justify-content: center;
  align-items: center;
  border-radius: var(--border-radius);
  background: ${({ bg }) => `url("${bg}")`} no-repeat;
  background-size: cover;
  box-shadow: var(--box-shadow);

  // Controls the aspect-ratio. The old trick is to have a 56.25% padding vert.
  // but newer devices take advantage of a cleaner api with aspect-ratio
  padding-top: 56.25%;
  @supports (aspect-ratio: 16/9) {
    aspect-ratio: 16/9;
    padding: 0;
  }

  transform: translate3d(0);
`
