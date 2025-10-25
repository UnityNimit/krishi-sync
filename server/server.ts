import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

// This will proxy requests to the OpenWeatherMap API
app.use('/api/weather', createProxyMiddleware({
    target: 'https://api.openweathermap.org',
    changeOrigin: true,
    pathRewrite: (path, req) => {
        const { lat, lon } = req.query;
        return `/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;
    },
}));

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});