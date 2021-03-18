import React, { Component } from 'react';
import './PasswordStrengthMeter.css';

var zxcvbn = require('zxcvbn');

class PasswordStrengthMeter extends Component {
    createPasswordLabel = (result) => {
        switch (result.score) {
          case 0:
            return 'Weak';
          case 1:
            return 'Weak';
          case 2:
            return 'Fair';
          case 3:
            return 'Good';
          case 4:
            return 'Strong';
          default:
            return 'Weak';
        }
      }
      render() {
        const { password } = this.props;
        const testedResult = zxcvbn(password);
        return (
          <div className="password-strength-meter">
           <progress
    className={`password-strength-meter-progress strength-${this.createPasswordLabel(testedResult)}`}
    value={testedResult.score}
    max="4"
  />
            <br />
            <label
              className="password-strength-meter-label"
            >
              {password && (
                <>
                  <strong>Password strength:</strong> {this.createPasswordLabel(testedResult)}
                </>
              )}
            </label>
          </div>
        );
      }
}
/** 
 * result.score      # Integer from 0-4 (useful for implementing a strength bar)

  0 # too guessable: risky password. (guesses < 10^3)

  1 # very guessable: protection from throttled online attacks. (guesses < 10^6)

  2 # somewhat guessable: protection from unthrottled online attacks. (guesses < 10^8)

  3 # safely unguessable: moderate protection from offline slow-hash scenario. (guesses < 10^10)

  4 # very unguessable: strong protection from offline slow-hash scenario. (guesses >= 10^10) **/

export default PasswordStrengthMeter;