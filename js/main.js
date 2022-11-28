function getXhrType() {

    let x;
    
    try {
        x = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            x = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            x = 0;
        }
    }
    
    if(!x && typeof XMLHttpRequest != 'undefined') x = new XMLHttpRequest();
    
    return x;
}

function sanitize(text) {
    return text.replace(/<script>|[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gim, "");
}

function request() {
	let val = sanitize(document.getElementsByClassName("field")[0].value);

	if(val.length > 0) {
		const xhr = getXhrType();
    
        xhr.onload = xhr.onerror = function() {
            if(this.status == 200) {
                document.getElementsByClassName("container")[0].innerHTML = xhr.responseText;
            } else {
                console.log("Запрос прошел неудачно! Пожалуйста, попробуйте еще раз!");
            }
        };
      
        xhr.open('POST', "http://localhost:81/work/php/req.php", true);

        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      
        xhr.send("val="+encodeURIComponent(val));
	} else {
		console.log("Заполните поле!");
	}
}