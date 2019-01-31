const tags=['cendol','satay','roti prata','roasted turkey','burger','pizza','steak','french toast','congee','pho','ice cream'];
const list=document.getElementById('list-data');
const answerList=document.getElementById('choices');
let answer="";

function randomColor(){
	const r=Math.floor(Math.random()*255);
	const g=Math.floor(Math.random()*255);
	const b=Math.floor(Math.random()*255);
	return 'rgb('+r+','+g+','+b+')'
}

function reset(){
	answerList.innerHTML="";
	answer=tags[Math.floor(Math.random()*tags.length)];
	getTaggedPhotos(answer);

	const choices=[];
	choices.push(answer);

	while(choices.length<4){
		const rand=tags[Math.floor(Math.random()*tags.length)];
		if(choices.indexOf(rand)==-1){
			choices.push(rand);
		}	
	}

	choices.sort(function(){
		return Math.random()*2-1;
		
	});

	for(let i=0;i<choices.length;i++){
		const li=document.createElement('li');
		const btn=document.createElement('button');
		li.appendChild(btn);		
		answerList.appendChild(li)
		btn.innerHTML=choices[i];
		btn.style.backgroundColor=randomColor();
		btn.onclick=function(){
			if(btn.innerHTML==answer){
				window.alert('You are right!');
			}
			else{
				window.alert('Sorry! The answer is '+answer)
			}
			reset();
		}
	}
	
}


function getTaggedPhotos(tagName){
	fetch('https://api.tumblr.com/v2/tagged?tag='+tagName+'&api_key=TJR2sRu8zNiWJDVmDaaszLwQEm4Vnj08d9QflcngbFwDdNtdhb')
	.then(function(response){
		return response.json(); //convert the raw response into a JSON
	})
	.then(function(result){

		//Clear list
		list.innerHTML='';

		const items=result.response;
		let masonry;

		//for each item, add image to list
		for(let i=0;i<items.length;i++){
			const item=items[i];
			if(item.photos!=undefined){
				//create li and img to append
				const altSizes=item.photos[0].alt_sizes;
				const imgSrc=altSizes[altSizes.length-2].url;
				
				const img=document.createElement('img');
				img.src=imgSrc;
				img.onload=function(){
					masonary.layout();
				}

				const li=document.createElement('li');
				li.appendChild(img);
				//li.innerHTML=imgSrc; //fetches URL
				list.appendChild(li);
			}

		}

		//initialize masonry after list has loaded
		masonry=new Masonry(list,{
			itemSelector: 'li',
		});

		//run layout
		masonry.layout();
	})	
}

reset()