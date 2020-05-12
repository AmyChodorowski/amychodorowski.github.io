def greet():
    name = document.getElementById("Name").value
    if name == "" or name.length == 0 or name == null:
        document.getElementById("groet").innerHTML = '<p><font color="#ff0000">What is your name?</font></p>'
    else:
        document.getElementById("groet").innerHTML = '<p><font color="#00ff00">Hello, '+name+'!</font></p>'
