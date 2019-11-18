import express from 'express';

import employee from './employee-route';

const app = express();
app.use(employee);
export default app;