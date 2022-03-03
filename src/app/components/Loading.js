import { Backdrop, CircularProgress } from "@mui/material";

const Loading = () => (
    <Backdrop open={true} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
    </Backdrop>
);

export default Loading;
