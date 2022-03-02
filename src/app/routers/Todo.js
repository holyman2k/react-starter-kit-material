import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { List } from "@mui/material";
import { edit, done } from "../slices/todoSlice";
import TodoItem from "../components/todo/TodoItem";
import EditTodo from "../components/todo/EditTodo";

const Todo = () => {
    const dispatch = useDispatch();
    const { list } = useSelector((store) => store.todo);

    const onEdit = (todo) => {
        dispatch(edit(todo));
    };

    const onDone = (todo) => {
        dispatch(done(todo));
    };

    return (
        <>
            <h1>Todo</h1>
            <Box width="sm">
                <List sx={{ width: "400px" }}>
                    {list.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} onDone={onDone} onEdit={onEdit} />
                    ))}
                </List>
            </Box>

            <EditTodo />
        </>
    );
};

export default Todo;
