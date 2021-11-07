import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { Storage } from '@stacks/storage';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });
const storage = new Storage({ userSession });

// Login to Stacks agent
export const login = () => {
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
};

// Logout from Stacks agent
export const logout = () => {
  userSession.signUserOut();
};

export const loggedIn = () => {
  return userSession.isUserSignedIn();
};

export const getSessionData = () => {
  return userSession.store.getSessionData();
};

// Persist data to Gaia hub
const persistData = async (file, data, options = {}) => {
  await storage.putFile(file, JSON.stringify(data), options);
};

export const generateContentId = () => {
  return uuidv4();
};

// Persist user-generated content to Gaia hub
export const persistContent = async (data, slug = generateContentId(), options = {}) => {
  const contentId = data.id ? data.id : slug;
  await persistData(`substx/content/${contentId}.json`, { ...data, id: contentId }, options);
};

// Fetch data from Gaia hub
const fetchData = async (file, options = {}) => {
  let data;
  try {
    data = JSON.parse(await storage.getFile(file, options));
  } catch (error) {
    data = {};
  }
  return data;
};

// Fetch single user-generated content item from Gaia hub
export const fetchContent = async (slug, options = {}) => {
  const data = await fetchData(`substx/content/${slug}.json`, options);
  return data;
};

// Fetch all user-generated data of certain model
// from Gaia hub and populate template data
const listData = async (slug, data) => {
  data.length = 0;
  const count = await storage.listFiles(async (file) => {
    if (file.startsWith(slug)) {
      const d = await fetchData(file);
      data.push(d);
    }
  });
  return count;
};

// Fetch all user-generated content of certain model
// from Gaia hub and populate template data
export const listContent = async (data) => {
  const count = await listData('substx/content', data);
  return count;
};

// Checks if user-generated contents exists in Gaia hub
export const hasContent = async (data = []) => {
  const count = await listContent(data);
  return count > 0;
};

// Delete user-generated data
export const deleteContent = async (slug) => {
  await storage.deleteFile(`substx/content/${slug}.json`);
};

// Clear user-generated data
export const clearContent = async (content) => {
  content.forEach(async (item) => {
    await deleteContent(item.id);
  });
};

// Process SQL-like query on data
export const processQuery = (data, query) => {
  switch (query.type) {
    case 'ORDER_BY': {
      const field = query.field;
      const direction = query.direction;
      data.sort((a, b) => {
        if (direction < 0) {
          return b[field] - a[field];
        }
        return a[field] - b[field];
      });
      break;
    }
  }
};

// Process multiple SQL-like queries on data
export const processQueries = (data, queries=[]) => {
  queries.forEach((q) => {
    processQuery(data, q);
  });
};
