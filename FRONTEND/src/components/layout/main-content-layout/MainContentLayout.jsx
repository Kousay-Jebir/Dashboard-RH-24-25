import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
export default function MainContentLayout(){
    return(
        <Grid container>
            <Grid item xs={12} md={3}>
            </Grid>

            <Grid item xs={12} md={9}>
            </Grid>
        </Grid>
    )
}