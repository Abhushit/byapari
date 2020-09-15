import React, { Component } from "react";

export default class SubmitButton extends Component {

  render() {
    let btn = this.props.isSubmitting ? (
      <>
        <button disabled className="btn btn-info">
          submitting...
        </button>
      </>
    ) : (
      <>
        <button
          disabled={!this.props.isValidForm}
          type="submit"
          className="btn btn-info"
        >
          submit
        </button>
      </>
    )

    return(
    <> {btn} </>
    )
  }
}
