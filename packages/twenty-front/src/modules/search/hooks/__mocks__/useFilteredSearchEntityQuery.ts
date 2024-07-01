import { gql } from '@apollo/client';

export const query = gql`
  query FindManyPeople(
    $filter: PersonFilterInput
    $orderBy: [PersonOrderByInput]
    $lastCursor: String
    $limit: Int = 60
  ) {
    people(
      filter: $filter
      orderBy: $orderBy
      first: $limit
      after: $lastCursor
    ) {
      edges {
        node {
          id
          opportunities {
            edges {
              node {
                id
                personId
                pointOfContactId
                updatedAt
                companyId
                stage
                probability
                closeDate
                amount {
                  amountMicros
                  currencyCode
                }
                id
                createdAt
              }
            }
          }
          xLink {
            label
            url
          }
          id
          pointOfContactForOpportunities {
            edges {
              node {
                id
                personId
                pointOfContactId
                updatedAt
                companyId
                stage
                probability
                closeDate
                amount {
                  amountMicros
                  currencyCode
                }
                id
                createdAt
              }
            }
          }
          createdAt
          company {
            id
            xLink {
              label
              url
            }
            linkedinLink {
              label
              url
            }
            domainName
            annualRecurringRevenue {
              amountMicros
              currencyCode
            }
            createdAt
            address
            updatedAt
            name
            accountOwnerId
            employees
            id
            idealCustomerProfile
          }
          city
          email
          activityTargets {
            edges {
              node {
                id
                updatedAt
                createdAt
                personId
                activityId
                companyId
                id
              }
            }
          }
          jobTitle
          favorites {
            edges {
              node {
                id
                id
                companyId
                createdAt
                personId
                position
                workspaceMemberId
                updatedAt
              }
            }
          }
          attachments {
            edges {
              node {
                id
                updatedAt
                createdAt
                name
                personId
                activityId
                companyId
                id
                authorId
                type
                fullPath
              }
            }
          }
          name {
            firstName
            lastName
          }
          phone
          linkedinLink {
            label
            url
          }
          updatedAt
          avatarUrl
          companyId
        }
        cursor
      }
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;

export const variables = {
  entitiesToSelect: {
    limit: 10,
    filter: {
      and: [
        { and: [{ or: [{ name: { ilike: '%Entity%' } }] }] },
        { not: { id: { in: ['1', '2'] } } },
      ],
    },
    orderBy: [{ name: 'AscNullsLast' }],
  },
  filteredSelectedEntities: {
    limit: 60,
    filter: {
      and: [
        { and: [{ or: [{ name: { ilike: '%Entity%' } }] }] },
        { id: { in: ['1'] } },
      ],
    },
    orderBy: [{ name: 'AscNullsLast' }],
  },
  selectedEntities: {
    limit: 60,
    filter: { id: { in: ['1'] } },
    orderBy: [{ name: 'AscNullsLast' }],
  },
};

export const responseData = {
  edges: [],
};
