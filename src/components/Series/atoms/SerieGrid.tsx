import styled from "styled-components"

export const SerieGrid = styled.div`
  display: grid;
  max-width: calc(100vw - var(--gutter) * 2);
  grid-auto-flow: column;
  overflow-y: scroll;
  grid-column: 1 / -1;

  grid-gap: var(--gutter);
  grid-template-columns: 10px;
  grid-template-rows: minmax(5rem, 1fr);
  grid-auto-flow: column;

  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  margin-bottom: var(--base-size);
  padding-bottom: var(--base-size-one-and-half);

  // 2 items on mobile, 3 between mobile and desktop, 4 on desktop
  // On viaplay website this part can be optimized for weird screens sizes and
  // densities by checking for pixel density and width.
  // the height becomes problematic on a 32:9 screen: https://www.samsung.com/us/computing/monitors/gaming/49--odyssey-g9-gaming-monitor-lc49g95tssnxza/
  grid-auto-columns: calc(50% - var(--gutter) * 2);
  @media screen and (min-width: 26em) {
    grid-auto-columns: calc(100% / 3 - var(--gutter) * 2);
  }
  @media screen and (min-width: 48em) {
    grid-auto-columns: calc(25% - var(--gutter) * 2);
  }

  // Remove the Scrollbar
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  :before,
  :after {
    content: "";
    width: var(--base-size);
  }
`
