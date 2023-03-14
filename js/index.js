import Container from './Container.js';
import * as api from './service/api.js';

const response = await api.fetchUsers();
Container.createElement(response, '.container').render();