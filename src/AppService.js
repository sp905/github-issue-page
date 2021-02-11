/** @format */

import { BASE_URL } from "./Config";
import { Octokit } from "@octokit/core";
const octokit = new Octokit({ auth: "" });

export const AllIssues = async (filter) => {
  const { data } = await octokit.request(BASE_URL, filter);
  return { data };
};

export const CommentData = async ({number}) => {
    const { data } = await octokit.request(`${BASE_URL}/${number}/comments`);
    return { data };
  };
