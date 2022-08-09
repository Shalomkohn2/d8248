export const DOTS = "...";

function usePagination({ currentPage, totalCount, pageSize }) {
  /*
    This hook receives info (Current page, Total count, Page size) from its caller, than uses the info to return the specific array needed to map out the paggination.
  */
  const totalPages = Math.ceil(totalCount / pageSize);

  //-----these are all the special arrays incase there are too few blogs or you are at the first, second, second to last or last page.
  if (totalPages === 1) {
    return [1];
  }
  if (totalPages === 2) {
    return [1, 2];
  }
  if (totalPages === 3) {
    return [1, 2, 3];
  }
  if (currentPage === 1 || currentPage === 2) {
    return [1, 2, 3, DOTS, totalPages];
  }
  if (currentPage === totalPages || currentPage === totalPages - 1) {
    return [1, DOTS, totalPages - 2, totalPages - 1, totalPages];
  }

  //-----these are all other posible arrays other than the special arrays given above.
  for (let i = 2; i < totalPages; i++) {
    if (currentPage === i) {
      return [1, DOTS, i - 1, i, i + 1, DOTS, totalPages];
    }
  }
}

export default usePagination;
