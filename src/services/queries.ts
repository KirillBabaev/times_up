import {gql} from "@apollo/client";

export const ALL_ISSUES = gql`
    query getAllIssues {
      currentUser {
        id
        name
        projectMemberships {
          nodes {
            project {
              id
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
                        projectId
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

export const CREATE_TIMELOG = gql`
    mutation addTimelog($input: TimelogCreateInput!) {
      newTimelog:timelogCreate(input: $input) {
        timelog{
          id
          issue{
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
    `
export const LOGIN = gql`
    query checkLogin {
            currentUser {
              id
            }
          }
    `