# Stronger by Disney — 28-Day Fitness PWA

A mobile-first Progressive Web App for a 28-day cardio, strength, and mobility plan.

## What it includes
- Day-by-day plan beginning September 21, 2026
- Automatic “Today” navigation
- YMCA machine and home/free-weight strength options
- Tappable exercise instructions and form cues
- Achilles check-in fields
- Completion checkboxes and progress bar
- Notes stored on the device
- Offline support after the first load

## Publish it free with GitHub Pages
1. Create a free GitHub account at https://github.com if you do not already have one.
2. Click **New repository**.
3. Name it something like `stronger-by-disney`.
4. Set it to **Public**. GitHub Pages is simplest this way on a free account.
5. Create the repository.
6. Upload every file from this folder to the repository root:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `manifest.json`
   - `sw.js`
   - `icon.svg`
7. In the repository, open **Settings → Pages**.
8. Under **Build and deployment**, choose **Deploy from a branch**.
9. Select branch **main** and folder **/(root)**, then click **Save**.
10. GitHub will provide a site address similar to:
   `https://YOUR-USERNAME.github.io/stronger-by-disney/`

## Add it to your phone
### iPhone
Open the GitHub Pages address in Safari → Share → **Add to Home Screen**.

### Android
Open the address in Chrome → browser menu → **Add to Home screen** or **Install app**.

## Important note about saved progress
Progress, Achilles check-ins, and notes are stored in your browser using localStorage. They remain on that device/browser. Clearing browser site data or switching phones will not automatically move the history.

## Editing the plan later
The workout schedule and exercise library are in `app.js`. After editing a file on GitHub and committing the change, GitHub Pages republishes the app automatically.
