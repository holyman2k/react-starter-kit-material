import { useEffect, forwardRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { FormControl, Stack } from "@mui/material";
import { Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/lab";
import { Slide } from "@mui/material";
import { edit, save } from "../../slices/todoSlice";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditTodo = () => {
    const dispatch = useDispatch();
    const { editItem } = useSelector((store) => store.todo);
    const [todo, setTodo] = useState();

    useEffect(() => {
        setTodo(editItem);
    }, [editItem]);

    if (!editItem) return null;

    const onClose = () => {
        dispatch(edit());
    };

    const onTextChange = (e) => {
        console.log(e.target.value);
        const newTodo = { ...todo, todo: e.target.value };
        setTodo(newTodo);
    };
    const onDateChange = (date) => {
        const newTodo = { ...todo, due: date };
        setTodo(newTodo);
    };
    return (
        <Dialog maxWidth="sm" fullWidth={true} open={editItem != null} onClose={onClose} TransitionComponent={Transition}>
            <DialogTitle>{editItem ? "Edit" : "New"}</DialogTitle>
            <DialogContent>
                <FormControl>
                    <Stack spacing={2}>
                        <TextField label="Todo" variant="outlined" autoFocus value={todo?.todo} onChange={onTextChange} />
                        <DatePicker
                            label="Due"
                            value={todo?.due}
                            minDate={new Date()}
                            onChange={onDateChange}
                            inputFormat="dd/MM/yyyy"
                            renderInput={(params) => <TextField {...params} helperText={params?.inputProps?.placeholder} />}
                        />
                    </Stack>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onClose}>Subscribe</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditTodo;
