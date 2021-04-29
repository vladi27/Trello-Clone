import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: 10,
  },
  orangeAvatar: {
    // margin: 10,
    // color: "#fff",
    backgroundColor: deepOrange[500],
    cursor: "pointer",
  },
  purpleAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: deepPurple[500],
  },
  grayAvatar: {
    margin: 10,
    color: "#fff",
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: "12px",
    fontWeight: 700,
    color: "#172b4d",
  },
}));

export default function CommentInitials(props) {
  const classes = useStyles();

  return <Avatar className={classes.small}>{props.username}</Avatar>;
}
