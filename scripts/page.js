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
}