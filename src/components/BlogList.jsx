import BlogPost from "./BlogPost";
import Pagination from "./Pagination";
import React from "react";
import blogs from "../data/blogs.json";
import { useState } from "react";
import { useEffect } from "react";

const PAGE_SIZES = [15, 25, 50, 100];

function BlogList() {
  const [pageSize, setPageSize] = useState(15);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [startSlice, setStartSlice] = useState(pageSize * currentPageNumber - pageSize);
  const [endSlice, setEndSlice] = useState(pageSize * currentPageNumber);
  const [currentPaginationData, setCurrentPaginationData] = useState(blogs.posts.slice(startSlice, endSlice));
  const isOnlyOnePage = blogs.posts.length <= pageSize;
  const isLastPage = startSlice <= blogs.posts.length && endSlice >= blogs.posts.length;
  const isFirstPage = startSlice === 0;
  const isNextDisabled = isLastPage || isOnlyOnePage;
  const isPreviousDisabled = isFirstPage || isOnlyOnePage;

  useEffect(() => {
    setStartSlice(pageSize * currentPageNumber - pageSize)
    setEndSlice(pageSize * currentPageNumber)
  },[pageSize, currentPageNumber])

  useEffect(() => {
    setCurrentPaginationData(blogs.posts.slice(startSlice, endSlice))
  }, [endSlice])

  const updateRowsPerPage = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPageNumber(1);
  };

  const updatePage = (newPageNumber) => {
    setCurrentPageNumber(newPageNumber);
  };

  return (
    <div>
      <Pagination
        currentPage={currentPageNumber}
        totalCount={blogs.posts.length}
        pageSize={pageSize}
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
