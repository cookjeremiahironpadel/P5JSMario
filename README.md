# P5.js Mario-like Endless Runner

A simple endless runner game inspired by Mario, created with p5.js.

## How to Play

1. Open `index.html` in a web browser
2. Press SPACE to jump
3. Avoid obstacles (pipes and goombas)
4. Collect coins to increase your score
5. The game gradually gets faster as you play
6. If you hit an obstacle, the game ends
7. Press SPACE to restart after game over

## Features

- Mario character with jumping animation
- Randomly generated obstacles (pipes and goombas)
- Collectible coins that increase your score
- Parallax scrolling clouds
- Ground tiles that create the terrain
- Increasing difficulty as game progresses
- Simple collision detection
- Game over state with restart functionality

## Implementation Notes

The game uses p5.js's built-in drawing functions to render all game elements directly on the canvas. This approach eliminates the need for external image and sound assets, making the game completely self-contained and easy to run in any browser without 404 errors.

If you want to use custom assets instead of the built-in graphics, you can use the `create_assets.html` file to generate simple image assets, or replace the drawing code in each class's `display()` method with your own image loading and rendering code.

## Controls

- **SPACE** - Jump / Restart game after game over

## Preview

The game features:
- A red and blue Mario character
- Green pipes and brown goomba enemies as obstacles
- Golden coins to collect
- White clouds in the background
- Brown ground tiles

## Notes

This is a simplified version of Mario for educational purposes. The game doesn't include all features from the original Mario games but captures the core endless runner mechanics.

## Assets

The game requires the following assets in the `