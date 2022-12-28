const getters = {
  accessToken: state => state.common.accessToken,
  language: state => state.common.language,
  userhost: state => state.common.userhost,
  role: state => state.common.role,
  downloadurl: state => state.common.downloadurl,
  deviceInfo: state => state.common.deviceInfo,
  devInfo: state => state.common.devInfo,
  controlserver: state => state.common.controlserver,
  invented: state => state.common.invented,
}

export default getters
