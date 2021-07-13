import { AppConfig, UserSession, showConnect } from '@stacks/connect';

const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSession = new UserSession({ appConfig });

export const authenticate = () => {
  showConnect({
    appDetails: {
      name: 'SubStx',
      icon: 'https://cdn3.iconfinder.com/data/icons/user-interface-797/32/User_Interface_layer_stack_layers_UI-4096.png',
    },
    redirectTo: '/',
    onFinish: () => {
      // Save or otherwise utilize userData post-authentication
      userSession.loadUserData();
      const sessionData = userSession.store.getSessionData();
      userSession.store.setSessionData(sessionData);
    },
    userSession,
  });
}