/** @format */

import { BASE_URL } from "./Config";
import { Octokit } from "@octokit/core";
const octokit = new Octokit({ auth: "" });

export const allIssues = async (filter) => {
  const { data } = await octokit.request(BASE_URL, filter);
  return { data };
};

export const commentData = async ({number}) => {
    const { data } = await octokit.request(`${BASE_URL}/${number}/comments`);
    return { data };
  };
