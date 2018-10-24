import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import mexp from 'math-expression-evaluator';

const MULT='×';
const PLUS='+';
const DIV='/';
const MINUS='-';
const CE='CE';
const EQ='=';
const ERR='ERR';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'right',
    width: 300,
    height: 20,
    text: "hello",
    color: theme.palette.text.secondary,
  },
});

const NumKeyInner = ({value, onPress}) => (
  <Grid key={value} item>
    <Button variant="contained" color="primary" onClick={onPress} value={value}>{value}</Button>
  </Grid>
);
const NumKey = withStyles(styles)(NumKeyInner);


const OpKeyInner = ({value, onPress}) => (
  <Grid key={value} item>
    <Button variant="contained" color="secondary" onClick={onPress} value={value}>{value}</Button>
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

const calculate = (expr) => {
  try {
    return mexp.eval(expr)
  }
  catch (err) {
    return ERR;
  }
};

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '',
    }
  }

  onNumPress = e => {
    const input = e.currentTarget.value;
    this.setState((state) => ({ display: state.display === ERR ? `${parseInt(input)}` : `${state.display}${parseInt(input)}`
    }));
  }

  onOpPress = (e) => {
    var input = e.currentTarget.value;
    const op = {
      [PLUS]: '+',
      [MINUS]: '-',
      [MULT]: '*',
      [DIV]:  '/',
    };
    switch(input) {
      case CE:
        this.setState((state) => ({ display: ''}));
        break;
      case EQ:
        this.setState((state) => ({ display: calculate(state.display)}));
        break;
      default:
        console.log(input);
        this.setState((state) => ({ display: `${state.display} ${op[input]} `})); 
    }
  }

  render() {
    const { classes } = this.props;
    return (

      <div className={classes.root}>
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={12}>
            <Grid container className={classes.root} justify="center" spacing={24}>

              <Grid item>
                <Paper className={classes.paper} >{this.state.display}</Paper>
              </Grid>

            </Grid>
          </Grid>
          <Row>
            <NumKey key={1} value={1} onPress={this.onNumPress} />
            <NumKey key={2} value={2} onPress={this.onNumPress} />
            <NumKey key={3} value={3} onPress={this.onNumPress} />
            <OpKey key={MINUS} value={MINUS} onPress={this.onOpPress} />
          </Row>
          <Row>
            <NumKey key={4} value={4} onPress={this.onNumPress} />
            <NumKey key={5} value={5} onPress={this.onNumPress} />
            <NumKey key={6} value={6} onPress={this.onNumPress} />
            <OpKey key={PLUS} value={PLUS} onPress={this.onOpPress} />
          </Row>
          <Row>
            <NumKey key={7} value={7} onPress={this.onNumPress} />
            <NumKey key={8} value={8} onPress={this.onNumPress} />
            <NumKey key={9} value={9} onPress={this.onNumPress} />
            <OpKey key={MULT} value={MULT} onPress={this.onOpPress} />
          </Row>
          <Row>
            <OpKey key={CE} value={CE} onPress={this.onOpPress} />
            <NumKey key={0} value={0} onPress={this.onNumPress} />
            <OpKey key={EQ} value={EQ} onPress={this.onOpPress} />
            <OpKey key={DIV} value={DIV} onPress={this.onOpPress} />
          </Row>
        </Grid>
      </div>
    );
  }
}

Calculator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Calculator);
