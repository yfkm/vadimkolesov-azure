function hide(e){
	var content = e.parentElement.getElementsByClassName("hideable")[0];
	if (content){
		if (content.style.display == "none"){
			content.style.display = "block";
			e.innerHTML = "X";
		}
		else{
			content.style.display = "none";
			e.innerHTML = "O";
		}
	}
};

function getPage(url){
	var xhr= new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.onreadystatechange= function() {
		if (this.readyState!==4) return;
		if (this.status!==200) return; // or whatever error handling you want
		document.getElementById('y').innerHTML= this.responseText;
	};
	xhr.send();
	
}