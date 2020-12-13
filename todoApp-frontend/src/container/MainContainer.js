import React, { Component } from "react";
import { connect } from "react-redux";

import Main from "../pages/Main";
import { changeTitle } from "../store/modules/todo";


class MainContainer extends Component {
  render() {
    return (
      <Main
        title={this.props.title}
        changeTitle={this.props.changeTitle} />
    );
  }
}

// props 로 넣어줄 스토어 상태값
const mapStateToProps = state => ({
  title: state.todo.title,
});

// props 로 넣어줄 액션 생성함수
const mapDispatchToProps = dispatch => ({
  changeTitle: title => dispatch(changeTitle(title)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);