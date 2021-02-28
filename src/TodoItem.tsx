import React, {useState} from 'react';
import {Typography, Card, Input, Modal, Popconfirm} from 'antd';
import {
    CheckCircleTwoTone,
    CloseCircleTwoTone,
    DeleteTwoTone,
    EditOutlined
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

const styles = {
    card: {
        width: 100 + '%',
        cursor: 'default'
    }
}
type TodoItemProps = {
    title: string,
    desc: string,
    created: Date | null,
    updateTodo: any,
    deleteTodo: any
}
export const TodoItem = ({title, desc, created, updateTodo, deleteTodo}: TodoItemProps) => {
    const [editMode, setEditMode] = useState(false);
    const [itemText, setItemText] = useState({title, desc})

    const saveChanges = () => {
        updateTodo(itemText)
        setEditMode(false)
    }
    const revertChanges = () => {
        setItemText({title, desc})
        setEditMode(false)
    }

    const updateItemText = (text: string, dest: any) => setItemText({...itemText, [dest]: text})

    const btn = editMode ? <>
        <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={deleteTodo}
            okText="Yes"
            cancelText="No"
        ><DeleteTwoTone style={{fontSize: 24, marginLeft: 5}} twoToneColor="#000000"/>
        </Popconfirm>
        <CheckCircleTwoTone style={{fontSize: 24, marginLeft: 5}} onClick={saveChanges} twoToneColor="#00FF00"/>
        <CloseCircleTwoTone style={{fontSize: 24, marginLeft: 5}} onClick={revertChanges} twoToneColor="#FF0000"/>
    </> : <EditOutlined style={{fontSize: 24}} onClick={() => setEditMode(true)}/>
    return (
        <>
            <Card
                title={
                    <>
                        <Typography.Title level={2} editable={{
                            icon: <></>,
                            editing: editMode,
                            onChange: text => updateItemText(text, "title")
                        }}>
                            {itemText.title}
                        </Typography.Title>
                        <Typography.Paragraph type={"secondary"}>
                            {!editMode && created?.toLocaleDateString() + " " + created?.toLocaleTimeString()}
                        </Typography.Paragraph>
                    </>
                }
                style={styles.card}
                extra={btn}
                hoverable={true}
                bodyStyle={(desc || editMode) ? {padding: '10px 25px'} : {display: 'none'}}
            >
                {(itemText.desc || editMode)
                && <Typography.Paragraph style={{fontSize: 24}} id={"lol"} editable={{
                    icon: <></>,
                    editing: editMode,
                    autoSize: { maxRows: 5, minRows: 1},
                    maxLength: 100,
                    onChange: text => updateItemText(text, "desc"),
                }}>
                    {itemText.desc}
                </Typography.Paragraph>}

            </Card>
        </>
    )
}