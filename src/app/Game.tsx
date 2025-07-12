"use client";

import { useState, useEffect } from "react";
import {
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  ENEMY_WIDTH,
  ENEMY_HEIGHT,
  GAME_WIDTH,
  GAME_HEIGHT,
} from "./constants";

const Game = () => {
  const [playerX, setPlayerX] = useState(GAME_WIDTH / 2 - PLAYER_WIDTH / 2);
  const [enemies, setEnemies] = useState<{ x: number; y: number }[]>([]);
  const [score, setScore] = useState(0);
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
      setScore((score) => score + 1);
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
      className="relative overflow-hidden bg-gray-100"
      style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
    >
      <div className="absolute top-2 left-2 text-2xl text-black">
        Score: {score}
      </div>
      <div
        className="absolute bg-blue-500"
        style={{
          width: PLAYER_WIDTH,
          height: PLAYER_HEIGHT,
          left: playerX,
          bottom: 0,
        }}
      />
      {enemies.map((enemy, i) => (
        <div
          key={i}
          className="absolute bg-red-500"
          style={{
            width: ENEMY_WIDTH,
            height: ENEMY_HEIGHT,
            left: enemy.x,
            top: enemy.y,
          }}
        />
      ))}
      {gameOver && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-black">
          Game Over
        </div>
      )}
    </div>
  );
};

export default Game;
