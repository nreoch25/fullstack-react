import React, { Component } from "react";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { MuiThemeProvider, baseTheme} from "material-ui/styles";
import { Link } from "react-router";
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
const muiTheme = getMuiTheme(baseTheme, { userAgent: "all" });
class CoreLayout extends Component {
  static propTypes = {
    children: React.PropTypes.element
  }
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <span>Links: <Link to="/register">Register</Link> | <Link to="/login">Login</Link> | <Link to="/">Home Page</Link></span>
          <br />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}
export default CoreLayout;
