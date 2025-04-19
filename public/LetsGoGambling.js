document.addEventListener('DOMContentLoaded', function() {
    
    const gameContainer = document.createElement('div');
    const rollButton = document.createElement('button');
    const resultDisplay = document.createElement('div');
    const highScoreDisplay = document.createElement('div');
    const rollHistory = document.createElement('div');
    const statsDisplay = document.createElement('div');
    
   
    let highestNumber = 0;
    let lowestNumber = 100;
    let currentRoll = 0;
    let rollCount = 0;
    let totalSum = 0;
    let rollHistoryArray = [];
    
   
    function initGame() {
        
        gameContainer.style.cssText = `
            text-align: center;
            font-family: 'Arial', sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background: #f5f5f5;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        `;
        
        
        rollButton.textContent = '🎲 Roll Number (1-100) 🎲';
        rollButton.style.cssText = `
            padding: 15px 30px;
            font-size: 18px;
            background: linear-gradient(to right, #A432A8, #641F66);
            color: white;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            margin: 20px 0;
            transition: all 0.3s;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        `;
        
      
        rollButton.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 8px rgba(0,0,0,0.15)';
        });
        
        rollButton.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        });
        
        rollButton.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(1px)';
        });
        
      
        const displayStyle = `
            font-size: 24px;
            margin: 15px 0;
            padding: 10px;
            background: white;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        `;
        
        resultDisplay.style.cssText = displayStyle;
        highScoreDisplay.style.cssText = displayStyle;
        statsDisplay.style.cssText = displayStyle + 'font-size: 18px;';
        rollHistory.style.cssText = displayStyle + 'max-height: 150px; overflow-y: auto;';
        
       
        gameContainer.appendChild(rollButton);
        gameContainer.appendChild(resultDisplay);
        gameContainer.appendChild(highScoreDisplay);
        gameContainer.appendChild(statsDisplay);
        gameContainer.appendChild(rollHistory);
        
       
        document.body.style.cssText = `
            margin: 0;
            padding: 0;
            min-height: 100vh;
        `;
        document.body.appendChild(gameContainer);
        
        
        updateDisplays();
        
        // Add click handler - allows unlimited clicks
        rollButton.addEventListener('click', rollNumber);
    }
    

    function rollNumber() {
        
        currentRoll = Math.floor(Math.random() * 100) + 1;
        rollCount++;
        totalSum += currentRoll;
        rollHistoryArray.unshift(currentRoll); // Add to beginning of array
        
        // Update records
        if (currentRoll > highestNumber) {
            highestNumber = currentRoll;
            triggerCelebration('high');
        }
        
        if (currentRoll < lowestNumber) {
            lowestNumber = currentRoll;
        }
        
      
        if (rollHistoryArray.length > 10) {
            rollHistoryArray.pop();
        }
        
        updateDisplays();
        
        
        if (currentRoll === 100) {
            triggerCelebration('jackpot');
            setTimeout(() => {
                showModal('🎉 JACKPOT! You rolled 100! 🎉');
            }, 500);
        } else if (currentRoll === 1) {
            triggerCelebration('low');
            setTimeout(() => {
                showModal('😱 Ouch! You rolled a 1!');
            }, 500);
        } else if (currentRoll > 90) {
            triggerCelebration('good');
        }
    }
    
 
    function updateDisplays() {
        const average = rollCount > 0 ? (totalSum / rollCount).toFixed(2) : 0;
        
        resultDisplay.innerHTML = `
            <span style="font-size: 1.5em; font-weight: bold; color: ${getRollColor(currentRoll)};">
                ${currentRoll}
            </span>
        `;
        
        highScoreDisplay.innerHTML = `
            <div>Highest: <strong style="color: #e91e63;">${highestNumber}</strong></div>
            <div>Lowest: <strong style="color: #2196F3;">${lowestNumber}</strong></div>
        `;
        
        statsDisplay.innerHTML = `
            Rolls: ${rollCount} | Average: ${average} | Total: ${totalSum}
        `;
        
        rollHistory.innerHTML = `
            <h3>Recent Rolls:</h3>
            ${rollHistoryArray.map((roll, index) => `
                <span style="color: ${getRollColor(roll)}; margin: 0 5px; 
                    ${index === 0 ? 'font-weight: bold; font-size: 1.2em;' : ''}">
                    ${roll}
                </span>
            `).join('')}
        `;
    }
    
    
    function getRollColor(roll) {
        if (roll === 100) return '#ffeb3b';
        if (roll > 90) return '#4CAF50';
        if (roll > 75) return '#8BC34A';
        if (roll > 50) return '#2196F3';
        if (roll > 25) return '#607D8B';
        if (roll === 1) return '#F44336';
        return '#9E9E9E';
    }
    

    function triggerCelebration(type) {
        const colors = {
            jackpot: ['#ffeb3b', '#f44336', '#4CAF50', '#2196F3'],
            high: ['#e91e63', '#9C27B0'],
            good: ['#4CAF50', '#8BC34A'],
            low: ['#F44336', '#FF9800']
        };
        
        const animation = type === 'jackpot' ? 'celebrate 1s' : 'pulse 0.5s';
        const colorSet = colors[type] || ['#4CAF50'];
        
        resultDisplay.style.animation = 'none';
        void resultDisplay.offsetWidth; // Trigger reflow
        resultDisplay.style.animation = animation;
    }
    
   
    function showModal(message) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 10px;
            text-align: center;
            max-width: 80%;
            animation: modalFadeIn 0.3s;
        `;
        modalContent.innerHTML = `
            <h2 style="margin-top: 0;">${message}</h2>
            <button id="closeModal" style="
                padding: 10px 20px;
                background: linear-gradient(to right, #A432A8, #641F66);
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
            ">Continue</button>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        document.getElementById('closeModal').addEventListener('click', function() {
            modal.style.animation = 'modalFadeOut 0.3s';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        });
    }
    
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        @keyframes celebrate {
            0% { transform: scale(1); color: #ffeb3b; background: #f44336; }
            25% { transform: scale(1.2); color: #fff; background: #4CAF50; }
            50% { transform: scale(1); color: #ffeb3b; background: #2196F3; }
            75% { transform: scale(1.2); color: #fff; background: #9C27B0; }
            100% { transform: scale(1); color: #ffeb3b; background: #f44336; }
        }
        @keyframes modalFadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalFadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-20px); }
        }
    `;
    document.head.appendChild(style);
    
    // Start the game
    initGame();
});