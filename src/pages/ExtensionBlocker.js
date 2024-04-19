import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FixedExtensionCheckBox from "../components/FixedExtensionCheckBox";
import SavedCustomExtension from "../components/SavedCustomExtension";
import { ExtensionList } from "../constants/ExtensionList";
import axios from "axios";

const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
  max-width: 800px;
`;

const ExtensionBox = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 20px;
`;

const MenuWord = styled.div`
  text-align: left;
  font-size: 15px;
`;

const Heading = styled.h1`
  text-align: left;
  font-size: 24px;
`;

const Separator = styled.hr`
  border: solid 2px;
`;

const Description = styled.p`
  text-align: left;
  font-size: 20px;
`;

const CustomInput = styled.input`
  type: "text";
  padding-left: 7px;
  width: 250px;
  margin-right: 7px;
`;

const CustomButton = styled.button`
  type: click;
  padding: 3px 6px;
`;

const TagContainer = styled.div`
  overflow: scroll;
  width: 500px;
  height: 300px;
  border: solid gray;
  border-radius: 5px;
  padding: 10px;
`;
const List = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 50px;
`;

const CustomInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 20px;
`;

const CustomFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
`;

const SavedContainer = styled.div`
  flex-wrap: wrap;
  display: flex;
`;

const CustomExtensionCount = styled.div`
  display: flex;
`;

function ExtensionBlocker() {
  const host =
    window.location.hostname === "localhost"
      ? process.env.REACT_APP_DEV_HOST
      : "api";

  // 고정 확장자 렌더링 로직
  const FixedExtension = ExtensionList.map((name) => (
    <FixedExtensionCheckBox
      key={name}
      value={name}
      checked={localStorage.getItem(name) != null}
    ></FixedExtensionCheckBox>
  ));

  const [text, setText] = useState("");
  const type = "커스텀";

  // // 커스텀 확장자 개수 조회 로직
  const [count, setCount] = useState(0);
  useEffect(() => {
    axios
      .get(`${host}/api/extensions/count`)
      .then((res) => {
        setCount(res.data.data.customExtensionCount);
      })
      .catch((err) => {
        console.log("커스텀 확장자 개수 조회를 실패했습니다.\n" + err);
      });
  }, [count]);

  // 커스텀 확장자 리스트 조회 로직
  const [customList, setCustomList] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DEV_HOST}/api/extensions`)
      .then((res) => {
        setCustomList(res.data.data.customExtensionList);
      })
      .catch((err) => {
        console.log("커스텀 리스트 조회를 실패했습니다.\n" + err);
      });
  }, [count]);

  // 커스텀 확장자 렌더링 로직
  const CustomExtension = customList.map((obj) => (
    <SavedCustomExtension
      name={obj.name}
      id={obj.extensionId}
      key={obj.extensionId}
      count={count}
      setCount={setCount}
    ></SavedCustomExtension>
  ));

  const onChange = (e) => {
    setText(e.target.value);
  };

  // 커스텀 확장자 등록 로직
  const onClick = () => {
    axios
      .post(`${process.env.REACT_APP_DEV_HOST}/api/extensions`, {
        name: text,
        type: type,
      })
      .then((res) => {
        if (res.data.code === "S0001") setCount(count + 1);
      })
      .catch(() => {
        console.log("추가하지 못했습니다.");
      });
    setText("");
  };

  return (
    <Container>
      <Separator />
      <Heading>⊙ 파일 확장자 차단</Heading>
      <Separator />
      <Description>
        파일확장자에 따라 특정 형식의 파일을 첨부하거나 전송하지 못하도록 제한
      </Description>

      <ExtensionBox>
        <MenuWord>고정 확장자</MenuWord>
        <List>{FixedExtension}</List>
      </ExtensionBox>

      <ExtensionBox>
        <MenuWord>커스텀 확장자</MenuWord>
        <CustomFormContainer>
          {/* 커스텀 확장자 입력 및 추가 버튼 컨테이너 */}
          <CustomInputContainer>
            <CustomInput
              placeholder="확장자 입력"
              value={text}
              onChange={onChange}
            ></CustomInput>
            <CustomButton
              onClick={() => {
                onClick();
              }}
            >
              +추가
            </CustomButton>
          </CustomInputContainer>

          {/* 커스텀 확장자 저장 컨테이너 */}
          <TagContainer>
            {/* 커스텀 확장자 개수 컴포넌트 */}
            <CustomExtensionCount>{count}/200</CustomExtensionCount>
            <SavedContainer>
              {/* 커스텀 확장자 컴포넌트 리스트 */}
              {CustomExtension}
            </SavedContainer>
          </TagContainer>
        </CustomFormContainer>
      </ExtensionBox>
    </Container>
  );
}

export default ExtensionBlocker;
