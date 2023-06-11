import {gql} from "@apollo/client";

export const ALL_ISSUES = gql`
    query getAllIssues {
      currentUser {
        id
        name
        projectMemberships {
          nodes {
            project {
              name
              issues(state: opened) {
                nodes {
                  id
                  title
                  description
                  timelogs {
                    nodes {
                      id
                      issue {
                        id
                      }
                      timeSpent
                      spentAt
                      summary
                      user{
                        id
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    `

export const ISSUE = gql`
    query getIssueById {
      issue(id: "gid://gitlab/Issue/24077") {
        title
        author {
          name
        }
        timelogs {
          nodes {
            id
            user {
              name
            }
            timeSpent
            spentAt
            summary
          }
        }
      }
    }
    `
