import styled from "styled-components"

interface Props {
  bg: string
  tabIndex?: number
}
export const SerieCard = styled.div.attrs(({ tabIndex = 0 }) => ({
  tabIndex,
}))<Props>`
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
  position: relative;
  footer {
    padding: var(--padding);
    background: rgba(0, 0, 0, 0.66);
    place-content: bottom start;
    position: absolute;
    width: 100%;
    height: 100%;
  }
`
