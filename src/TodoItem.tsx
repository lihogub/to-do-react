import React, {useState} from 'react';
import {Typography, Card, Popconfirm} from 'antd';
import {
    CheckCircleTwoTone,
    CloseCircleTwoTone,
    DeleteTwoTone,
    EditOutlined
} from "@ant-design/icons";
import {TodoItemTitle} from "./TodoItemTitle";

const styles = {
    card: {
        width: 100 + '%',
        margin: '25px 0',
        cursor: 'default'
    },
    icon: {
        fontSize: 24,
        marginLeft: 5
    }
}
interface TodoItemProps {
    id: number,
    index: number,
    title: string,
    desc: string,
    created: Date | null,
    updateTodo: any,
    deleteTodo: any
}
export const TodoItem = ({id, index, title, desc, created, updateTodo, deleteTodo}: TodoItemProps) => {
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

    const deleteTodoButton = <Popconfirm
        title="Are you sure to delete this task?"
        onConfirm={deleteTodo}
        okText="Yes"
        cancelText="No"
        children={<DeleteTwoTone style={styles.icon} twoToneColor="#000000"/>}
    />

    const btn = editMode ? (
        <>
            {deleteTodoButton}
            <CloseCircleTwoTone style={styles.icon} onClick={revertChanges} twoToneColor="#FF0000"/>
            <CheckCircleTwoTone style={styles.icon} onClick={saveChanges} twoToneColor="#00FF00"/>
        </>
    ) :
        <EditOutlined style={styles.icon} onClick={() => setEditMode(true)}/>
    return (
        <>
            <Card
                title={
                    <TodoItemTitle title={itemText.title}
                                  id={id}
                                  index={index}
                                  editMode={editMode}
                                  updateTitle={(text:string)=>updateItemText(text, "title")}
                                  saveChanges={saveChanges}
                    />
                }
                style={styles.card}
                extra={btn}
                hoverable={true}
                size={"small"}
                headStyle={{padding: '0 25px'}}
                bodyStyle={(desc || editMode) ? {padding: '10px 25px 0 25px'} : {display: 'none'}}
            >
                {(itemText.desc || editMode)
                && <Typography.Paragraph style={{fontSize: 18}} id={"lol"} editable={{
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