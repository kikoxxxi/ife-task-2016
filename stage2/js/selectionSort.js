var eles = [1, 3, 4, 3, 2, 5, 7, 4, 6, 8, 9, 6, 10],
     len = eles.length,
     i = 0,
     j;


 for(i;i<len-1;i++){
    let min=i;
    for(j=i;j<len;j++){
        if(eles[j]<eles[min]){
            min=j;
        }
    }
    [eles[i],eles[min]]=[eles[min],eles[i]];
 }