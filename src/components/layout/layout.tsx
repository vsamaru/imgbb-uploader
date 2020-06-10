import React from "react";
import { useStaticQuery, graphql } from "gatsby";

// Components
import { Link } from "../link";

const Layout: React.FC = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  const { title, description } = data.site.siteMetadata;

  return (
    <>
        <main>{children}</main>
    </>
  );
};

export { Layout };
