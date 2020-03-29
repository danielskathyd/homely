import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import FoodIcon from "@material-ui/icons/Restaurant";
import FavoriteIcon from "@material-ui/icons/FitnessCenter";
import ArtIcon from "@material-ui/icons/Brush";
import GameIcon from "@material-ui/icons/VideogameAsset";
import HeartIcon from "@material-ui/icons/Favorite";
import styled from "styled-components";

const Center = styled("div")`
  justify-content: center;
  margin: auto;
`;

const useStyles = makeStyles({
  root: {
    width: 500
  }
});

export default function LabelBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Center>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        className={classes.root}
      >
        <BottomNavigationAction
          label="All"
          value="All"
          icon={<AllInboxIcon />}
        />
        <BottomNavigationAction
          label="Cooking"
          value="Cooking"
          icon={<FoodIcon />}
        />
        <BottomNavigationAction label="Art" value="Art" icon={<ArtIcon />} />
        <BottomNavigationAction
          label="Gaming"
          value="Gaming"
          icon={<GameIcon />}
        />
        <BottomNavigationAction
          label="Health"
          value="Health"
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          label="Adult Life"
          value="Adult Life"
          icon={<HeartIcon />}
        />
      </BottomNavigation>
    </Center>
  );
}
