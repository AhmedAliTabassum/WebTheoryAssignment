# Taskflow Dashboard

A small React task management dashboard built for the Web Engineering assignment. It demonstrates reusable functional components, a class based activity logger, React hooks, context, local storage, filtering, and responsive light/dark themes.

## Run locally

1. Install Node.js (LTS).
2. From this folder, run `npm install`.
3. Run `npm run dev` and open the local address shown in the terminal.
4. Run `npm run build` to create the production site in `dist/`.

Tasks, theme selection, and recent activity are saved in this browser's local storage.

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. Sign in to [Vercel](https://vercel.com/) and choose **Add New → Project**.
3. Import the GitHub repository.
4. Vercel should detect Vite. Use `npm run build` as the build command and `dist` as the output directory.
5. Select **Deploy**. Vercel will provide the live URL when deployment finishes.

No personal details or environment variables are required by this project.
