var eles = [1, 3, 4, 3, 2, 5, 7, 4, 6, 8, 9, 6, 10],
    len = eles.length;

let quickSort = function(eles) {
    return quickSortHelper(eles, 0, len - 1);
};

let quickSortHelper = function(eles, start, end) {
    if (start < end) {
        let splitPoint = findSplitPoint(eles, start, end);
        quickSortHelper(eles, start, splitPoint - 1);
        quickSortHelper(eles, splitPoint + 1, end);
    }
};

let findSplitPoint = function(eles, start, end) {
    let pivot = eles[start];
    let isDone = false;
    let left = start + 1;
    let right = end;
    while (!isDone) {
        while (left <= right && eles[left] <= pivot) {
            left++;
        }
        while (right >= left && eles[right] >= pivot) {
            right--;
        }
        if (right < left) {
            isDone = true;
        } else {
            [eles[left], eles[right]] = [eles[right], eles[left]];
        }
    }
    [eles[right], eles[start]] = [eles[start], eles[right]];
    return right;
};

quickSort(eles);