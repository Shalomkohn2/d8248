import BlogPost from "./BlogPost";
import Pagination from "./Pagination";
import React from "react";
import blogs from "../data/blogs.json";
//-----imported useState.
import { useState } from "react";

const PAGE_SIZES = [15, 25, 50, 100];

function BlogList() {
  //-----putting page size into its own state.
  const [pageSize, setPageSize] = useState(15);
  //-----putting current page into its own state.
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  //-----declaring start and end of currentPaginationData slice;
  const startSlice = pageSize * currentPageNumber - pageSize;
  const endSlice = pageSize * currentPageNumber;
  //-----changed hard coded slice (0, 15) to variables.
  const currentPaginationData = blogs.posts.slice(startSlice, endSlice);
  //-----defining if next and previous buttons are disabled.
  const isOnlyOnePage = blogs.posts.length <= pageSize;
  const isLastPage = startSlice <= blogs.posts.length && endSlice >= blogs.posts.length;
  const isFirstPage = startSlice == 0;
  const isNextDisabled = isLastPage || isOnlyOnePage;
  const isPreviousDisabled = isFirstPage || isOnlyOnePage;

  //-----function for updating page size.
  const updateRowsPerPage = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPageNumber(1);
  };
  //-----function for updating page number.
  const updatePage = (nextPageNumber) => {
    setCurrentPageNumber(nextPageNumber);
  };

  return (
    <div>
      <Pagination
        currentPage={currentPageNumber}
        totalCount={blogs.posts.length}
        pageSize={15}
        pageSizeOptions={PAGE_SIZES}
        onPageChange={updatePage}
        onPageSizeOptionChange={updateRowsPerPage}
        isPreviousDisabled={isPreviousDisabled}
        isNextDisabled={isNextDisabled}
      />
      <ul
        // Do not remove the aria-label below, it is used for Hatchways automation.
        aria-label="blog list"
      >
        {currentPaginationData.map((blog) => (
          <BlogPost
            key={blog.id}
            author={blog.author}
            title={blog.title}
            excerpt={blog.excerpt}
            featureImage={blog.image}
          />
        ))}
      </ul>
    </div>
  );
}

export default BlogList;
