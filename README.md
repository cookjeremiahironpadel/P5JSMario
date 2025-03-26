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
10. Press M to toggle sound on/off

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
- Background music and sound effects
- Sound toggle functionality (press M to mute/unmute)

## Implementation Notes

The game uses p5.js's built-in drawing functions to render all game elements directly on the canvas. This approach eliminates the need for external image and sound assets, making the game completely self-contained and easy to run in any browser without 404 errors.

For audio, the game uses p5.js's sound capabilities (p5.Oscillator and p5.MonoSynth) to generate simple sound effects and background music directly in the browser without requiring external audio files.

If you want to use custom assets instead of the built-in graphics, you can use the `create_assets.html` file to generate simple image assets, or replace the drawing code in each class's `display()` method with your own image loading and rendering code.

## Controls

- **SPACE** - Jump / Restart game after game over
- **LEFT ARROW** - Move Mario left
- **RIGHT ARROW** - Move Mario right
- **M** - Toggle sound on/off

## Preview

The game features:
- A red and blue Mario character
- Green pipes (bump into them to get pushed back)
- Brown goomba enemies (avoid these as they'll end your game)
- Golden coins to collect
- White clouds in the background
- Brown ground tiles
- Background music and sound effects for actions

## Notes

This is a simplified version of Mario for educational purposes. The game doesn't include all features from the original Mario games but captures the core endless runner mechanics.

## Version History

- v1.0: Basic endless runner with Mario graphics
- v1.1: Added left/right movement and pipe collision without game over
- v1.2: Added sound effects and background music with mute option

## Assets

The game requires the following assets in the `