function shuffleList(list) {
  var length = listToArr(list).length;
  for (var i = 0; i <= length; i++) {
    var tempIndex = Math.round(Math.random() * length);
    var tempItem = list.item(i);
    var tempItem2 = list.item(tempIndex);
    swap(tempItem, tempItem2);
  }
}
// swap
function swap(element1, element2) {
  if (element1 != null && element2 != null) {
    var id1 = parseInt(element1.textContent);
    var id2 = parseInt(element2.textContent);
    element2.setAttribute("data-block", id1);
    element2.innerHTML = id1;
    element1.setAttribute("data-block", id2);
    element1.innerHTML = id2;
    removeClass(element1, "match");
    removeClass(element2, "match");
  }
}
// convert list to array
function listToArr(elements) {
  let response = [];
  elements.forEach(function(element, key) {
    response.push(parseInt(element.textContent));
  });
  return response;
}
// remove classes
function removeClasses(list, cls) {
  list.forEach(function(element, key) {
    element.classList.remove(cls);
  });
}
// remove class
function removeClass(element, cls) {
  if (element != null) {
    element.classList.remove(cls);
  }
}

/*
 * SelectionSort sorting algorithm
 * #FFFF00 = min
 * #0000FF = current
 * #00FF00 = sorted
 */
function selectionSort(array) {
    var states = [];
    var color = [];
    var data = array.slice();
    var n = data.length;

    states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
    for (var i = 0; i < n - 1; i++) {
        var min = i;
        color[i] = "#FFFF00";
        states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
        for (var j = i + 1; j < n; j++) {
            color[j] = "#0000FF";
            states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
            if (data[j] < data[min]) {
                color[min] = null;
                min = j;
                color[j] = "#FFFF00";
                states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
            } else {
                color[j] = null;
            }
        }
        color[n - 1] = null;
        states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
        if (min != i) {
            var tmp = data[i];
            data[i] = data[min];
            data[min] = tmp;
            color[min] = null;
        }
        color[i] = "#00FF00";
        states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
    }
    color[n - 1] = "#00FF00";
    states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
    return states;
}


function find_csa(arr, subarr) {
    var i = 0,
        sl = subarr.length,
        l = arr.length + 1 - sl;

    loop: for (; i < l; i++) {
        for (var j = 0; j < sl; j++)
            if (arr[i + j] !== subarr[j])
                continue loop;
        return i;
    }
    return -1;
}

function startMergeSort(array) {
    var states = [];
    var color = [];
    var data = array.slice();
    states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
    data = mergeSort(data, states, color, data.slice());
    // Finalized array, fill it in all green.
    for (var i = 0; i < data.length; i++) {
        color[i] = "#00FF00";
    }
    states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
    return states;
}
/*
 * MergeSort sorting algorithm
 */
function mergeSort(data, states, color, originalData) {
    if (data.length < 2) {
        return data;
    }
    var mid = parseInt(data.length / 2);
    var left = data.slice(0, mid);
    var right = data.slice(mid, data.length);

    var leftIndex = find_csa(originalData, left);
    var rightIndex = find_csa(originalData, right);

    var sortedLeft = mergeSort(left, states, color, originalData);
    var sortedRight = mergeSort(right, states, color, originalData);

    if (sortedLeft.length > 1) {
        //Array.prototype.splice.apply(originalData, [leftIndex, sortedLeft.length].concat(sortedLeft));
        var len = sortedLeft.length,
            i = leftIndex;
        for (var j = 0; j < sortedLeft.length; j++) {
            originalData[i] = sortedLeft[j];
            color[i] = "#FF0000";
            states.push(new State(originalData.slice(), JSON.parse(JSON.stringify(color))));
            color[i] = null;
            states.push(new State(originalData.slice(), JSON.parse(JSON.stringify(color))));
            i++;
        }
    }
    if (sortedRight.length > 1) {
        // Array.prototype.splice.apply(originalData, [rightIndex, sortedRight.length].concat(sortedRight));
        var len = sortedRight.length,
            i = rightIndex;
        for (var j = 0; j < sortedRight.length; j++) {
            originalData[i] = sortedRight[j];
            color[i] = "#FF0000";
            states.push(new State(originalData.slice(), JSON.parse(JSON.stringify(color))));
            color[i] = null;
            states.push(new State(originalData.slice(), JSON.parse(JSON.stringify(color))));
            i++;
        }
    }

    var totalSorted = merge(sortedLeft, sortedRight);
    // Array.prototype.splice.apply(originalData, [leftIndex, totalSorted.length].concat(totalSorted));
    var len = totalSorted.length,
        i = leftIndex;
    for (var j = 0; j < totalSorted.length; j++) {
        originalData[i] = totalSorted[j];
        color[i] = "#FF0000";
        states.push(new State(originalData.slice(), JSON.parse(JSON.stringify(color))));
        color[i] = null;
        states.push(new State(originalData.slice(), JSON.parse(JSON.stringify(color))));
        i++;
    }
    return totalSorted;
}

/*
 * Helper function for MergeSort
 */
