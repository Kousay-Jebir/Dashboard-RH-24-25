import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import SelectMenu from "../../SelectMenu";
export default function MainContentLayout(){
    return(
        <Grid container p={3} pt={4}>
            <Grid item xs={12} md={3}>
                <SelectMenu/>
            </Grid>

            <Grid item xs={12} md={9}>
                <Outlet></Outlet>
            </Grid>
        </Grid>
    )
}