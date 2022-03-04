import { useSelector } from "react-redux";
import Overlay from "./Overlay";

const Busy = () => {
    const { isBusy } = useSelector((store) => store.busy);
    
    return isBusy ? <Overlay /> : null;
};

export default Busy;