function merge(left, right) {
    var result = [];

    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length) {
        result.push(left.shift());
    }

    while (right.length) {
        result.push(right.shift());
    }

    return result;
}

/*
 * InsertionSort sorting Algorithm
 */
function insertionSort(array) {
    var states = [];
    var color = [];
    var data = array.slice();
    var n = data.length;

    states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));

    for (var i = 1; i < data.length; i++) {
        var x = data[i];
        var j = i - 1;
        var swapPerformed = false;
        color[j] = "#0000FF"; // Cursor 1
        color[i] = "#FFFF00"; // Cursor 2


        states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));

        if (data[j] > x) {
            swapPerformed = true;
            // If our cursor 2 aka x is greater than cursor 1 aka j.
            while (j >= 0 && data[j] > x) { // x is cursor 2.
                // While we are reversing traversing array.
                data[j + 1] = data[j]; // Perform swap
                data[j] = x;
                // Assign the value that was originally proceeding data[j] aka x
                color[j] = "#E3463E";
                color[j - 1] = "#0000FF";
                if (color[j + 1] != "#C3EA40") {
                    color[j + 1] = "#C3EA40";
                }

                states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
                color[j] = "#C3EA40";
                color[j - 1] = "#C3EA40";

                j = j - 1;
            }
        } else {
            data[j + 1] = x; // Complete swap, or remain same.
        }
        states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
        if (!swapPerformed) {
            color[j] = "#C3EA40";
        }
    }
    // Finalized array, fill it in all green.
    for (var i = 0; i < data.length; i++) {
        color[i] = "#00FF00";
    }
    states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));

    return states;
}

function startQuickSort(array, left, right) {
    var states = [];
    var color = [];
    var data = array.slice();
    states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
    quickSort(data, left, right, states, color);
    states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
    return states;
}
/*
 * QuickSort sorting algorithm
 */
function quickSort(data, left, right, states, color) {
    var len = data.length,
        pivot, partitionIndex;

    if (left < right) {
        pivot = right;
        partitionIndex = partition(data, pivot, left, right, states, color);
        quickSort(data, left, partitionIndex - 1, states, color);
        quickSort(data, partitionIndex + 1, right, states, color);
    }
    color[left] = "#00FF00";
    color[partitionIndex] = "#00FF00";
    states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
}

/*
 * Helper function for quicksort
 */
function partition(data, pivot, left, right, states, color) {
    color[pivot] = "#FF0000";
    states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
    var pivotValue = data[pivot],
        partitionIndex = left;
    for (var i = left; i < right; i++) {
        color[partitionIndex] = "#FFFF00";
        color[i] = "#0000FF";
        states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
        if (data[i] < pivotValue) {
            var tmp = data[i];
            data[i] = data[partitionIndex];
            data[partitionIndex] = tmp;
            partitionIndex++;
            states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
        }
        color[partitionIndex - 1] = null;
        color[i] = null;
    }
    color[partitionIndex] = "#0000FF";
    var tmp = data[right];
    data[right] = data[partitionIndex];
    data[partitionIndex] = tmp;
    states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
    color[right] = null;
    color[partitionIndex] = null;
    return partitionIndex;
}

/*
 * Cocktail Shaker sorting algorithm
 * Finds the max moving forward, then the minimum moving backwards.
 * #0000FF = index 1
 * #FFFF00 = index 2
 * #00FF00 = sorted
 */
function cocktailShakerSort(array, delay) {
    var states = [];
    var color = [];
    var data = array.slice();
    //Main loop

    states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));

    for (var i = 0; i < data.length / 2; i++) {
        var swapped = false;

        //Sorts next, unsorted largest-value
        for (var j = i; j < data.length - i - 1; j++) {
            if (color[j - 1] != "#00FF00") { // If we haven't set sorted
                color[j - 1] = null;
            }
            color[j] = "#0000FF" // Instantiate cursor color.
            color[j + 1] = "#FFFF00";
            states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
            if (data[j] > data[j + 1]) {
                var tmp = data[j];
                data[j] = data[j + 1];
                data[j + 1] = tmp;
                color[j] = "#FFFF00";
                color[j + 1] = "#0000FF";
                swapped = true;

                states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
            }
        }
        // Set new max value as colored.
        color[data.length - (i + 1)] = "#00FF00";
        states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));

        //Sorts next, unsorted smallest-value
        for (var j = data.length - 2 - i; j > i; j--) {
            if (color[j + 1] != "#00FF00") { // If we haven't set to sorted.
                color[j + 1] = null;
            }
            color[j] = "#0000FF";
            color[j - 1] = "#FFFF00";

            states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
            if (data[j] < data[j - 1]) {
                var tmp = data[j];
                data[j] = data[j - 1];
                data[j - 1] = tmp;
                color[j] = "#FFFF00";
                color[j - 1] = "#0000FF";
                swapped = true;


                states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
            }
        }
        // Set new minimum value as colored.
        color[i] = "#00FF00";
        states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));

        if (!swapped) break; //If finished sorting
    }

    // The middle of the algorithm will be sorted by this point, so
    // we want to set it to sorted coloring.
    for (var i = 0; i < data.length - 1; i++) {
        color[i] = "#00FF00";
    }
    states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));

    return states;
}

