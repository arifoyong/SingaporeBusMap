import Head from "next/head";
import Main from "../components/main";

const Index = () => {
  return (
    <React.Fragment>
      <Head>
        <title>SG BUS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Main />
    </React.Fragment>
  );
};

export default Index;
