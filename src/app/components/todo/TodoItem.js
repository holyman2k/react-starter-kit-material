import { Button, IconButton } from "@mui/material";
import { List, ListItemButton, ListItem, ListItemText } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import { RadioButtonUnchecked, RadioButtonChecked } from "@mui/icons-material";

const TodoItem = ({ todo, onDone, onEdit }) => {
    const _onDone = () => onDone(todo);
    const _onEdit = () => onEdit(todo);

    return (
        <ListItem key={todo.id} disablePadding secondaryAction={<Button onClick={_onEdit}>Edit</Button>}>
            <IconButton variant="text" onClick={_onDone}>
                {todo.done ? <RadioButtonChecked /> : <RadioButtonUnchecked />}
            </IconButton>
            <ListItemText primary={todo.todo} />
        </ListItem>
    );
};

export default TodoItem;
