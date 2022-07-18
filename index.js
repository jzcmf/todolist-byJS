var ul=document.querySelector("ul")
var ol=document.querySelector("ol")
var btn=document.querySelectorAll('button')
load()


function isEnter(event){
    event = event || window.event;
	if (event.keyCode == 13){
        var local=getData()
        var ipt=document.querySelector('.ipt')
        local.push({done:false,title:ipt.value})
        saveData(local)
        ipt.value=''
        load()
    }
}

ul.onclick=function(){
    var data=getData()
    Object.values(ul.children).forEach((e,i)=>{
        if(e.children[0].checked){
            index=e.children[2].id
            data[index].done=true
        }
    })
    saveData(data)
    load()
}

ol.onclick=function(){
    var data=getData()
    Object.values(ol.children).forEach((e,i)=>{
        if(e.children[0].checked==''){
            index=e.children[2].id
            data[index].done=false
        }
    })
    saveData(data)
    load()
}

ol.addEventListener('click',function(e){
    var data=getData()
    if(e.target.id){
        data.splice(e.target.id,1)
    }
    saveData(data)
    load()
})

ul.addEventListener('click',function(e){
    var data=getData()
    if(e.target.id){
        data.splice(e.target.id,1)
    }
    saveData(data)
    load()
})


//读取本地TODOlist
function getData() {
    var data = localStorage.getItem("todolist");
    if (data != null) {
        return JSON.parse(data); 
    } else {
        return [];
    }
}
//本地更新TODOlist
function saveData(data){
    var data = JSON.stringify(data)
    localStorage.setItem("todolist",data)
}
//页面加载数据更新
function load(){
    var list=getData()
    var doneCount=0
    var readyCount=0
    ul.innerHTML=''
    ol.innerHTML=''
    list.forEach((e,i) => {
        if(!e.done){
            ul.innerHTML+='<li><input type="checkbox"><p>'+e.title+'</p><a href="javascript:;" id=' + i + '>delete</a></li>'
            readyCount++
        }
        else{
            ol.innerHTML+='<li><input type="checkbox" checked="checked"><p class="done-line">'+e.title+'</p><a href="javascript:;" id=' + i + '>delete</a></li>'
            doneCount++
        }
    });
    btn[0].innerHTML='已完成'+doneCount
    btn[1].innerHTML='未完成'+readyCount
    btn[2].innerHTML='全部'+list.length
}


