window.onload = function(){
    
    let participants = document.getElementById('participants')
    let genListBtn = document.getElementById('participButn')
    let contDiv = document.getElementById('choices');
    

    genListBtn.onclick= function(){
      //  console.log(participants.value);
        let n= participants.value/2;
        for(let m=0;m<n;m++){
            let currMale= document.createElement('div');
            let maleChoice= document.createElement('div');
            let currFemale= document.createElement('div');
            let femaleChoice = document.createElement('div');
            
            currMale.id="flex-items";
            currFemale.id="flex-items";
             maleChoice.id="flex-items";
            femaleChoice.id="flex-items";

            let w = document.createElement("INPUT");
            w.setAttribute("type", "text");
            w.setAttribute("placeholder", "GROUP ONE MEMBER");
            w.className="m";
           let curr="a"+m;
            w.id=curr;

            let x = document.createElement("INPUT");
            x.setAttribute("type", "text");
            x.setAttribute("placeholder", "ENTER THE CHOICES");
            x.className="m";
            curr="b"+m;
            x.id=curr;

            let y = document.createElement("INPUT");
            y.setAttribute("type", "text");
            y.setAttribute("placeholder", "GROUP TWO MEMBER");
            y.className="m";
            curr="c"+m;
            y.id=curr;

            let z = document.createElement("INPUT");
            z.setAttribute("type", "text");
            z.setAttribute("placeholder", "ENTER THE CHOICES");
            z.className="m";
            curr="d"+m;
            z.id=curr;
            
            
            currMale.appendChild(w);
            currFemale.appendChild(x);
            maleChoice.appendChild(y);
            femaleChoice.appendChild(z);
           
      contDiv.appendChild(currMale);
      contDiv.appendChild(currFemale);
      contDiv.appendChild(maleChoice);
      contDiv.appendChild(femaleChoice);
     
        }
        genListBtn.id="disappear";
        let submitBtn= document.createElement("button");
        submitBtn.className="btn btn-primary";
        submitBtn.innerText="SUBMIT THE CHOICES";
        submitBtn.id="subBtn";
        contDiv.appendChild(submitBtn);
        

      submitBtn.onclick=function(){
        let men=[];
        for(let k=0;k<n;k++){
            let string= "a"+k;
            let item = document.getElementById(string);
            str=item.value;
            men.push(str);
        }
      //  console.log(men)
          let women=[];
          for(let k=0;k<n;k++){
            let string= "c"+k;
            let item = document.getElementById(string);
            str=item.value;
            women.push(str);
        }
        //console.log(women)

     let mChoice=[];
     for(let k=0;k<n;k++){
        let string= "b"+k;
        let item = document.getElementById(string);
        str=item.value;
        let marr=str.split(',');
        mChoice.push(marr);
        }
       // console.log(mChoice);

        let FChoice=[];
     for(let k=0;k<n;k++){
        let string= "d"+k;
        let item = document.getElementById(string);
        str=item.value;
        let marr=str.split(',');
        FChoice.push(marr);
        }
        //console.log(FChoice);
       //this is the code for stable matching 
       //algorithm starts here
       
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
          let matched= document.createElement('div');
          matched.className="list-group-item list-group-item-primary";
          matched.id="dilMile";
          matched.innerText="👨‍💼👩‍💼👨‍💼👩‍💼👨‍💼"+men[mapping[i][j]]+"🤝"+women[i]+"👨‍💼👩‍💼👨‍💼👩‍💼👨‍💼";
          contDiv.appendChild(matched);

                console.log(men[mapping[i][j]]+" "+women[i]+" ");
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
         function checkFlag(isPaired) {
            for(let i=0;i<isPaired.length;i++) {
                if(isPaired[i]==false)
                    return -1;
            }
            return 0;
        }
        
         pairMaker(mChoice,FChoice);

      }
        
    }
    





}