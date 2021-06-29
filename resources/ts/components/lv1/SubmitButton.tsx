import React from "react";
import { TaskAPI } from "../../type/api/TaskAPI";
import styled from "styled-components";

type Props = {
    text: string;
    postTask: (postData: TaskAPI) => void;
    setText: (param: string) => void;
    userID?: number;
};

const SubmitButton: React.VFC<Props> = ({
    text,
    postTask,
    setText,
    userID,
}: Props) => {
    const data: TaskAPI = {
        user_id: userID,
        title: text,
        is_done: 0,
    };

    return (
        <_SubmitButton
            onClick={() => {
                postTask(data);
                setText("");
            }}
        >
            追加
        </_SubmitButton>
    );
};

export default SubmitButton;

const _SubmitButton = styled.div`
    display: inline-block;
    color: #223877;
    border-radius: 8px;
    padding: 6px;
    margin-left:7px;
    background-color:#8bd8ff;
    border: 1px solid #7dcaf0;
    opacity:0.9;
`;