# NATION STOPPER 🏇
A cinematic, playable 24-runner racing game for GitHub Pages. No libraries, database, paid APIs, build tools or server required.

**Planned public URL:** https://virtualhowto.github.io/nationstopper/

## Play
Select any of the 24 horses and press **Enter the Gates**.
- **Hold Space / RIDE** to accelerate, release to recover stamina.
- **Left / Right arrows or A / D** to change lanes and avoid being boxed in.
- **Shift / KICK** when focus is ready for a finishing burst.
- **P / Pause** to pause; sound is optional.
- Full touch controls for phones and tablets.

The accelerated 3,200-metre race uses 24 independently simulated runners. Positions and podium vary depending on player actions and the simulation.

## Deploy to GitHub Pages
1. Open **Settings → Pages** in this GitHub repository.
2. Under **Build and deployment**, choose **GitHub Actions** as the Source.
3. If necessary, go to **Actions → Deploy Nation Stopper → Run workflow**.
4. Once the Pages deployment succeeds, open https://virtualhowto.github.io/nationstopper/

New commits to main trigger redeployment. No environment variables or secrets are needed.

## Local development
Run python3 -m http.server 8000 and open http://localhost:8000, or simply open index.html in a modern browser.

## Files
- index.html — accessible page and racing interface
- styles.css — responsive visual design
- game.js — original HTML Canvas 2.5D animation, racing physics, AI and controls
- favicon.svg — brand icon
- .github/workflows/pages.yml — verification and publishing

## Disclaimer
This is an **unofficial fictional arcade simulation**, not a betting platform, odds feed or prediction of the real 2026 Melbourne Cup. Names, jockeys, barriers and weights were provided by the user. Arcade speed and track-handling ratings are invented solely for game balance and are **not racing form statistics**. Soft 5 is an in-game condition, not a live track update. Procedural artwork and game audio are original. Not affiliated with the VRC, Racing Victoria or any bookmaker.