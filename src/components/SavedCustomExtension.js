import React, { useState } from "react";
import styled from "styled-components";
import cancelImg from "../assets/cancelImg.png";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid;
  border-radius: 5px;
  width: max-content;
  padding: 0px 5px;
  align-items: center;
  margin-right: 7px;
  margin-top: 7px;
`;

const CancelButton = styled.div`
  font-weight: bold;
  float: left;
  cursor: pointer;
`;

const CustomExtension = styled.div`
  padding-bottom: 3px;
`;

const Img = styled.img`
  width: 11px;
  height: 11px;
  object-fit: cover;
  margin-left: 5px;
`;

function SavedCustomExtension(props) {
  const deleteCustom = () => {
    axios
      .delete(`${process.env.REACT_APP_DEV_HOST}/api/extensions/${props.id}`)
      .then((res) => {
        if (res.data.code === "S0001") {
          props.setCount(props.count - 1);
        }
      })
      .catch((err) => {
        console.log("커스텀 확장자 삭제를 실패했습니다." + err);
      });
  };

  return (
    <Container>
      <CustomExtension>{props.name}</CustomExtension>
      <CancelButton
        onClick={() => {
          deleteCustom();
        }}
      >
        <Img src={cancelImg} alt="cancelImg"></Img>
      </CancelButton>
    </Container>
  );
}

export default SavedCustomExtension;
