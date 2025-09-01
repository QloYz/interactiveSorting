
const arrayContainer = document.getElementById('arrayContainer');
const arrayInput = document.getElementById('arrayInput');
const submitArrayBtn = document.getElementById('submitArrayBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const startBtn = document.getElementById('startBtn');
const speedSlider = document.getElementById('speedSlider');
const sortBtn = document.getElementById('sortBtn');

let array = [];
const SIZE = 14;

function* bubbleSort(arr) {
    let n = arr.length;
    arr = arr.slice();

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            yield { array: arr.slice(), indices: [j, j + 1], sorted: i };
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                yield { array: arr.slice(), indices: [j, j + 1], sorted: i };
            }
        }
    }
    yield { array: arr.slice(), indices: null, sorted: n };
}


function* selectionSort(arr) {
    let n = arr.length;
    arr = arr.slice();

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            yield { array: arr.slice(), indices: [minIndex, j], sorted: i };
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
                yield { array: arr.slice(), indices: [i, minIndex], sorted: i };
            }
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            yield { array: arr.slice(), indices: [i, minIndex], sorted: i };
        }
    }
    yield { array: arr.slice(), indices: null, sorted: n };
}


function* insertionSort(arr) {
    let n = arr.length;
    arr = arr.slice();

    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            yield { array: arr.slice(), indices: [j, j + 1], sorted: i };
            j--;
        }
        arr[j + 1] = key;
        yield { array: arr.slice(), indices: [j + 1], sorted: i };
    }
    yield { array: arr.slice(), indices: null, sorted: n };
}

function drawArray(highlight = [], sorted = 0) {
    arrayContainer.innerHTML = '';

    for (let i = 0; i < array.length; i++) {
        const node = document.createElement('div');
        node.classList.add('node');
        node.textContent = array[i];
        if (highlight.includes(i)) node.classList.add('comparing');
        if (i >= array.length - sorted) node.classList.add('sorted');
        arrayContainer.appendChild(node);
    }
}


function generateRandomArray() {
    array = [];
    for (let i = 0; i < SIZE; i++) {
        array.push(Math.floor(Math.random() * 200) + 20);
    }
    drawArray();
}

function setUserArray() {
    const input = arrayInput.value;
    const userArray = input.split(',')
                           .map(num => num.trim())
                           .filter(num => num !== '')
                           .map(Number);
    if (userArray.length === 0 || userArray.some(isNaN)) {
        alert("Please enter valid numbers separated by commas!");
        return;
    }
    array = userArray;
    drawArray();
}

function getSelectedAlgorithm() {
    const choice = document.getElementById('algorithmSelect').value;
    switch (choice) {
        case 'bubble': return bubbleSort;
        case 'selection': return selectionSort;
        case 'insertion': return insertionSort;
        default: return bubbleSort;
    }
}

async function animateSorting() {
    const speed = (51 - speedSlider.value) * 5;
    const sorter = getSelectedAlgorithm()(array);
    for (let step of sorter) {
        array = step.array;
        drawArray(step.indices || [], step.sorted);
        await new Promise(resolve => setTimeout(resolve, speed));
    }

}


submitArrayBtn.addEventListener('click', setUserArray);
shuffleBtn.addEventListener('click', generateRandomArray);
startBtn.addEventListener('click', () => {
    animateSorting(); 
});

generateRandomArray();