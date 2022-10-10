import type { NextPage } from "next";
import { Box, Grid } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return <Grid container>hi2</Grid>;
};

Home.getLayout = (page) => (
  <Grid container item xs>
    {page}
  </Grid>
);

export default Home;
