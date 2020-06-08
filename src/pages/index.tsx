import React from "react";
import { Layout } from "../components/layout";
import { SEO } from "../components/seo";
import { Code } from "../components/code";
import { Link } from "../components/link";
import {HelloWorld} from '../components/HelloWorld';

const command = "gatsby new my-app https://github.com/gojutin/gatsby-starter-typescript-deluxe";

const App = () => (
  <Layout>
    <SEO />
    <HelloWorld />
    <Code>{command}</Code>
    <Link to="/about">About</Link>
  </Layout>
);

export default App;
