var eles = [1, 3, 4, 3, 2, 5, 7, 4, 6, 8, 9, 6, 10],
    len = eles.length,
    i = 0,
    j;


for (i; i < len - 1; i++) {
    let currentNode = eles[i + 1];
    j = i;
    while (currentNode < eles[j]&&j>=0) {
        eles[j+1]=eles[j];
        j--;
    }
    eles[j+1]=currentNode;
}