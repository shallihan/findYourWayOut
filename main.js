const prompt = require('prompt-sync')({sigint: true});
const wayOut = '𓊓';
const crevice = '𓈞';
const caveFloor = '░';
const pathCharacter = '𓀟';

class Cave {
    constructor (cave) {
        this.cave = cave;
        this.rows = cave.length;
        this.columns = cave[0].length;
        this.currentPosition = [0, 0];
        this.move = '';
        this.victoryMessage = "\n𓊈 YOU'VE MADE YOUR WAY OUT OF THE CAVE 𓊉\n";
        this.inGame = true
    }

    promptUser () {
        const options = ['U', 'D', 'R', 'L'];
        if (!options.some((options) => options === this.move)) {
            console.log("\nYou can either move up or down or left to right. Press the respective keys for each. (for example: Press D to move down)");
            this.move = prompt("\nWhich direction are you heading in? ");
        }
    }

    validMove () {
        if (this.move === 'U' && this.currentPosition[0] === 0) {
            return false;
        } else if (this.move === 'L' && this.currentPosition[1] === 0) {
            return false;
        } else if (this.move === 'R' && this.currentPosition[1] === (this.columns-1)) {
            return false;
        } else if (this.move === 'D' && this.currentPosition[0] ===(this.rows-1)) {
            return false;
        } else {
            return true;
        }
    }

    movePosition () {
        this.promptUser();
        if (this.move === 'D' && this.validMove()) {
            this.currentPosition[0]++;
            return true;
        } else if (this.move === 'U' && this.validMove()) {
            this.currentPosition[0]--;
            return true;
        } else if (this.move === 'L' && this.validMove()) {
            this.currentPosition[1]--;
            return true;
        } else if (this.move === 'R' && this.validMove()) {
            this.currentPosition[1]++;
            return true;
        } else {
            return false;
        }
    }

    print () {
        for (let row of this.cave) {
          console.log(row.join(" "))
        }
      }

      startInstructions () {
          const instructions =  "\n*** INSTRUCTIONS ***\n\nFind your way out of the cave (𓊓), but be careful you don't want to fall into any crevices (𓈞) or you'll never be seen again.\n\nTo navigate: Use the respective keys to move up or down, left to right.\n\nPress 'U' to move upwards\nPress 'D' to move downwards\nPress 'L' to move to the left\nPress 'R' to move to the right\n\nTo continue make sure to have CAPS LOCK ON\n\n*******************************";
          console.log(instructions);
          let answer = prompt("\n\nAre you ready to make your way out of the cave? Press 'Y' to BEGIN or 'N' to STAY IN THE CAVE? ");
          if (answer === 'Y') {
            return true
        } else if (answer === 'N') {
            console.log('\nSuit yourself\n')
            return false;
        } else { console.log('\nPress "Y" or "N" ')}
      }

      static generateCave(height, width, percent) {
        const cave = new Array(height).fill(0).map(element => new Array(width))
        for (let i=0; i < cave.length; i++) {
            for (let j=0; j < cave[i].length; j++) {
            cave[i][j] = caveFloor
            }
        }
        const caveSize = height*width;
        const numOfHoles = Math.floor(caveSize*(percent/100));
        let countHoles = 0;
        while (countHoles <= numOfHoles) {
          const randomRow = Math.floor(Math.random()*height);
          const randomColumn = Math.floor(Math.random()*width);
          if (cave[randomRow][randomColumn] === caveFloor) {
            cave[randomRow][randomColumn] = crevice;
            countHoles++;
          }
        }
        cave[Math.floor(Math.random()*height)][Math.floor(Math.random()*width)] = wayOut;
        cave[0][0] = pathCharacter;
        return cave;
    }

    playGame() {
        console.log("\n");
        this.print();
        if (this.startInstructions() === false) {
            this.inGame = false;
        }
        while (this.inGame === true) {
            console.log('\n\n');
            this.print();
            this.move = prompt('\nWhich direction? ');
            if (this.movePosition()) {
                const cavePosition = this.cave[this.currentPosition[0]][this.currentPosition[1]];
                if (cavePosition === crevice) {
                    console.log("\nOops, there's that crevice. You've fallen to you death.\n");
                    break;
                } else if (cavePosition === wayOut) {
                    console.log(this.victoryMessage);
                    break;
                } else {
                    this.cave[this.currentPosition[0]][this.currentPosition[1]] = pathCharacter;
                    this.inGame = true;
                }
            } else {
                console.log("\nYou've moved too deep into the cave, and can no longer see. You'll never find your way out. Death is inevitable\n");
                break
            }
        }
    }
};

const darkCave = Cave.generateCave(10,10,30);
const newGame = new Cave(darkCave);
newGame.playGame();