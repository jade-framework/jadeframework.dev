import React from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import Button from "@material-ui/core/Button"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListSubheader from "@material-ui/core/ListSubheader"
import { Link } from "react-scroll"
import { Link as PageLink } from "gatsby"

import NavIcon from "./nav-icon"

const useStyles = makeStyles({
  list: {
    width: 300,
  },
  fullList: {
    width: "auto",
  },
})

const Nav = ({ sections, team }) => {
  const classes = useStyles()
  const [state, setState] = React.useState({
    right: false,
  })

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {sections ? (
        <List>
          <ListSubheader>About</ListSubheader>
          <PageLink to="/team">
            <ListItem button key={team.id}>
              <ListItemText primary={team.title} disableTypography={true} />
            </ListItem>
          </PageLink>
          <a
            href="https://github.com/jade-framework/jade"
            target="_blank"
            rel="noreferrer"
          >
            <ListItem button key="github">
              <ListItemText primary="Github" disableTypography={true} />
            </ListItem>
          </a>
          <Divider />
          <ListSubheader>Contents</ListSubheader>
          {sections.map((section, index) => (
            <Link
              activeClass="active"
              to={section.id}
              spy={true}
              smooth={true}
              offset={-270}
              duration={500}
            >
              <ListItem button key={section.id}>
                <ListItemText
                  primary={section.title}
                  disableTypography={true}
                />
              </ListItem>
            </Link>
          ))}
        </List>
      ) : (
        <List>
          <PageLink to="/">
            <ListItem button key={team.id}>
              <ListItemText
                primary="Back to our Case Study"
                disableTypography={true}
              />
            </ListItem>
          </PageLink>
        </List>
      )}
    </div>
  )

  return (
    <React.Fragment key={"right"}>
      <Button onClick={toggleDrawer("right", true)}>
        <NavIcon />
      </Button>
      <Drawer
        right={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </React.Fragment>
  )
}

export default Nav
