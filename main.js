import './style.css'

document.querySelector('#app').innerHTML = `
  <div>
    <i>Click on the id to copy</i>
    <h1>Press Genarate</h1>
    <button type="button">Genarate</button>
  </div>
`

var h1 = document.querySelector("h1")
var button = document.querySelector("button")

function generateRandomString() {
  let str = '';
  for (let i = 2; i < 10; i++) {
    let num = Math.floor(Math.random() * 3);
    let charCode;
    if (num === 0) {
      charCode = Math.floor(Math.random() * (90 - 65 + 1)) + 65;
    } else if (num === 1) {
      charCode = Math.floor(Math.random() * (122 - 97 + 1)) + 97;
    } else {
      charCode = Math.floor(Math.random() * (57 - 48 + 1)) + 48;
    }
    str += String.fromCharCode(charCode);
  }
  return str;
}

let rando;

function newRando(){
  let x;
  x = generateRandomString()

  if(localStorage.getItem("randos")){
    /**
     * @type {Array}
     */
    let RandosArray = JSON.parse(localStorage.getItem('randos'));
    if(!RandosArray.includes(x)){
      RandosArray.push(x)
      localStorage.setItem('randos', JSON.stringify(RandosArray));
      rando = x
    } else {
      x = generateRandomString()
      if(!RandosArray.includes(x)){
        RandosArray.push(x)
        localStorage.setItem('randos', JSON.stringify(RandosArray));
        rando = x
      } else {
        x = generateRandomString()
        if(!RandosArray.includes(x)){
          RandosArray.push(x)
          localStorage.setItem('randos', JSON.stringify(RandosArray));
          rando = x
        } else {
          x = generateRandomString()
          if(!RandosArray.includes(x)){
            RandosArray.push(x)
            localStorage.setItem('randos', JSON.stringify(RandosArray));
            rando = x
          } else {
            alert("DUDE YOUR LUCK IS BAD!\n reload and try again, sorry!")
          }
        }
      }
    }
  } else {
    var array = []
    array.push(x)
    localStorage.setItem('randos', JSON.stringify(array));
    rando = x
  }
}

button.addEventListener('click', () => {
  newRando()
  h1.textContent = "Loading"
  setTimeout(
    () => h1.textContent = rando,
  500)
});

h1.addEventListener('click', () => {
  var copyText = document.querySelector("h1");

  copyText.select();
  copyText.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(copyText.value);

  alert("Copied: " + copyText.value);
})