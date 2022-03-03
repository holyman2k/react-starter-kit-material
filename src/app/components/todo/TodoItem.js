import { Button, IconButton } from "@mui/material";
import { ListItem, ListItemText } from "@mui/material";
import { RadioButtonUnchecked, RadioButtonChecked } from "@mui/icons-material";

const TodoItem = ({ todo, onDone, onEdit }) => {
    const _onDone = () => onDone(todo);
    const _onEdit = () => onEdit(todo);
    const textDecoration = todo?.done === true ? "line-through" : "none";

    return (
        <ListItem key={todo.id} disablePadding secondaryAction={<Button onClick={_onEdit}>Edit</Button>}>
            <IconButton variant="text" onClick={_onDone}>
                {todo.done ? <RadioButtonChecked /> : <RadioButtonUnchecked />}
            </IconButton>
            <ListItemText primary={todo.todo} sx={{ textDecoration: textDecoration }} />
        </ListItem>
    );
};

export default TodoItem;
