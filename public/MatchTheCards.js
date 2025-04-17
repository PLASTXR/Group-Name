document.addEventListener('DOMContentLoaded', function() {
    // Game variables
    let cards = [];
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let correctGuesses = 0;
    let totalPairs = 3; 
    
    
    const cardSymbols = ['🍎', '🍌', '🍒', '🍎', '🍌', '🍒'];//lol i was not downloading images
    
    // Shuffle function - Fisher-Yates algorithm, preedy cool
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
   
    function initializeGame() {
      
        cards = document.querySelectorAll('.flip-card');
        
        // Shuffle the symbols
        const shuffledSymbols = shuffle([...cardSymbols]);
        
        // Assign symbols to cards
        cards.forEach((card, index) => {
         
            const backSide = card.querySelector('.flip-card-back');
            backSide.textContent = shuffledSymbols[index];
            
         
            card.addEventListener('click', flipCard);
        });
        
        
        updateScoreDisplay();
    }
    
    
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;
        
        this.classList.add('flipped');
        this.querySelector('.flip-card-inner').style.transform = 'rotateY(180deg)';
        
        if (!hasFlippedCard) {
          
            hasFlippedCard = true;
            firstCard = this;
            return;
        }
        
        
        secondCard = this;
        checkForMatch();
    }
    

    function checkForMatch() {
        const firstSymbol = firstCard.querySelector('.flip-card-back').textContent;
        const secondSymbol = secondCard.querySelector('.flip-card-back').textContent;
        
        if (firstSymbol === secondSymbol) {
            
            disableCards();
            correctGuesses++;
            updateScoreDisplay();
            
            
            if (correctGuesses === totalPairs) {
                setTimeout(() => {
                    alert('Congratulations! You won!');
                    resetGame();
                }, 500);
            }
        } else {
           
            unflipCards();
        }
    }
    
    // Disable matched cards
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        
        resetBoard();
    }
    
    // Unflip cards that don't match
    function unflipCards() {
        lockBoard = true;
        
        setTimeout(() => {
            firstCard.querySelector('.flip-card-inner').style.transform = 'rotateY(0deg)';
            secondCard.querySelector('.flip-card-inner').style.transform = 'rotateY(0deg)';
            
            resetBoard();
        }, 1000);
    }
    
    // Reset board state
    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }
    
    // Update the score display
    function updateScoreDisplay() {
        const scoreElement = document.querySelector('#correctGuesses');
        if (scoreElement) {
            scoreElement.textContent = `Correct guesses: ${correctGuesses}/${totalPairs}`;
        }
    }
    
   
    function resetGame() {
       
        cards.forEach(card => {
            card.querySelector('.flip-card-inner').style.transform = 'rotateY(0deg)';
            card.addEventListener('click', flipCard);
        });
        
        
        correctGuesses = 0;
        resetBoard();
        
        // Reinitialize the game with new shuffled cards
        setTimeout(initializeGame, 500);
    }
    
    // Start the game
    initializeGame();
});