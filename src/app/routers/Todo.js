import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, IconButton, Button } from "@mui/material";
import { List } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { edit, done } from "../slices/todoSlice";
import TodoItem from "../components/todo/TodoItem";
import EditTodo from "../components/todo/EditTodo";

const Todo = () => {
    const dispatch = useDispatch();
    const { list } = useSelector((store) => store.todo);
    const [filteredList, setFilteredList] = useState();
    const [search, setSearch] = useState("");

    useEffect(() => {
        setFilteredList(list);
    }, [list, setFilteredList]);

    const onSearch = (e) => {
        e?.preventDefault();
        e?.stopPropagation();
        setFilteredList(list.filter((todo) => todo.todo?.toLowerCase().indexOf(search.toLowerCase()) !== -1));
    };

    const onEdit = (todo) => {
        dispatch(edit(todo));
    };

    const onDone = (todo) => {
        dispatch(done(todo));
    };

    return (
        <>
            <h1>Todo</h1>

            <form onSubmit={onSearch} sx={{ width: "100%" }}>
                <TextField
                    fullWidth
                    id="standard-name"
                    label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={onSearch}>
                                <SearchIcon />
                            </IconButton>
                        ),
                    }}
                />
            </form>

            <Button variant="contained" sx={{ mt: 4 }} startIcon={<AddIcon />} onClick={() => onEdit({})}>
                Add New
            </Button>

            <List sx={{ width: "400px" }}>
                {filteredList?.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} onDone={onDone} onEdit={onEdit} />
                ))}
            </List>

            <EditTodo />
        </>
    );
};

export default Todo;
