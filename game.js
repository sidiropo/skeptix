class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentLevel = 1;
        this.tileSize = 40;
        this.balls = [];
        this.timeLeft = 0;
        this.timerInterval = null;
        
        // Load completed levels from localStorage or start fresh
        this.completedLevels = new Set(
            JSON.parse(localStorage.getItem('completedLevels') || '[]')
        );
        
        this.setupControls();
        this.loadLevel(this.currentLevel);
        this.updateControlButtons();
        
        // Handle keyboard input
        document.addEventListener('keydown', (e) => this.handleInput(e));
    }

    setupControls() {
        document.getElementById('prevLevel').onclick = () => {
            if (this.currentLevel > 1) {
                this.currentLevel--;
                this.loadLevel(this.currentLevel);
                this.updateControlButtons();
            }
        };

        document.getElementById('nextLevel').onclick = () => {
            // Can only advance if current level is completed
            if (this.currentLevel < 36 && this.completedLevels.has(this.currentLevel)) {
                this.currentLevel++;
                this.loadLevel(this.currentLevel);
                this.updateControlButtons();
            }
        };

        document.getElementById('restartLevel').onclick = () => {
            this.loadLevel(this.currentLevel);
        };
    }

    updateControlButtons() {
        const nextButton = document.getElementById('nextLevel');
        // Disable next button if current level isn't completed
        nextButton.disabled = !this.completedLevels.has(this.currentLevel);
    }

    async loadLevel(levelNumber) {
        clearInterval(this.timerInterval);
        
        const data = MAPS[levelNumber];
        if (!data) {
            alert(`Level ${levelNumber} not found!`);
            // If going forward, stay at current level
            // If going backward, go to level 1
            this.currentLevel = levelNumber > this.currentLevel ? this.currentLevel : 1;
            return;
        }
        
        const lines = data.trim().split('\n');
        
        this.timeLeft = parseInt(lines[0]);
        const [width, height] = lines[1].split(' ').map(Number);
        
        this.canvas.width = width * this.tileSize;
        this.canvas.height = height * this.tileSize;
        
        this.grid = [];
        for (let i = 0; i < height; i++) {
            this.grid[i] = lines[i + 2].split('');
        }
        
        const numBalls = parseInt(lines[height + 2]);
        this.balls = [];
        
        for (let i = 0; i < numBalls; i++) {
            const [startX, startY, targetX, targetY] = lines[height + 3 + i]
                .split(' ')
                .map(x => parseInt(x) - 1); // Convert to 0-based indexing
            
            this.balls.push({
                x: startX,
                y: startY,
                targetX,
                targetY,
                number: i + 1
            });
        }
        
        this.startTimer();
        this.draw();
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            document.getElementById('timer').textContent = `Time: ${this.timeLeft}s`;
            
            if (this.timeLeft <= 0) {
                clearInterval(this.timerInterval);
                alert('Time\'s up!');
                this.loadLevel(this.currentLevel);
            }
        }, 1000);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[y].length; x++) {
                const cell = this.grid[y][x];
                if (cell === 'X') {
                    this.ctx.fillStyle = '#666';
                    this.ctx.fillRect(x * this.tileSize, y * this.tileSize, 
                                    this.tileSize, this.tileSize);
                } else if (cell === '=') {
                    this.ctx.fillStyle = '#f44';
                    this.ctx.fillRect(x * this.tileSize, y * this.tileSize, 
                                    this.tileSize, this.tileSize);
                }
            }
        }
        
        // First draw all targets
        this.balls.forEach(ball => {
            // Draw target circle
            this.ctx.fillStyle = '#afa';
            this.ctx.beginPath();
            this.ctx.arc(
                (ball.targetX + 0.5) * this.tileSize,
                (ball.targetY + 0.5) * this.tileSize,
                this.tileSize * 0.4,
                0, Math.PI * 2
            );
            this.ctx.fill();
            
            // Draw target number
            this.ctx.fillStyle = '#000';
            this.ctx.font = `${this.tileSize * 0.5}px Arial`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(
                ball.number,
                (ball.targetX + 0.5) * this.tileSize,
                (ball.targetY + 0.5) * this.tileSize
            );
        });
        
        // Then draw all balls
        this.balls.forEach(ball => {
            // Draw ball
            this.ctx.fillStyle = '#00f';
            this.ctx.beginPath();
            this.ctx.arc(
                (ball.x + 0.5) * this.tileSize,
                (ball.y + 0.5) * this.tileSize,
                this.tileSize * 0.4,
                0, Math.PI * 2
            );
            this.ctx.fill();
            
            // Draw ball number
            this.ctx.fillStyle = '#fff';
            this.ctx.font = `${this.tileSize * 0.5}px Arial`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(
                ball.number,
                (ball.x + 0.5) * this.tileSize,
                (ball.y + 0.5) * this.tileSize
            );
        });
    }

    handleInput(e) {
        let dx = 0, dy = 0;
        
        switch (e.key) {
            case 'ArrowLeft': dx = -1; break;
            case 'ArrowRight': dx = 1; break;
            case 'ArrowUp': dy = -1; break;
            case 'ArrowDown': dy = 1; break;
            default: return;
        }
        
        this.moveBalls(dx, dy);
        this.checkWinCondition();
    }

    moveBalls(dx, dy) {
        // Sort balls based on movement direction to handle collisions correctly
        const sortedBalls = [...this.balls].sort((a, b) => {
            if (dx > 0) return b.x - a.x;
            if (dx < 0) return a.x - b.x;
            if (dy > 0) return b.y - a.y;
            if (dy < 0) return a.y - b.y;
            return 0;
        });

        let touchedFire = false;
        
        sortedBalls.forEach(ball => {
            let newX = ball.x + dx;
            let newY = ball.y + dy;
            
            // Check if new position is valid
            if (this.isValidMove(newX, newY, ball)) {
                // Check if the new position is fire
                if (this.grid[newY][newX] === '=') {
                    touchedFire = true;
                }
                ball.x = newX;
                ball.y = newY;
            }
        });
        
        this.draw();
        
        // If any ball touched fire, restart the level
        if (touchedFire) {
            setTimeout(() => {
                alert('A ball touched fire! Level restarting...');
                this.loadLevel(this.currentLevel);
            }, 100); // Small delay so the player can see what happened
        }
    }

    isValidMove(x, y, ball) {
        // Check bounds
        if (y < 0 || y >= this.grid.length || 
            x < 0 || x >= this.grid[0].length) {
            return false;
        }
        
        // Check walls
        if (this.grid[y][x] === 'X') {
            return false;
        }
        
        // Check fire - allow move but will trigger loss
        if (this.grid[y][x] === '=') {
            return true;
        }
        
        // Check other balls
        return !this.balls.some(other => 
            other !== ball && other.x === x && other.y === y
        );
    }

    checkWinCondition() {
        const won = this.balls.every(ball => 
            ball.x === ball.targetX && ball.y === ball.targetY
        );
        
        if (won) {
            clearInterval(this.timerInterval);
            // Add current level to completed levels
            this.completedLevels.add(this.currentLevel);
            // Save to localStorage
            localStorage.setItem('completedLevels', 
                JSON.stringify([...this.completedLevels]));
            
            alert('Level Complete!');
            if (this.currentLevel < 36) {
                this.currentLevel++;
                this.loadLevel(this.currentLevel);
                this.updateControlButtons();
            } else {
                alert('Congratulations! You\'ve completed all levels!');
            }
        }
    }
}

// Start the game when the page loads
window.onload = () => {
    new Game();
}; 