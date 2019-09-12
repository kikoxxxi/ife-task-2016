 var eles = [1, 3, 4, 3, 2, 5, 7, 4, 6, 8, 9, 6, 10],
     len = eles.length,
     i = 0,
     j;


 while (i < len - 1) {
     j = len - 1;
     while (j > i) {
         if (eles[j] < eles[j - 1]) {
             [eles[j], eles[j - 1]] = [eles[j - 1], eles[j]];
         }
         j--;
     }
     i++;
 }