import React from "react";
import { Card, Text, Group, Badge, createStyles } from "@mantine/core";
interface IRCardProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const useStyles = createStyles((theme) => ({
  card: {
    transition: "transform 150ms ease, box-shadow 100ms ease",
    cursor: "pointer",

    "&:hover": {
      boxShadow: theme.shadows.md,
      transform: "scale(1.02)",
    },

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: 6,
    },
  },
}));

export default function RCard(props: IRCardProps) {
  const { classes } = useStyles();

  return (
    <Card shadow="sm" p="lg" className={classes.card} onClick={props?.onClick}>
      {props.children}
    </Card>
  );
}
