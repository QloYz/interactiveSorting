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

