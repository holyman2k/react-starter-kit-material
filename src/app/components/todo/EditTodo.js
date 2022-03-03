import { useEffect, forwardRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import { Slide } from "@mui/material";
import FormTextField from "../forms/FormTextField";
import FormDatePicker from "../forms/FormDatePicker";
import { edit, save } from "../../slices/todoSlice";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditTodo = () => {
    const dispatch = useDispatch();
    const { editItem } = useSelector((store) => store.todo);

    useEffect(() => {
        reset(editItem);
    }, [editItem]);

    const form = useForm();
    const { control, handleSubmit, reset } = form;

    const onSubmit = (data) => {
        // convert date to timestamp
        const newTodo = { ...data, due: new Date(data.due).getTime() };
        dispatch(save(newTodo));
    };

    const onClose = () => {
        dispatch(edit());
    };

    const isBeforeToday = (date) => {
        return date.getTime() < Date.now() - 24 * 60 * 60 * 1000;
    };

    if (!editItem) return null;
    return (
        <Dialog maxWidth="sm" fullWidth={true} open={editItem != null} onClose={onClose} TransitionComponent={Transition}>
            <DialogTitle>{editItem ? "Edit" : "New"}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={3} mt={2}>
                        <FormTextField name="todo" label="Todo" control={control} rules={{ required: true }} />
                        <FormDatePicker name="due" label="Due Date" inputFormat="dd/MM/yyyy" control={control} rules={{ required: true }} shouldDisableDate={isBeforeToday} />
                        <Button type="submit" id="submit" sx={{ display: "none" }}>
                            Hidden
                        </Button>
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={() => document.querySelector("#submit").click()}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditTodo;
