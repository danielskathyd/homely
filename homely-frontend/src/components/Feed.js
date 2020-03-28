import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";

const Item = styled("div")`
  border-radius: 25px;
  background: #f8f3ef;
  padding: 20px;
  height: 150px;
`;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(10),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export default function Feed() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Item>xs</Item>
        </Grid>
        <Grid item xs>
          <Item>xs</Item>
        </Grid>
        <Grid item xs>
          <Item>xs</Item>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs>
          <Item>xs</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>xs=6</Item>
        </Grid>
        <Grid item xs>
          <Item>xs</Item>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Item>xs=6</Item>
        </Grid>
        <Grid item xs>
          <Item>xs</Item>
        </Grid>
        <Grid item xs>
          <Item>xs</Item>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs>
          <Item>xs</Item>
        </Grid>
        <Grid item xs>
          <Item>xs</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>xs=6</Item>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs>
          <Item>xs</Item>
        </Grid>
        <Grid item xs>
          <Item>xs</Item>
        </Grid>
        <Grid item xs>
          <Item>xs</Item>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs>
          <Item>xs</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>xs=6</Item>
        </Grid>
        <Grid item xs>
          <Item>xs</Item>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Item>xs=6</Item>
        </Grid>
        <Grid item xs>
          <Item>xs</Item>
        </Grid>
        <Grid item xs>
          <Item>xs</Item>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs>
          <Item>xs</Item>
        </Grid>
        <Grid item xs>
          <Item>xs</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>xs=6</Item>
        </Grid>
      </Grid>
    </div>
  );
}