/*
 * CombSort sorting algorithm
 * #0000FF = index 1
 * #FFFF00 = index 2
 * #00FF00 = sorted
 */
function combSort(array) {
    var states = [];
    var color = [];
    var data = array.slice();
    //Main loop

    states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));

    var gap = data.length;
    var shrink = 1.3; // Recommended scale factor.
    var sorted = false;
    while (!sorted) {
        gap = Math.floor(gap / shrink);
        if (gap > 1) {
            sorted = false;
        } else {
            gap = 1;
            sorted = true;
        }

        var i = 0;
        while (i + gap < data.length) {
            // The conditional only executes if we are to swap, which
            // means the algorithm isn't fully sorted yet.
            color[i] = "#0000FF"
            color[i + gap] = "#FFFF00";
            states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
            // Pushed current cursor and coloring states.

            if (data[i] > data[i + gap]) {
                var tmp = data[i];
                data[i] = data[i + gap];
                data[i + gap] = tmp;
                sorted = false;

                // Set colors and push swapped state.
                color[i] = "#FFFF00";
                color[i + gap] = "#0000FF";
                states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
            }
            // Reset coloring.
            color[i] = null;
            color[i + gap] = null;
            states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
            i++;
        }
    }
    // Algorithm is sorted and we can now color in green.
    for (var i = 0; i < data.length; i++) {
        color[i] = "#00FF00";
    }
    states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));

    return states;
}

//http://taoalpha.github.io/blog/2016/01/19/tech-javascript-sorting-algorithm-radix-sort/
// helper function to get the last nth digit of a number
var getDigit = function(num, nth) {
    // get last nth digit of a number
    var ret = 0;
    while (nth--) {
        ret = num % 10
        num = Math.floor((num - ret) / 10)
    }
    return ret
}

function radixSortLSD(array) {
    var states = [];
    var color = [];
    var data = array.slice();

    states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
    var max = Math.floor(Math.log10(Math.max.apply(Math, data))),
        // get the length of digits of the max value in this array
        digitBuckets = [],
        idx = 0;

    for (var i = 0; i < max + 1; i++) {

        // rebuild the digit buckets according to this digit
        digitBuckets = []
        for (var j = 0; j < data.length; j++) {
            var digit = getDigit(data[j], i + 1);

            digitBuckets[digit] = digitBuckets[digit] || [];
            digitBuckets[digit].push(data[j]);
        }

        // rebuild the list according to this digit
        idx = 0
        for (var t = 0; t < digitBuckets.length; t++) {
            if (digitBuckets[t] && digitBuckets[t].length > 0) {
                for (j = 0; j < digitBuckets[t].length; j++) {
                    data[idx++] = digitBuckets[t][j];
                    color[idx - 1] = "#FFFF00";
                    states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
                    color[idx - 1] = null;
                    states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
                }
            }
        }
    }
    // Finalized array, fill it in all green.
    for (var i = 0; i < data.length; i++) {
        color[i] = "#00FF00";
    }
    states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
    return states;
}

function startRadixSortMSD(array) {
    var states = [];
    var color = [];
    var data = array.slice();
    states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
    radixSortMSD(data, states, color);
    // Finalized array, fill it in all green.
    for (var i = 0; i < data.length; i++) {
        color[i] = "#00FF00";
    }
    states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
    return states;
}

//http://jsperf.com/radix-sort
function radixSortMSD(data, states, color, idx_begin, idx_end, bit) {
    if (!Array.isArray(data)) return;
    idx_begin = (typeof idx_begin === 'undefined') ? 0 : idx_begin;
    idx_end = (typeof idx_end === 'undefined') ? data.length : idx_end;
    bit = (typeof bit === 'undefined') ? 31 : bit;
    if (idx_begin >= (idx_end - 1) || bit < 0) {
        return;
    }
    var idx = idx_begin;
    var idx_ones = idx_end;
    mask = 0x1 << bit;
    while (idx < idx_ones) {
        if (data[idx] & mask) {
            --idx_ones;
            color[idx] = "#FFFF00";
            color[idx_ones] = "#0000FF";
            states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
            var tmp = data[idx];
            data[idx] = data[idx_ones];
            data[idx_ones] = tmp;
            color[idx] = null;
            color[idx_ones] = null;
            states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
        } else {
            ++idx;
        }
    }
  }, 700);
}
/** ************************* **
 **   Roll, Cemara, Action!   **
 ** ************************* **/
document.querySelector(".sSort").addEventListener("click", function() {
  inner = 1;
  index = 0;
  dynamicIndex = 0;
  shuffleList(list);
  UpperProcess(list);
  this.setAttribute("disabled", "disabled");
  this.innerHTML = "Sorting...";
});

/** ************************* **
 **   Let me help you play!   **
 ** ************************* **/
setTimeout(function() {
  document.querySelector(".sSort").click();
}, 3000);