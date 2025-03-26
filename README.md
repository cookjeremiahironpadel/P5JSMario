# P5.js Mario-like Endless Runner

A simple endless runner game inspired by Mario, created with p5.js.

## How to Play

1. Open `index.html` in a web browser
2. Press SPACE to jump
3. Use LEFT and RIGHT arrow keys to move horizontally
4. Avoid goombas (they will end your game)
5. You can bump into pipes (you won't die, but will get pushed back)
6. Collect coins to increase your score
7. The game gradually gets faster as you play
8. If you hit a goomba, the game ends
9. Press SPACE to restart after game over

## Features

- Mario character with jumping animation
- Left/right movement controls for more flexibility
- Randomly generated obstacles (pipes and goombas)
- Only goombas kill you - pipes just push you back
- Collectible coins that increase your score
- Parallax scrolling clouds
- Ground tiles that create the terrain
- Increasing difficulty as game progresses
- Simple collision detection
- Game over state with restart functionality
- Version number display in top-right corner

## Implementation Notes

The game uses p5.js's built-in drawing functions to render all game elements directly on the canvas. This approach eliminates the need for external image and sound assets, making the game completely self-contained and easy to run in any browser without 404 errors.

If you want to use custom assets instead of the built-in graphics, you can use the `create_assets.html` file to generate simple image assets, or replace the drawing code in each class's `display()` method with your own image loading and rendering code.

## Controls

- **SPACE** - Jump / Restart game after game over
- **LEFT ARROW** - Move Mario left
- **RIGHT ARROW** - Move Mario right

## Preview

The game features:
- A red and blue Mario character
- Green pipes (bump into them to get pushed back)
- Brown goomba enemies (avoid these as they'll end your game)
- Golden coins to collect
- White clouds in the background
- Brown ground tiles

## Notes

This is a simplified version of Mario for educational purposes. The game doesn't include all features from the original Mario games but captures the core endless runner mechanics.

## Assets

The game requires the following assets in the `