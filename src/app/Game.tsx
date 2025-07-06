"use client";

import { useState, useEffect } from "react";

const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 50;
const ENEMY_WIDTH = 50;
const ENEMY_HEIGHT = 50;
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

const Game = () => {
  const [playerX, setPlayerX] = useState(GAME_WIDTH / 2 - PLAYER_WIDTH / 2);
  const [enemies, setEnemies] = useState<{ x: number; y: number }[]>([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setPlayerX((x) => Math.max(0, x - 10));
      } else if (e.key === "ArrowRight") {
        setPlayerX((x) => Math.min(GAME_WIDTH - PLAYER_WIDTH, x + 10));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const enemyInterval = setInterval(() => {
      const newEnemy = {
        x: Math.random() * (GAME_WIDTH - ENEMY_WIDTH),
        y: -ENEMY_HEIGHT,
      };
      setEnemies((prevEnemies) => [...prevEnemies, newEnemy]);
    }, 1000);

    const gameLoop = setInterval(() => {
      setEnemies((prevEnemies) =>
        prevEnemies
          .map((enemy) => ({ ...enemy, y: enemy.y + 5 }))
          .filter((enemy) => enemy.y < GAME_HEIGHT)
      );

      // Check for collisions
      enemies.forEach((enemy) => {
        if (
          playerX < enemy.x + ENEMY_WIDTH &&
          playerX + PLAYER_WIDTH > enemy.x &&
          GAME_HEIGHT - PLAYER_HEIGHT < enemy.y + ENEMY_HEIGHT &&
          GAME_HEIGHT > enemy.y
        ) {
          setGameOver(true);
        }
      });
    }, 1000 / 60);

    return () => {
      clearInterval(enemyInterval);
      clearInterval(gameLoop);
    };
  }, [gameOver, enemies, playerX]);

  return (
    <div
      style={{
        position: "relative",
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        backgroundColor: "#f0f0f0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: PLAYER_WIDTH,
          height: PLAYER_HEIGHT,
          backgroundColor: "blue",
          left: playerX,
          bottom: 0,
        }}
      />
      {enemies.map((enemy, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: ENEMY_WIDTH,
            height: ENEMY_HEIGHT,
            backgroundColor: "red",
            left: enemy.x,
            top: enemy.y,
          }}
        />
      ))}
      {gameOver && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "48px",
            color: "black",
          }}
        >
          Game Over
        </div>
      )}
    </div>
  );
};

export default Game;
