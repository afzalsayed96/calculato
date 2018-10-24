import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const mexp = require('math-expression-evaluator')

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

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      operand1: '',
      operand2: '',
      operator: '',
      result: ''
    }
  }

  handleClick = (e) => {
    var input = e.currentTarget.value;
    if (input === '⟵') {
      if (this.state.operand2 !== '') {
        this.setState((state) => ({
          operand2: state.operand2.toString().slice(0, -1),
          text: state.text.toString().slice(0, -1)
        }));
      }
      else if (this.state.operator !== '') {
        this.setState((state) => ({
          operator: '',
          text: state.text.toString().slice(0, -1)
        }));
      }
      else if (this.state.operand1 !== '') {
        this.setState((state) => ({
          operand1: state.operand1.toString().slice(0, -1),
          text: state.text.toString().slice(0, -1)
        }));
      }
    }
    else if (parseInt(input) == input) {
      if (this.state.operator === '') {
        this.setState((state) => ({
          operand1: (state.operand1 == 1 / 0 || state.operand1 == -(1 / 0)) ? input : state.operand1 + input,
          text: (state.operand1 == 1 / 0 || state.operand1 == -(1 / 0)) ? input : state.operand1 + input
        }));
      }
      else {
        this.setState((state) => ({
          operand2: state.operand2 + input,
          text: state.text + input
        }));
      }
    }
    else if (this.state.operand2 === '' && this.state.operand1 !== '' && input !== '=') {
      this.setState((state) => ({
        operator: input.replace('×', '*'),
        text: (state.operator === '') ? state.text + input : state.text.toString().slice(0, -1) + input
      }));
    }
    else if (input === '=' && this.state.operand2 !== '' && this.state.operand1 !== '') {
      this.setState((state) => ({
        result: mexp.eval(parseInt(state.operand1) + state.operator + parseInt(state.operand2)),
        text: mexp.eval(parseInt(state.operand1) + state.operator + parseInt(state.operand2)),
        operand1: mexp.eval(parseInt(state.operand1) + state.operator + parseInt(state.operand2)),
        operand2: '',
        operator: ''
      }));
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
                <Paper className={classes.paper} >{this.state.text}</Paper>
              </Grid>

            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.root} justify="center" spacing={24}>
              {[1, 2, 3, '-'].map(value => (
                <Grid key={value} item>
                  <Button variant="contained" color="primary" onClick={this.handleClick} value={value}>{value}</Button>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.root} justify="center" spacing={24}>
              {[4, 5, 6, '+'].map(value => (
                <Grid key={value} item>
                  <Button variant="contained" color="primary" onClick={this.handleClick} value={value}>{value}</Button>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.root} justify="center" spacing={24}>
              {[7, 8, 9, '×'].map(value => (
                <Grid key={value} item>
                  <Button variant="contained" color="primary" onClick={this.handleClick} value={value}>{value}</Button>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.root} justify="center" spacing={24}>
              {['⟵', 0, '=', '/'].map(value => (
                <Grid key={value} item>
                  <Button variant="contained" color="primary" onClick={this.handleClick} value={value}>{value}</Button>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Calculator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Calculator);
