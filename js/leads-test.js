l = []
for(let i = 1; i <= 10; i++){
    l.push(`item number ${i}`);
}

let s = {"leads": l}

window.localStorage.setItem('leads', JSON.stringify(s));

let ss = JSON.parse(window.localStorage.getItem('leads'))

