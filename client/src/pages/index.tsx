import type { NextPage } from "next";
import styled from "styled-components";
import { Text } from "../components/ui";

const Home: NextPage = () => {
  return (
    <Wrapper>
      <Text.TitleText>Hello world! </Text.TitleText>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  .title {
    font-weight: 800;
  }
`;

export default Home;
