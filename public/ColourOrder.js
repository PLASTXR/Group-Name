document.addEventListener('DOMContentLoaded', function() {
    // Game elements
    const colorCards = {
        red: document.getElementById('red'),
        green: document.getElementById('green'),
        blue: document.getElementById('blue'),
        yellow: document.getElementById('yellow')
    };
    
    const roundDisplay = document.querySelector('.card-body');
    const quitButton = document.querySelector('.btn');
    
    // Game variables
    let sequence = [];
    let playerSequence = [];
    let round = 1;
    let isDisplayingSequence = false;
    let canAcceptInput = false;
    
    // Initialize the game
    function initGame() {
        // Set up event listeners for color cards
        Object.values(colorCards).forEach(card => {
            card.addEventListener('click', handleColorClick);
            card.style.cursor = 'pointer';
        });
        
        // Update round display
        updateRoundDisplay();
        
        // Start the first round
        startNewRound();
    }
    
    // Start a new round
    function startNewRound() {
        canAcceptInput = false;
        playerSequence = [];
        
        // Add a new random color to the sequence
        const colors = Object.keys(colorCards);
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        sequence.push(randomColor);
        
        // Display the sequence to the player
        displaySequence();
    }
    
    // Display the color sequence to the player
    function displaySequence() {
        isDisplayingSequence = true;
        let i = 0;
        
        const displayNextColor = () => {
            if (i >= sequence.length) {
                isDisplayingSequence = false;
                canAcceptInput = true;
                return;
            }
            
            const currentColor = sequence[i];
            highlightCard(currentColor);
            
            setTimeout(() => {
                unhighlightCard(currentColor);
                setTimeout(() => {
                    i++;
                    displayNextColor();
                }, 300); // Short pause between colors
            }, 800); // Time each color stays highlighted
        };
        
        displayNextColor();
    }
    
    // Highlight a card (visual feedback)
    function highlightCard(color) {
        const card = colorCards[color];
        card.style.boxShadow = '0 0 20px white';
        card.style.transform = 'scale(1.05)';
    }
    
    // Remove highlight from a card
    function unhighlightCard(color) {
        const card = colorCards[color];
        card.style.boxShadow = '';
        card.style.transform = '';
    }
    
    // Handle player's color selection
    function handleColorClick(e) {
        if (!canAcceptInput || isDisplayingSequence) return;
        
        const clickedColor = Object.keys(colorCards).find(
            color => colorCards[color] === e.currentTarget
        );
        
        if (!clickedColor) return;
        
        // Visual feedback for player's selection
        highlightCard(clickedColor);
        setTimeout(() => unhighlightCard(clickedColor), 300);
        
        // Add to player's sequence
        playerSequence.push(clickedColor);
        
        // Check if the sequence is correct
        checkSequence();
    }
    
    // Check if player's sequence matches
    function checkSequence() {
        const currentIndex = playerSequence.length - 1;
        
        // Check if the current selection is wrong
        if (playerSequence[currentIndex] !== sequence[currentIndex]) {
            endGame(false);
            return;
        }
        
        // Check if the player completed the sequence
        if (playerSequence.length === sequence.length) {
            round++;
            updateRoundDisplay();
            
            // Start next round after a short delay
            setTimeout(startNewRound, 1000);
        }
    }
    
    // End the game (win or lose)
    function endGame(success) {
        canAcceptInput = false;
        
        // Flash all cards to indicate game over
        Object.keys(colorCards).forEach(color => {
            highlightCard(color);
        });
        
        setTimeout(() => {
            Object.keys(colorCards).forEach(color => {
                unhighlightCard(color);
            });
            
            alert(success 
                ? `Congratulations! You completed ${round} rounds!` 
                : `Game Over! You made it to round ${round}.`);
            
            // Reset the game
            resetGame();
        }, 1000);
    }
    
    // Update the round display
    function updateRoundDisplay() {
        if (roundDisplay) {
            roundDisplay.textContent = `Round: ${round}`;
        }
    }
    
    // Reset the game
    function resetGame() {
        sequence = [];
        playerSequence = [];
        round = 1;
        updateRoundDisplay();
        
        // Start a new game after reset
        setTimeout(startNewRound, 1000);
    }
    
    // Quit button functionality
    if (quitButton) {
        quitButton.addEventListener('click', () => {
            window.location.href = 'home.html';
        });
    }
    
    // Start the game
    initGame();
});