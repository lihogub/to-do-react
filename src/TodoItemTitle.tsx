import React from 'react';
import {Input, Typography} from "antd";

interface TitleProps {
    id: number,
    index: number,
    title:string,
    editMode: boolean,
    updateTitle: any,
    saveChanges: any
}

const styles = {
    title: {
        width: 90+'%',
        display: 'inline'
    },
    titleInput: {
        width:100+'%',
        height: 36,
        padding: '0 5px 0 0',
        borderBottom: '1px solid rgba(0,0,0,0.1)'
    }
}

export const TodoItemTitle = ({id, index, title, editMode, updateTitle, saveChanges}:TitleProps) => {
    return (
        <>
            {!editMode
                ?
                <Typography.Title level={3}
                                  style={styles.title}
                                  type={title ? undefined : "secondary"}
                                  children={title ? title : "Empty title"}
                />
                :
                <Input allowClear={true}
                       autoFocus={true}
                       bordered={false}
                       placeholder={"Task title"}
                       size={"large"}
                       type={"text"}
                       value={title}
                       onChange={e=>updateTitle(e.target.value)}
                       onPressEnter={saveChanges}
                       style={styles.titleInput}
                />}
        </>
    )
}