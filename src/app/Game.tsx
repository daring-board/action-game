"use client";

import { useState, useEffect, useRef } from "react";
import {
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  ENEMY_WIDTH,
  ENEMY_HEIGHT,
  GAME_WIDTH,
  GAME_HEIGHT,
  ENEMY_SPAWN_INTERVAL_MIN,
  ENEMY_SPAWN_INTERVAL_MAX,
} from "./constants";

const Game = () => {
  const [playerX, setPlayerX] = useState(GAME_WIDTH / 2 - PLAYER_WIDTH / 2);
  const [enemies, setEnemies] = useState<{ x: number; y: number }[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const enemyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const restartGame = () => {
    setPlayerX(GAME_WIDTH / 2 - PLAYER_WIDTH / 2);
    setEnemies([]);
    setScore(0);
    setGameOver(false);
  };

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

    const spawnEnemy = () => {
      const newEnemy = {
        x: Math.random() * (GAME_WIDTH - ENEMY_WIDTH),
        y: -ENEMY_HEIGHT,
      };
      setEnemies((prevEnemies) => [...prevEnemies, newEnemy]);

      const randomInterval =
        Math.random() * (ENEMY_SPAWN_INTERVAL_MAX - ENEMY_SPAWN_INTERVAL_MIN) +
        ENEMY_SPAWN_INTERVAL_MIN;
      enemyTimeoutRef.current = setTimeout(spawnEnemy, randomInterval);
    };

    spawnEnemy();

    const gameLoop = setInterval(() => {
      setScore((score) => score + 1);
      setEnemies((prevEnemies) => {
        const updatedEnemies = prevEnemies
          .map((enemy) => ({ ...enemy, y: enemy.y + 5 }))
          .filter((enemy) => enemy.y < GAME_HEIGHT);

        // Check for collisions
        updatedEnemies.forEach((enemy) => {
          if (
            playerX < enemy.x + ENEMY_WIDTH &&
            playerX + PLAYER_WIDTH > enemy.x &&
            GAME_HEIGHT - PLAYER_HEIGHT < enemy.y + ENEMY_HEIGHT &&
            GAME_HEIGHT > enemy.y
          ) {
            setGameOver(true);
          }
        });
        return updatedEnemies;
      });
    }, 1000 / 60);

    return () => {
      if (enemyTimeoutRef.current) {
        clearTimeout(enemyTimeoutRef.current);
      }
      clearInterval(gameLoop);
    };
  }, [gameOver, playerX]);

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
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
          <div className="text-5xl text-white">Game Over</div>
          <button
            onClick={restartGame}
            className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;
