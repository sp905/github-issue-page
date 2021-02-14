/** @format */

import { BASE_URL } from "./Config";
import { Octokit } from "@octokit/core";
import axios from "axios";
const octokit = new Octokit();
octokit.auto_paginate = true;
const githubUrl = "https://api.github.com/graphql";
const token="094ff231a5618290affb1a77a648411130012781"
const oauth = { Authorization: "bearer " + token };
let totalCount = 0;
let openCount = 0;
let closedCount = 0;
export const totalCountMethod = () => {
  return { totalCount, openCount, closedCount };
};
const queryClosed =
  "{" +
  'repository(owner:"facebook", name:"create-react-app") {' +
  "issues(states:CLOSED) {" +
  "totalCount" +
  "}" +
  "}" +
  "}";
const queryOpen =
  "{" +
  'repository(owner:"facebook", name:"create-react-app") {' +
  "issues(states:OPEN) {" +
  "totalCount" +
  "}" +
  "}" +
  "}";
const issueCountTagWise = async (query) => {
  let { data } = await axios.post(githubUrl, { query }, { headers: oauth });
  let { repository: { issues: { totalCount } } = {} } = data.data;
  return totalCount;
};
export const IssueCount = async () => {
  openCount = await issueCountTagWise(queryOpen);
  closedCount = await issueCountTagWise(queryClosed);
  totalCount = openCount + closedCount;
  return { openCount, closedCount };
};

export const allIssues = async (filter) => {
  const { data } = await octokit.request(`${BASE_URL}/issues`, filter);
  return { data };
};

export const commentData = async ({ number }) => {
  const { data } = await octokit.request(`${BASE_URL}/issues/${number}/comments`);
  return { data };
};
