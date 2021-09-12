import { useRef, useState } from "react"

/**
 * @returns lastPage: useRef number
 * @returns next: updates page += 1
 * @returns page: number
 * @returns prev: updates page -= 1
 * @returns updateLastPage: updates the last page available (default -1)
 * @fires useState
 * @fires useRef
 * @emits O(1)
 */
export const usePagination = () => {
  const [page, setPage] = useState(1)
  const lastPage = useRef(-1)
  const nextPageUrl = useRef<string | null | undefined>(undefined)

  const next = () =>
    setPage((prevState) =>
      prevState !== lastPage.current && lastPage.current !== -1
        ? prevState + 1
        : 1,
    )

  const prev = () =>
    setPage((prevState) =>
      prevState !== 1 && lastPage.current !== -1
        ? prevState - 1
        : lastPage.current,
    )

  const resetPagination = () => {
    lastPage.current = -1
    nextPageUrl.current = undefined
    // We are always adding data afterwards in the list, so we must always
    // load the first page. We should instead detect the order of the
    // linked list by currentPage and add the block to the correct place
    // in the array. When that is ready, we won't need to reset the page
    setPage(-1)
  }

  const updateLastPage = (pageCount: number) => {
    lastPage.current = pageCount
  }

  return {
    nextPageUrl,
    lastPage,
    next,
    page,
    prev,
    resetPagination,
    updateLastPage,
  }
}
