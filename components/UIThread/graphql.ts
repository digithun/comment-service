import gql from 'graphql-tag'
import UIThread from './components/UIThread'
export const THREAD_FRAGMENT = gql`
  ${UIThread.fragments.comment}
  fragment ReadThread on Thread {
    _id
    comments: commentConnection {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          _id
          ...UICommentDataFragment
        }
      }
    }
  }
`
export const REMOVE_COMMENT_MUTATION = gql`
  mutation ($id: MongoID!) {
    remove(_id: $id) {
      recordId
    }
  }
`

export const ThreadQuery = gql`
${UIThread.fragments.thread}
${UIThread.fragments.comment}
query ($filter: FilterFindOneThreadInput, $after: String, $first: Int) {
  thread(filter: $filter) {
    _id
    comments: commentConnection(after: $after, first: $first, sort: CREATEDAT_DESC) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
      }
      edges {
        cursor
        node {
          _id
          ...UICommentDataFragment
        }
      }
    }
    ...UIThreadDataFragment
  }
}
`
