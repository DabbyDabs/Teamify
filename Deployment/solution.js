	  
	   let boys = [ [ 3, 1, 2, 0, 4 ],
				[4, 2, 1, 0, 3], 
				[ 1, 4, 0, 3, 2 ], 
				[ 4, 1, 3, 2, 0 ],
				[ 3, 0, 1, 2, 4 ] ];
	   let girls = [ [ 3, 1, 4, 2, 0 ], 
				[ 1, 0, 3, 2, 4 ], 
				[ 0, 2, 4, 3, 1 ], 
				[ 3, 0, 2, 1, 4 ],
				[ 1, 4, 0, 2, 3 ]];
       
       let  boys2= [['4','1','2','3','0'],['1','4','0','2','3'],
       ['3','2','1','0','4'],['0','1','2','3','4'],['4','1','2','3','0']];

      let   girls2= [['4','2','3','0','1'],['0','1','2','4','3'],
       ['3','4','2','1','0'],['4','1','0','3','2'],['1','0','3','2','4']];
        
       
     pairMaker(boys2,girls2);
		
 function pairMaker(boys,girls) {
    let n=boys.length;
    let isPaired=[false];
    for(let x=0;x<n;x++){
        isPaired[x]=false;
    }
	let mapping = [];
   for (var i = 0; i < n; ++i){
      var columns = [];
      for (var j = 0; j <2; ++j){
         columns[j] = -1;
      }
      mapping[i] = columns;
    }
	let flag=-1;
	while(flag==-1) {
		let k=0;
		while(isPaired[k]== true) {
			k++;
		}    //k indicates to the unpaired boy with least index
		for(let l=0;l<n;l++) {
			if(boys[k][l]==-1) {
				continue;
			}
			if(mapping[boys[k][l]][0]== -1) {
				mapping[boys[k][l]][0]=k;
			 let pref=  returnPreference(girls,boys[k][l],k);
			 mapping[boys[k][l]][1]=pref;
			 isPaired[k]=true;
			 break;
			}
			
			let pref= returnPreference(girls,boys[k][l],k);
			if(mapping[boys[k][l]][1]>pref) {
				let replacedBoy= mapping[boys[k][l]][0];
				let currGirl=boys[k][l];
				for(let t=0;t<n;t++) {
					if(boys[replacedBoy][t]==currGirl) {
						boys[replacedBoy][t]=-1;
					}
				}
				mapping[currGirl][0]=k;
				mapping[currGirl][1]=pref;
				isPaired[replacedBoy]=false;
				isPaired[k]=true;
				break;
			}
			boys[k][l]=-1;
			
	}
		flag=checkFlag(isPaired);
	}
	for(let i=0;i<mapping.length;i++) {
	for(let j=0;j<mapping[0].length-1;j++) {
		console.log(i+" "+mapping[i][j]+" ");
	}

}
	
	
}
function returnPreference(girls ,girlNum,boyNum) {
	for(let i=0;i<girls[0].length;i++) {
		if(girls[girlNum][i]==boyNum) {
			return i;
		}
	}
	return -1;
}
 function print2DArray(arr) {
	for(let i=0;i<arr.length;i++) {
		for(let j=0;j<arr[0].length;j++) {
		console.log(	arr[i][j]+" ");
		}
		console.log();
	}
}
 function checkFlag(isPaired) {
	for(let i=0;i<isPaired.length;i++) {
		if(isPaired[i]==false)
			return -1;
	}
	return 0;
}

