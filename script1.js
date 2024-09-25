const symbols = ['https://www.dropbox.com/scl/fi/jbbjw5lhh5s7tuvfmpjff/orang.png?rlkey=j92vtmzyxya27nahmc4czvei2&dl=1', 'https://www.dropbox.com/scl/fi/iifjun55olw8il5lxn5l2/axladi.png?rlkey=hyoznfqa107nvb22z02holzwn&dl=1', 'https://www.dropbox.com/scl/fi/szudw7tm93v7g9e0snvcx/fraoula.png?rlkey=nvqjt9le1cp1e4nnufchm50oq&dl=1', 'https://www.dropbox.com/scl/fi/2jxb5etejbbsuzjsuq2g3/banana.png?rlkey=2eg6ywyr6tjsxcpxo1juelj42&dl=1', 'https://www.dropbox.com/scl/fi/bmery0tmeua62v6ixxznp/lemon.png?rlkey=9l9xdo12elvkzfv1za8yeblx5&dl=1', 'https://www.dropbox.com/scl/fi/654ehmzd48nw387uug4mc/mouro.png?rlkey=pwriez7d3oh3f6y9rf3s52c5b&dl=1'];

const spinButton = document.getElementById('spin-btn');
const slots = document.querySelectorAll('.slot');
const slotContainer = document.querySelector('.slot-container');
let isFirstSpin = true;


slotContainer.style.backgroundImage = `url('https://www.dropbox.com/scl/fi/9or7dn3a289bsd9hr7dw4/bgimage.png?rlkey=lfzagp9e5w5p04ev2uihgk7fl&dl=1')`;

spinButton.addEventListener('click', () => {

  spinButton.disabled = true;
  
  if (isFirstSpin) {
    slotContainer.style.backgroundImage = 'none';
    slotContainer.style.border = 'none';

    isFirstSpin = false;
}

removeWinningSquares();


slots.forEach(slot => {
    slot.style.backgroundImage = 'none';
  });

slots.forEach((slot, index) => {
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * symbols.length);
      const randomSymbol = symbols[randomIndex];
      slot.style.backgroundImage = `url(${randomSymbol})`;
    }, index * 100);
  });
  setTimeout(() => {
    spinButton.disabled = false;
  }, 900);
  setTimeout(checkWinning, 900); 
});


function checkWinning() {
  for (let i = 0; i < 3; i++) {
    if (checkRow(i)) {
        highlightRow(i);
        return;
    }
  }

  for (let i = 0; i < 3; i++) {
    if (checkColumn(i)) {
        highlightColumn(i);
        return;
    }
  }

  if (checkDiagonal()) {
    highlightDiagonal();
    return;
  }

  
}

function checkRow(row) {
  const startIndex = row * 3;
  const symbolsInRow = [slots[startIndex], slots[startIndex + 1], slots[startIndex + 2]].map(slot => slot.style.backgroundImage);
  return symbolsInRow.every(symbol => symbol === symbolsInRow[0]);
}

function checkColumn(column) {
  const symbolsInColumn = [slots[column], slots[column + 3], slots[column + 6]].map(slot => slot.style.backgroundImage);
  return symbolsInColumn.every(symbol => symbol === symbolsInColumn[0]);
}

function checkDiagonal() {
  const symbolsInDiagonal1 = [slots[0], slots[4], slots[8]].map(slot => slot.style.backgroundImage);
  const symbolsInDiagonal2 = [slots[2], slots[4], slots[6]].map(slot => slot.style.backgroundImage);
  return symbolsInDiagonal1.every(symbol => symbol === symbolsInDiagonal1[0]) || symbolsInDiagonal2.every(symbol => symbol === symbolsInDiagonal2[0]);
}

function highlightRow(row) {
    const startIndex = row * 3;
    for (let i = startIndex; i < startIndex + 3; i++) {
      slots[i].classList.add('winning-square');
    }
  }
  
  function highlightColumn(column) {
    for (let i = column; i <= column + 6; i += 3) {
      slots[i].classList.add('winning-square');
    }
  }
  

function highlightDiagonal() {
    const symbolsInDiagonal1 = [slots[0], slots[4], slots[8]].map(slot => slot.style.backgroundImage);
    if (symbolsInDiagonal1.every(symbol => symbol === symbolsInDiagonal1[0])) {
      for (let i = 0; i < 3; i++) {
        slots[i * 4].classList.add('winning-square'); 
      }
      return;
    }
  
    const symbolsInDiagonal2 = [slots[2], slots[4], slots[6]].map(slot => slot.style.backgroundImage);
    if (symbolsInDiagonal2.every(symbol => symbol === symbolsInDiagonal2[0])) {
      for (let i = 0; i < 3; i++) {
        slots[i * 2 + 2].classList.add('winning-square');
      }
      return;
    }
  }
  

  function removeWinningSquares() {
    slots.forEach(slot => {
      slot.classList.remove('winning-square');
    });
  }