import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import InfoIcon from "@material-ui/icons/Info";
import styled from "styled-components";
import ModalImage from "react-modal-image";

import "./feed.css";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 1000,
    height: 580,
    transform: "translateZ(0)"
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
}));

const TitlebarGridList = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList
        cellHeight={180}
        spacing={10}
        className={classes.gridList}
        cols={3}
      >
        {props.data.map((tile, index) => (
          <GridListTile key={props.data[index].id} cols={props.cols || 1}>
            <ModalImage
              small={props.data[index].image}
              large={props.data[index].image}
              alt={props.data[index].description}
            />
            <GridListTileBar
              title={props.data[index].title}
              subtitle={<span>by: {props.data[index].owner}</span>}
              actionIcon={
                <IconButton
                  aria-label={`star ${props.data[index].title}`}
                  className={classes.icon}
                >
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="right"
              className={classes.titleBar}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default TitlebarGridList;
