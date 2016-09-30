import React            from 'react';
import { connect }      from 'react-redux';
import BoardsActions    from '../actions/boards';
import Header           from '../layouts/header';

class AuthenticatedContainer extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(Actions.fetchBoards());
  }

  render() {
    const { currentUser, dispatch } = this.props;

    if (!currentUser) return false;

    return (
      <div className="application-container">
        <Header currentUser={currentUser} dispatch={dispatch} />

        <div className="main-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentIser: state.session.currentUser,
});

export default connect(mapStateToProps)(AuthenticatedContainer);
