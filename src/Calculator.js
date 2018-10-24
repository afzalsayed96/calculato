import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import keys from "./constants/calc";
import onCalcAction from "./actions/onCalcAction";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "right",
    width: 300,
    height: 20,
    text: "hello",
    color: theme.palette.text.secondary
  }
});

const NumKeyInner = ({ value, onPress }) => (
  <Grid key={value} item>
    <Button variant="contained" color="primary" onClick={onPress} value={value}>
      {value}
    </Button>
  </Grid>
);
const NumKey = withStyles(styles)(NumKeyInner);

const OpKeyInner = ({ value, onPress }) => (
  <Grid key={value} item>
    <Button
      variant="contained"
      color="secondary"
      onClick={onPress}
      value={value}
    >
      {value}
    </Button>
  </Grid>
);
const OpKey = withStyles(styles)(OpKeyInner);

const RowInner = ({ children, classes }) => (
  <Grid item xs={12}>
    <Grid container className={classes.root} justify="center" spacing={24}>
      {children}
    </Grid>
  </Grid>
);

const Row = withStyles(styles)(RowInner);

class Calculator extends Component {
  onNumPress = e => {
    this.props.onCalcAction(e.currentTarget.value, true);
  };

  onOpPress = e => {
    this.props.onCalcAction(e.currentTarget.value, false);
  };

  render() {
    const { classes, title, calc } = this.props;
    return (
      <div className={classes.root}>
        <Grid container className={classes.root} spacing={16}>
          <Row>
            <h1>{title}</h1>
          </Row>
          <Grid item xs={12}>
            <Grid
              container
              className={classes.root}
              justify="center"
              spacing={24}
            >
              <Grid item>
                <Paper className={classes.paper}>{calc.display}</Paper>
              </Grid>
            </Grid>
          </Grid>
          <Row>
            <NumKey key={1} value={1} onPress={this.onNumPress} />
            <NumKey key={2} value={2} onPress={this.onNumPress} />
            <NumKey key={3} value={3} onPress={this.onNumPress} />
            <OpKey
              key={keys.MINUS}
              value={keys.MINUS}
              onPress={this.onOpPress}
            />
          </Row>
          <Row>
            <NumKey key={4} value={4} onPress={this.onNumPress} />
            <NumKey key={5} value={5} onPress={this.onNumPress} />
            <NumKey key={6} value={6} onPress={this.onNumPress} />
            <OpKey key={keys.PLUS} value={keys.PLUS} onPress={this.onOpPress} />
          </Row>
          <Row>
            <NumKey key={7} value={7} onPress={this.onNumPress} />
            <NumKey key={8} value={8} onPress={this.onNumPress} />
            <NumKey key={9} value={9} onPress={this.onNumPress} />
            <OpKey key={keys.MULT} value={keys.MULT} onPress={this.onOpPress} />
          </Row>
          <Row>
            <OpKey key={keys.CE} value={keys.CE} onPress={this.onOpPress} />
            <NumKey key={0} value={0} onPress={this.onNumPress} />
            <OpKey key={keys.EQ} value={keys.EQ} onPress={this.onOpPress} />
            <OpKey key={keys.DIV} value={keys.DIV} onPress={this.onOpPress} />
          </Row>
        </Grid>
      </div>
    );
  }
}

Calculator.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  calc: PropTypes.shape({
    display: PropTypes.string.isRequired
  }).isRequired,
  onCalcAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  title: state.app.title,
  calc: state.calculator
});

const actions = { onCalcAction };

export default connect(
  mapStateToProps,
  actions
)(withStyles(styles)(Calculator));
