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

function loadNavigationPanel(){
	
	var xhr= new XMLHttpRequest();
	xhr.open('GET', '/resources/navigation.xml');
	xhr.onreadystatechange= function() {
		if (this.readyState!==4) return;
		if (this.status!==200) return; // or whatever error handling you want
		var nav = JSON.parse(this.responseText);
		var navhtml = '';
		for (var i in nav.pages){
			navhtml = navhtml + "<a href="+nav.pages[i].url+"><span class='button'>"+nav.pages[i].caption+"</span></a>";
		}
		document.getElementById('nav').innerHTML= navhtml;
	};
	xhr.send();
	
}