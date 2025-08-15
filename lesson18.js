//18a
const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
  console.log(xhr.response);
})

xhr.open('GET', 'https://supersimplebackend.dev/greeting');
xhr.send();

//18b
function loadedText() {
  const response = fetch('https://supersimplebackend.dev/greeting').then((response) => {
    return response.text();
  }).then((someText) => {
    console.log(someText);
  });

  return response;
}

loadedText();

//18c
async function loadText() {
  const response = await fetch('https://supersimplebackend.dev/greeting');
  const someText = await response.text();
  console.log(someText);
}

loadText();

//18d
/*
async function postName() {
 const response = await fetch('https://supersimplebackend.dev/greeting', {
    method: 'POST',
    headers : {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
      name: 'Ibigoni Inye-Tam'
    })  
  });

  const reply = await response.text();

  console.log(reply);
}

postName();
*/

//18e
// async function amazonReq() {
//   try {
//     await fetch('https://amazon.com').then((response) => {
//       return response.json();
//     }).then((someText) => {
//       console.log(someText);
//     });
  
//   } catch (error) {
//     console.log('CORS error. Your request was blocked by the backend');
//   }
// }

// amazonReq();


//18f
async function postName() {
 const response = await fetch('https://supersimplebackend.dev/greeting', {
    method: 'POST',
    headers : {
      'Content-Type' : 'application/json'
    }/*,
    body: JSON.stringify({
      name: 'Ibigoni Inye-Tam'
    })  
      */
  });

  if (response.status >= 400 ){
      throw response;
    }
    
  if (error.status === 400) {
    console.log(await error.json());
  } else {
    console.log('Network error. Please try again later.')
  }



  const reply = await response.text();

  console.log(reply);
}

postName();


