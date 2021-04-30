document.querySelector('#sendNick').addEventListener('click', function () {
    let nick = document.querySelector("#nickname").value;
    if (nick != "") {
        fetch("/register", {
            method: "post",
            body: JSON.stringify({ name: nick }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(
                function (u) { return u.json(); }
            ).then(
                function (json) {
                    if (alert(json.message)) { }
                    else window.location.reload();
                }
            )
    } else {
        alert("podaj nick");
    }
});