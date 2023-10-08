import React from 'react';
import { connect } from 'react-redux';
import {
  getUserProfile,
  getStatus,
  setStatus,
  uploadPhoto,
  saveProfile,
} from '../../redux/profileReducer';
import Profile from './Profile';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { compose } from 'redux';
import withAuthRedirect from '../Hoc/withAuthRedirect';
import { actions } from '../../redux/profileReducer';
import { AppStateType } from '../../redux/reduxStore';
import { profileType } from '../../Types/types';
const updateStatus = actions.updateStatus;

type MapProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = {
  getUserProfile: (userId: number) => void;
  getStatus: (userId: number) => void;
  setStatus: (status: string) => void;
  updateStatus: (status: string) => void;
  uploadPhoto: (photo: File) => void;
  saveProfile: (profile: profileType) => Promise<any>;
};

type WithRouterProps = {
  router: {
    navigator: Navigator;
    location: Partial<Location> | string;
    params: any;
  };
};

type Props = MapProps & DispatchProps & WithRouterProps;

class ProfileContainer extends React.Component<Props> {
  refreshProfile = () => {
    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
    }
    // alert(this.props.userId);29703
    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
  };

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: Props, prevState: Props) {
    if (this.props.router.params.userId !== prevProps.router.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile
        {...this.props}
        isOwner={!this.props.router.params.userId}
        profile={this.props.profile}
        status={this.props.status}
        setStatus={this.props.setStatus}
        updateStatus={this.props.updateStatus}
        uploadPhoto={this.props.uploadPhoto}
        saveProfile={this.props.saveProfile}
      />
    );
  }
}

let mapStateToProps = (state: AppStateType) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
  };
};

function withRouter(Component: React.ComponentType) {
  function ComponentWithRouterProp(props: any) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    setStatus,
    updateStatus,
    uploadPhoto,
    saveProfile,
  }),
  withRouter,
  withAuthRedirect,
)(ProfileContainer);
