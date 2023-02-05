const color = document.getElementsByClassName('color');
const pixel = document.getElementsByClassName('pixel');
const pixelBoard = document.getElementById('pixel-board');
const clearBoard = document.getElementById('clear-board');
const input = document.getElementById('board-size');
const vqv = document.getElementById('generate-board');
const colorPalette = document.getElementById('color-palette');
const colorButton = document.getElementById('button-random-color');
const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

function restoreColorPalette() {
  if (localStorage.colorPalette) {
    const palette = JSON.parse(localStorage.colorPalette);
    for (let i = 1; i < color.length; i += 1) {
      color[i].style.backgroundColor = palette[i - 1];
    }
  }
}

function selector(e) {
  const event = e;
  if (event.target.className === 'color') {
    for (let index = 0; index < color.length; index += 1) {
      color[index].className = 'color';
    }
    event.target.classList = [`${event.target.className} selected`];
  }
}

function saveBoard(event, bool) {
  let colors = [];
  if (localStorage.pixelBoard) {
    colors = JSON.parse(localStorage.pixelBoard);
  }
  if (bool) {
    for (let index = 0; index < pixel.length; index += 1) {
      if (pixel[index] === event.target) {
        colors[index] = event.target.style.backgroundColor;
      }
    }
  } else {
    for (let index = 0; index < pixel.length; index += 1) {
      pixel[index].style.backgroundColor = colors[index];
    }
  }
  localStorage.pixelBoard = JSON.stringify(colors);
}

function removeBoard() {
  const pixelLength = pixel.length;
  for (let index = 0; index < pixelLength; index += 1) {
    pixelBoard.removeChild(pixel[0]);
  }
}

function creatNewBoard() {
  const div = document.createElement('div');
  div.className = 'pixel';
  pixelBoard.appendChild(div);
}

function ajustSizeBoard() {
  const value = Number(input.value) + 8;
  pixelBoard.style.width = `${(value) * 45}px`;
  pixelBoard.style.height = `${(value) * 45}px`;
  const marginLeft = value * 22.5;
  pixelBoard.style.marginLeft = `calc(50% - ${marginLeft}px)`;
}

function newBoard() {
  localStorage.boardSize = JSON.stringify(input.value);
  if (input.value > 4 && input.value < 51) {
    removeBoard();
    const value = input.value * input.value;
    for (let index = 0; index < value; index += 1) {
      ajustSizeBoard();
      creatNewBoard();
    }
    localStorage.removeItem('pixelBoard');
  } else if (input.value > 50) {
    removeBoard();
    for (let index = 0; index < 2500; index += 1) {
      ajustSizeBoard();
      creatNewBoard();
    }
    localStorage.removeItem('pixelBoard');
  } else {
    alert('Board inválido!');
  }
}

function paint(e) {
  const event = e;
  const selected = document.querySelector('.selected');
  if (event.target.className === 'pixel') {
    event.target.style.backgroundColor = selected.style.backgroundColor;
    saveBoard(event, true);
  }
}

function selectColor() {
  let hexKey = '#';
  for (let i = 0; i < 6; i += 1) {
    const index = Math.floor(Math.random() * hex.length);
    hexKey += hex[index];
  }
  return hexKey;
}

function colorGenerator() {
  const setPalette = [];
  for (let index = 1; index < color.length; index += 1) {
    color[index].style.backgroundColor = selectColor();
    setPalette[index - 1] = color[index].style.backgroundColor;
  }
  localStorage.colorPalette = JSON.stringify(setPalette);
}

function erase() {
  for (let index = 0; index < pixel.length; index += 1) {
    pixel[index].style.backgroundColor = 'white';
  }
  localStorage.removeItem('pixelBoard');
}

if (color.length > 3) {
  for (let index = 1; index < color.length; index += 1) {
    color[index].style.backgroundColor = selectColor;
  }
}

if (localStorage.boardSize) {
  input.value = JSON.parse(localStorage.boardSize);
  newBoard();
}

console.log(input.value);

color[0].classList = [`${color[0].className} selected`];
color[0].style.backgroundColor = 'black';
color[1].style.backgroundColor = 'red';
color[2].style.backgroundColor = 'green';
color[3].style.backgroundColor = 'blue';

colorPalette.addEventListener('click', selector);
clearBoard.addEventListener('click', erase);
pixelBoard.addEventListener('click', paint);
colorButton.addEventListener('click', colorGenerator);
vqv.addEventListener('click', newBoard);

saveBoard(false);
restoreColorPalette();