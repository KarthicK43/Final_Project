function traveldisp(){
    var checkBox = document.querySelector(".checkadd");
    var text = document.querySelector(".traveldate");
    var textbox= document.querySelector("#Travelbox");
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
    var er=document.querySelector("#errormsg")
    if((un==""||un==null)||(pw==""||pw==null)||(yn==""||yn==null)||(ph==""||ph==null)||(em==""||em==null))
    {
        er.classList.remove("error");
        er.classList.add("errorshow");
        return false;
    }
    else{
        er.classList.remove("errorshow");
        er.classList.add("error");
        return true

    }
}

function addValidate(){
    var city=document.addform.city.value;
    var img=document.addform.imgurl.value;
    var desc=document.addform.description.value;
    var visit=document.addform.visited.checked;
    var bucket=document.addform.bucketList.checked;
    var tDate=document.addform.travelDate.value;
    var er=document.querySelector("#errormsg");
    if((city==""||city==null)||(img==""||img==null)||(desc==""||desc==null)||((!visit)&&(!bucket))||((visit)&&(tDate==""||tDate==null))){
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


