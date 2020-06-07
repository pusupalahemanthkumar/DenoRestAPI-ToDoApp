import React from "react";

class Header extends React.Component {
  state = {
    userInput: "",
  };
  changeInputHandler = (event) => {
    this.setState({
      userInput: event.target.value,
    });
  };
  submitHandler = (event) => {
    this.props.onAdd(this.state.userInput);
  };

  render() {
    return (
      <div className="Add-Task">
        <input
          type="text"
          onChange={(event) => this.changeInputHandler(event)}
          value={this.state.userInput}
          placeholder="Add tasks..."
        />
        <button
          onClick={() => {
            return this.props.onAdd(this.state.userInput);
          }}
        >
          add
        </button>
      </div>
    );
  }
}

export default Header;
