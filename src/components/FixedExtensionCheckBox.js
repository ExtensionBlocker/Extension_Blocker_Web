import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;

const CheckBox = styled.input`
  padding: 3px 6px;
  margin-right: 5px;
`;

const CheckboxLabel = styled.label`
  margin-right: 10px;
`;

function FixedExtensionCheckBox(props) {
  const [isChecked, setCheck] = useState(props.checked);

  const change = (e) => {
    const name = e;
    const type = "고정";

    if (isChecked) {
      const object = JSON.parse(localStorage.getItem(name));
      axios
        .delete(`http://localhost:8080/api/extensions/${object.key}`)
        .then((res) => {
          console.log(res.data);
          window.localStorage.removeItem(name);
        })
        .catch((err) => {
          console.log("고정 확장자를 삭제할 수 없습니다.\n" + err);
        });
    } else {
      axios
        .post("http://localhost:8080/api/extensions", {
          name: name,
          type: type,
        })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem(name, JSON.stringify({ key: res.data.data }));
        })
        .catch((err) => {
          console.log("고정확장자를 추가할 수 없습니다.\n" + err);
        });
    }
  };

  return (
    <>
      {
        <Container>
          <CheckBox
            type="checkbox"
            id={props.value}
            onChange={() => {
              change(props.value);
              setCheck(!isChecked);
            }}
            checked={isChecked}
          ></CheckBox>
          <CheckboxLabel>{props.value}</CheckboxLabel>
        </Container>
      }
    </>
  );
}

export default FixedExtensionCheckBox;