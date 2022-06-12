let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');
let DATA = [];

menu.onclick = () => {
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}

let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');

window.onscroll = () => {

  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  section.forEach(sec => {

    let top = window.scrollY;
    let height = sec.offsetHeight;
    let offset = sec.offsetTop - 150;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(links => {
        links.classList.remove('active');
        document.querySelector('header .navbar a[href*=' + id + ']').classList.add('active');
      });
    };

  });

}

document.querySelector('#search-icon').onclick = () => {
  document.querySelector('#search-form').classList.toggle('active');
}

document.querySelector('#close').onclick = () => {
  document.querySelector('#search-form').classList.remove('active');
}

var swiper = new Swiper(".home-slider", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop: true,
});

var swiper = new Swiper(".review-slider", {
  spaceBetween: 20,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  loop: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

function loader() {
  document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut() {
  setInterval(loader, 3000);
}

window.onload = fadeOut;


// let totalItems = [];
const db = firebase.firestore();

const addToCard = async (e, thiss) => {
  console.log(e);
  console.log(thiss);

  console.log(e.target.dataset)
  const productName = e.target.dataset.prod;



  // if (DATA.length == 0) {
  //   //  const ref = db.collection('prodsToCard').doc('prodsToCard');
  //   const docRef = db.collection("prodsToCart").doc("prodsToCart");

  //   docRef.get().then((doc) => {
  //     if (doc.exists) {
  //       console.log("Document data:", doc.data());
  //       DATA = doc.data().allProds;
  //     } else {
  //       // doc.data() will be undefined in this case
  //       console.log("No such document!");
  //     }
  //   }).catch((error) => {
  //     console.log("Error getting document:", error);
  //   });

  // }

  let isProdPresent = false;
  let index = -1;
  for (let i = 0; i < DATA.length; i++) {
    if (DATA[i].prod == productName) {
      isProdPresent = true;
      index = i
      break;
    }
  }

  if (isProdPresent) {
    DATA[index].count = +DATA[index].count + 1;
  } else {
    DATA.unshift({
      prod: productName,
      count: 1
    })
  }

  db.collection("prodsToCart").doc("prodsToCart").set({
    allProds: DATA
  }).then(res => {
    console.log('saved');
  }).catch(error => {
    console.log(error);
  })


}


db.collection("prodsToCart").doc("prodsToCart").onSnapshot(snap => {
  const doc = snap.data();
  console.log('doc :: ', doc);
  DATA = doc.allProds;
  document.querySelector('#num').innerHTML = DATA.length;
})