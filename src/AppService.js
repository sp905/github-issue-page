/** @format */

import { BASE_URL } from "./Config";
import { Octokit } from "@octokit/core";
import axios from "axios";
import parseLink from "parse-link-header";
const octokit = new Octokit();
octokit.auto_paginate = true;
let openPageCount = 0;
let closedPageCount = 0;
export const totalCountMethod = () => {
  return { openPageCount, closedPageCount };
};
const isLastPage = (pageLinks) => {
  return Object.keys(pageLinks).length === 2 && pageLinks.first && pageLinks.prev;
};
const getPageCount = (pageLinks) => {
  if (!pageLinks) {
    return 0;
  }
  if (isLastPage(pageLinks)) {
    return parseInt(pageLinks.prev.page, 10) + 1;
  } else if (pageLinks.last) {
    return parseInt(pageLinks.last.page, 10);
  } else {
    return 0;
  }
};
export const pageCount = ({ per_page, state }) => {
  const url = `${BASE_URL}?per_page=${per_page}&state=${state}`;
  return axios
    .get(url)
    .then((res) => {
      const pageLinks = parseLink(res.headers.link);
      const pageCount = getPageCount(pageLinks);
      return {
        pageLinks,
        pageCount,
      };
    })
    .catch((err) => Promise.reject(err));
};
export const IssueCount = async () => {
   try{
    let { pageCount: openC } = await pageCount({ per_page: 8, state: "open" });
    let { pageCount: closedC } = await pageCount({ per_page: 8, state: "closed" });
    openPageCount = openC;
    closedPageCount = closedC;
    return { openPageCount, closedPageCount };
   }catch(err){
    console.log(err);
   }
};

export const allIssues = async (filter) => {
  try {
    const { data } = await octokit.request(`${BASE_URL}`, filter);
    return { data };
  } catch (err) {
    console.log(err);
  }
};

export const commentData = async ({ number }) => {
    try{
      const { data } = await octokit.request(`${BASE_URL}/${number}/comments`);
      return { data };
    }catch(err){
      console.log(err)
    }
};
