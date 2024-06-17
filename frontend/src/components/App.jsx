import { useQuery, gql } from "@apollo/client";
import React from "react";

export const App = () => {
  const GET_ISSUES = gql`
    query {
      repository(owner: "twolipp", name: "podcast") {
        # {
        #     id
        #     nameWithOwner
        #     description
        #     url
        # }
        issues(last: 20, states: OPEN) {
          edges {
            node {
              title
              url
              labels(first: 5) {
                edges {
                  node {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  // const get_ids = gql`
  //   query {
  //     hello
  //   }
  // `;
  const { loading, error, data } = useQuery(GET_ISSUES);

  // const { loading, error, data } = useQuery(get_ids);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.repository.issues.edges.map((item) => (
    <div key={item.node.id}>
      <h3>{item.node.title}</h3>

      <br />
      <b>About this location:</b>
      <a href={`${item.node.url}`}>{item.node.url}</a>
      <br />
    </div>
  ));
};
