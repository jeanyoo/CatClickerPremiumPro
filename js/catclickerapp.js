var model = {
  currentCat: null,
  cats: [
    {
      clickCount: 0,
      name: 'Puss',
      imgSrc: 'img/puss-in-boots.gif',
    },
    {
      clickCount: 0,
      name: 'Cutie',
      imgSrc: 'img/cat2.jpeg',
    }
  ],
  adminVisible: null,
};

var octopus = {
  init: function(){
    // set first can to currentCat and initialize views
      model.currentCat = model.cats[0];
      model.adminVisible = false;
      catListView.init();
      catView.init();
      adminView.init();
  },

  getCurrentCat: function(){
    return model.currentCat;
  },

  getCats: function(){
    return model.cats;
  },

  setCurrentCat: function(cat){
    model.currentCat = cat;
  },

  incrementCounter: function(){
    model.currentCat.clickCount ++;
    catView.render();
  },

  toggleAdmin: function(){
    if (model.adminVisible === true) {
      model.adminVisible = false;
    } else {
      model.adminVisible = true;
    }
  }
};


var catView = {
  init: function(){
    //store pointers to our DOM elements for easy access later
    this.catElem = document.getElementById('cat');
    this.catNameElem = document.getElementById('cat-name');
    this.catImageElem = document.getElementById('cat-img');
    this.countElem = document.getElementById('cat-count');

    //on click, increment the current cat's counter
    this.catImageElem.addEventListener('click', function(){
      octopus.incrementCounter();
    });
    //render this view (update the DOM elements)
    this.render();
  },

  render: function(){
    //update the DOM elements with values from the current cat
    var currentCat = octopus.getCurrentCat();
    this.countElem.textContent = currentCat.clickCount;
    this.catNameElem.textContent = currentCat.name;
    this.catImageElem.src = currentCat.imgSrc;
    },
  };

var catListView = {
  init: function(){
    //store the DOM element for easy access later
    this.catListElem = document.getElementById('cat-list');
    //render this view (update the DOM elements)
    this.render();
  },

  render: function(){
    var cats = octopus.getCats();

    this.catListElem.innerHTML = '';

    for (var i=0; i<cats.length; i++){
      //make a cat list and set its name as text
      var cat = cats[i];
      var elem = document.createElement('li');
      elem.textContent = cat.name;

      //make it clickable
      elem.addEventListener('click', (function(cat){
        return function(){
          octopus.setCurrentCat(cat);
          catView.render();
        };
      })(cat));

      this.catListElem.appendChild(elem);
    };
  }
};

var adminView = {
  init: function(){
    //store the DOM element for easy access later
    this.adminButtonElem = document.getElementById('admin-button');
    this.adminSaveElem = document.getElementById('save-button');
    this.adminCancelElem = document.getElementById('cancel-button');
    this.adminDataElem = document.getElementById('admindata');

    this.adminUrlElem = document.getElementById('admin-url');
    this.adminClicksElem = document.getElementById('admin-count');

    //hide admin field data as default view
    this.adminDataElem.style.display = 'none';

    //event listener for admin button
    this.adminButtonElem.addEventListener('click', function(){
      octopus.toggleAdmin();
      adminView.render();
    });

    this.adminCancelElem.addEventListener('click', function(){
      adminView.hideAdmin();
    });

    this.adminSaveElem.addEventListener('click', function(){
      event.preventDefault();  //don't submit form data
      var nameElem = document.getElementById('admin-name').value;
      var pathElem = document.getElementById('admin-url').value;
      var clickElem = document.getElementById('admin-count').value;
      var currentCat = octopus.getCurrentCat();
      currentCat.name = nameElem;
      currentCat.imgSrc = pathElem;
      currentCat.clickCount = clickElem;
      catView.render();
      catListView.render();
      adminView.hideAdmin();
    });
  },

  render: function(){
    if (model.adminVisible === true) {
      adminView.showAdmin();
    } else {
      adminView.hideAdmin();
    }
  },

  showAdmin: function(){
    this.adminDataElem.style.display = 'block';
  },

  hideAdmin: function(){
    this.adminDataElem.style.display = 'none';
  },

};

octopus.init();
