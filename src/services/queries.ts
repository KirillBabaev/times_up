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

export const CREATE_TIMELOG = gql`
    mutation addTimelog($input: TimelogCreateInput!){
      timelogCreate(input: $input){
        __typename
      }
    }
    `
export const LOGIN = gql`
    query checkLogin {
            currentUser {
              id
              name
            }
          }
    `