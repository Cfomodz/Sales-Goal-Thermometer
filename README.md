# Sales Goal Thermometer

A Next.js application that displays fundraising progress with an interactive thermometer visualization.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can customize the fundraising goal and progress by editing the `data/config.json` file.

## Features

- Interactive SVG thermometer visualization
- Configurable fundraising goal and progress
- Responsive design for all devices
- Static export for easy deployment
- API route for data integration (static during build)

## Project Structure

- `/app` - Pages and API routes
- `/components` - Reusable React components
- `/data` - Configuration files
- `/public` - Static assets

## Configuration

Edit the `data/config.json` file to change the fundraising goals and thermometer appearance:

```json
{
  "goal_amount": 10000,
  "initial_progress": 8600,
  "thermometer": {
    "layout": "1",
    "fill_color": "rgba(231, 97, 81, 1)",
    "goal_amount": 1000,
    "show_goal_amount": true,
    "show_progress_percentage": true,
    "show_progress_amount": true,
    "animate_progress_fill": true
  }
}
```

## Deploy on Render

This project is configured for deployment on [Render](https://render.com/):

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Use the following settings:
   - **Build Command**: `npm install; npm run build`
   - **Start Command**: (Optional for static sites)
   - **Publish Directory**: `out`

For more information, see the [Render documentation for static sites](https://render.com/docs/static-sites).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial
