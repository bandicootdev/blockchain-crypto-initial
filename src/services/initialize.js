import config from '../config.json';
// eslint-disable-next-line import/named
import { p2pService, app } from './index';

const { nodes } = config;

nodes.forEach((node) => {
  const { PORT, PEER } = node;
  app.listen(PORT, () => {
    console.log(`server on port ${PORT}`);
    p2pService.listen(PEER);
  });
});

export default nodes;
