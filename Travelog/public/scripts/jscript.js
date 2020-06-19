function traveldisp(){
    var checkBox = document.querySelector(".checkadd");
    var text = document.querySelector(".traveldate");
    var textbox=document.querySelector("#Travelbox");
    if (checkBox.checked == true){
    text.style.display = "block";
    textbox.required=true;
    } else {
    textbox.required=false;
    text.style.display="none";
    }
}

function regValidate(){
    var un=document.regform.username.value;
    var pw=document.regform.password.value;
    var yn=document.regform.yname.value;
    var ph=document.regform.phone.value;
    var em=document.regform.email.value;
    var er=document.querySelector(".error")
    // alert((un==""||un==null)||(pw==""||pw==null)||(yn==""||yn==null)||(ph==""||ph==null)||(em==""||em==null))
    if((un==""||un==null)||(pw==""||pw==null)||(yn==""||yn==null)||(ph==""||ph==null)||(em==""||em==null))
    {
        er.classList.remove("error")
        er.classList.add("errorshow")
        // alert("in if")
        return false;
    }
    else{
        // alert("in else")
        er.classList.remove("errorshow");
        er.classList.add("error");
        return true;
    }
}

function addValidate(){
    var city=document.forms["addform"]["city"].value;
    var img=document.forms["addform"]["imgurl"].value;
    var desc=forms["addform"]["description"].value;
    var visit=document.addform.visited.checked;
    var bucket=document.addform.bucketList.checked;
    var tDate=document.addform.travelDate.value;
    var er=document.querySelector(".error");
    // alert((img==""||img==null||img.length==0))
    if((city==""||city==null||city.length==0)||(img==""||img==null||img.length==0)||(desc==""||desc==null||desc.length==0)){//||((!visit)&&(!bucket))||((visit)&&(tDate==""||tDate==null))){
        er.classList.remove("error");
        er.classList.add("errorshow");
        return false;
    }
    else{
        er.classList.remove("errorshow");
        er.classList.add("error");
        return true;
    }
}
var mode=document.querySelectorAll(".mode");
console.log(mode.length);
for(var i=0;i<mode.length;i++)
{
    mode[i].addEventListener("click",function(){
        mode[0].classList.remove("selected");
        mode[1].classList.remove("selected");
        this.style.color="white";
    });
}

