let title =document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let count =document.getElementById('count');
let category =document.getElementById('category');
let  submit =document.getElementById('submit');
let total =document.getElementById('total');
// console.log(title,price,taxes,ads,discount,count,category,btncreate,total)

let mood='create';
let tmp;
//get total 
function getTotal(){
    //console.log('done')
    if(price.value !=''){
let result =( +price.value + +taxes.value + +ads.value) - +discount.value;
total.innerHTML=result;
total.style.background='#040';
    }else{
        total.innerHTML='';
        total.style.background='#a00d02'
    }
}


//crate data
let datapro;
if(localStorage.product != null){
    datapro=JSON.parse(localStorage.product)
}else  datapro=[];

//createbuttum
submit.onclick=function(){
    
    let newPro ={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),    
    }
    if(title.value !=''&&price.value !=''&& newPro.count<100){
    if(mood==='create'){
        if(newPro.count>1){
        for(let i=0;i<newPro.count;i++){
            datapro.push(newPro);
        }
        }else{
              datapro.push(newPro);
    
        }
    }else{
        datapro[tmp]=newPro;
        mood='create'
        submit.innerHTML='create';
        count.style.display='block';
    }}


    
  localStorage.setItem('product' , JSON.stringify(datapro));
     //3mlt to make sure
    // console.log(newPro)
clearData();
showData();

}
//clear fun
function clearData(){
    title.value='';
     price.value='';
     taxes.value='';
     ads.value='';
      discount.value='';
       total.innerHTML='';
       count.value='';
     category.value='';
}
//read
function showData(){
    getTotal();
let table = '';
for(let i =0 ; i < datapro.length;i++){
table +=`
             <tr>
                <td>${i+1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button id="updata"  onclick="updateData(${i})">updata</button></td>
                <td><button  onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
`
}
document.getElementById('tbody').innerHTML=table;
let btndeleteAll=document.getElementById('deleteAll');
if(datapro.length > 0 ){
    btndeleteAll.innerHTML=`
    <button onclick='deletAll()'> Delete All(${datapro.length}) </button>
    `
}else{
    btndeleteAll.innerHTML='';
}
}

showData();
// delete
function deleteData(i){
datapro.splice(i,1);
datapro.product= JSON.stringify(datapro);
showData();
}
function deletAll(){
    localStorage.clear();
    datapro.splice(0)
    showData();
}
function updateData(i){
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    discount.value=datapro[i].discount;
    ads.value=datapro[i].ads;
    getTotal();
    count.style.display='none'
    category.value=datapro[i].category;
    submit.innerHTML='update';
    mood='updata'
    scroll({
        top:0,
        behavior:'smooth'
    })
    tmp=i;
}
//serach
let serachmood='title';
function getSerashMood(id){
    let serach=document.getElementById('search') ;
    serach.focus();
    if(id == 'searchTitle')
    {
        serachmood='title';
      
    }else{
        serachmood='catagory';
   
    }
    serach.placeholder= 'search by '+serachmood;
serach.value=''
showData();

}

function serachData(value)
{
    let table='';
    for(let i=0;i<datapro.length;i++){
    if(serachmood =='title'){

        

            if(datapro[i].title.includes(value.toLowerCase())){
                table +=`
             <tr>
                <td>${i+1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button id="updata"  onclick="updateData(${i})">updata</button></td>
                <td><button  onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
`
            
        }
            
    }else{
      
            if(datapro[i].category.includes(value.toLowerCase())){
                table +=`
             <tr>
                <td>${i+1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button id="updata"  onclick="updateData(${i})">updata</button></td>
                <td><button  onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
`
            }
        
            
    }
    }
    document.getElementById('tbody').innerHTML=table;
}