import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: fit-content;
  width: fit-content;
  margin: auto;
`;

const NameBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

function extensionBlocker() {
  <Container>
    <NameBox>⊙ 파일 확장자 차단</NameBox>;
  </Container>;
}

export default extensionBlocker;
