import { Box, Container, Heading, Text, VStack, Link, Image } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

const Index = () => {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([{ x: 200, y: 200 }]);
  const [food, setFood] = useState({ x: 300, y: 300 });
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          setDirection({ x: 0, y: -20 });
          break;
        case "ArrowDown":
          setDirection({ x: 0, y: 20 });
          break;
        case "ArrowLeft":
          setDirection({ x: -20, y: 0 });
          break;
        case "ArrowRight":
          setDirection({ x: 20, y: 0 });
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const moveSnake = () => {
      let newSnake = [...snake];
      let head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

      newSnake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        setFood({
          x: Math.floor(Math.random() * (canvasRef.current.width / 20)) * 20,
          y: Math.floor(Math.random() * (canvasRef.current.height / 20)) * 20,
        });
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);

      if (head.x < 0 || head.x >= canvasRef.current.width || head.y < 0 || head.y >= canvasRef.current.height || newSnake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
      }
    };

    const gameLoop = setInterval(() => {
      if (!gameOver) {
        moveSnake();
      }
    }, 100);

    return () => clearInterval(gameLoop);
  }, [snake, direction, gameOver, food]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    snake.forEach((segment) => {
      ctx.fillStyle = "green";
      ctx.fillRect(segment.x, segment.y, 20, 20);
    });

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 20, 20);
  }, [snake, food]);

  return (
    <Container maxW="container.md" centerContent>
      <VStack spacing={4} align="stretch">
        <Box p={5} shadow="md" borderWidth="1px">
          <Heading fontSize="xl">Leonard Pauli</Heading>
          <Text mt={4}>Welcome to my personal website! I'm a software developer and tech enthusiast. Enjoy playing the snake game below!</Text>
        </Box>
        <Box p={5} shadow="md" borderWidth="1px">
          <canvas ref={canvasRef} width="400" height="400" style={{ border: "1px solid black" }}></canvas>
          {gameOver && <Text>Game Over! Refresh to play again.</Text>}
        </Box>
        <Box p={5} shadow="md" borderWidth="1px">
          <Heading fontSize="xl">Contact Me</Heading>
          <Link href="https://github.com/leonardpauli" isExternal>
            <FaGithub /> GitHub
          </Link>
          <Link href="https://linkedin.com/in/leonardpauli" isExternal>
            <FaLinkedin /> LinkedIn
          </Link>
          <Link href="mailto:leonard@example.com">
            <FaEnvelope /> Email Me
          </Link>
        </Box>
        <Box p={5} shadow="md" borderWidth="1px">
          <Image src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxMZW9uYXJkJTIwUGF1bGklMjBwb3J0cmFpdHxlbnwwfHx8fDE3MTQ1NzY3OTB8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Leonard Pauli" />
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
