import React, {ChangeEvent, useState} from 'react';
import {Row, Col, Button, Typography, Input} from 'antd';
import './App.css';
import {TodoItem} from "./TodoItem";

type TodoRecord = {
    id: number,
    title: string,
    desc: string,
    created: Date | null,
}

const initialTodoState = {
    todoText: {
        title: "",
        desc: ""
    }
}

function App() {
    const [todoText, setTodoText] = useState(initialTodoState.todoText)
    const [todoMap, setTodoMap]: [any, any] = useState({})
    const [lastId, setLastId] = useState(0)
    console.log(todoMap)

    const onChangeText = (e: ChangeEvent<HTMLInputElement>) => setTodoText({
        ...todoText,
        [e.target.name]: e.target.value
    })

    const addTodo = () => {
        if (!todoText.title) return
        setLastId(lastId + 1)
        setTodoMap({...todoMap, [lastId + 1]: {id: lastId + 1, ...todoText, created: new Date()}})
        setTodoText(initialTodoState.todoText)
    }
    const deleteTodo = (id: number) => {
        console.log(id)
        const newTodoMap = {...todoMap}
        delete newTodoMap[id]
        setTodoMap(newTodoMap)
    }
    const updateTodo = (id: number, payload: any) => {
        setTodoMap({...todoMap, [id]: {...todoMap[id], ...payload, created: new Date()}})
    }
    return (
        <Row justify={'center'}>
            <Col span={8}>
                <Typography.Title>To Do App</Typography.Title>
                <Row>
                    <Input autoFocus={true}
                           style={{height: 32, width: 100 + '%'}}
                           placeholder="Task title"
                           value={todoText.title}
                           allowClear
                           onChange={onChangeText}
                           onPressEnter={addTodo}
                           name={"title"}
                    />
                    <Input autoFocus={true}
                           style={{height: 32, width: 100 + '%', margin: '10px 0'}}
                           placeholder="Task description"
                           value={todoText.desc}
                           allowClear
                           onChange={onChangeText}
                           onPressEnter={addTodo}
                           name={"desc"}
                    />
                </Row>
                <Row justify={'center'}>
                    <Button type={"primary"} style={{width: 25 + '%'}} ghost={!todoText} onClick={addTodo}>Add</Button>
                </Row>
                {Object.keys(todoMap).reverse().map((id: any) => (
                    <TodoItem key={id}
                              {...todoMap[id]}
                              updateTodo={(payload: any) => updateTodo(id, payload)}
                              deleteTodo={() => deleteTodo(id)}/>))}
            </Col>
        </Row>
    );
}

export default App;
