import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles({
  avatar: {
    margin: 10,
  },
  orangeAvatar: {
    backgroundColor: deepOrange[500],
    cursor: "pointer",
  },
  purpleAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: deepPurple[500],
  },
});

const LetterAvatars = (props) => {
  const classes = useStyles();
  return (
    <Avatar onClick={props.openMenuModal} className={classes.orangeAvatar}>
      {props.username}
    </Avatar>
  );
};
export default LetterAvatars;
