// //******************************************************************
// // Game Logic
// //******************************************************************
var MemoryGame = function() {
  this.cards = [
  		{ name: "aquaman",         img: "aquaman.jpg" },
  		{ name: "batman",          img: "batman.jpg" },
  		{ name: "captain america", img: "captain-america.jpg" },
  		{ name: "fantastic four",  img: "fantastic-four.jpg" },
  		{ name: "flash",           img: "flash.jpg" },
      { name: "green arrow",     img: "green-arrow.jpg" },
  		{ name: "green lantern",   img: "green-lantern.jpg" },
  		{ name: "ironman",         img: "ironman.jpg" },
  		{ name: "spiderman",       img: "spiderman.jpg" },
  		{ name: "superman",        img: "superman.jpg" },
  		{ name: "the avengers",    img: "the-avengers.jpg" },
  		{ name: "thor",            img: "thor.jpg" },
      { name: "aquaman",         img: "aquaman.jpg" },
  		{ name: "batman",          img: "batman.jpg" },
  		{ name: "captain america", img: "captain-america.jpg" },
      { name: "fantastic four",  img: "fantastic-four.jpg" },
  		{ name: "flash",           img: "flash.jpg" },
  		{ name: "green arrow",     img: "green-arrow.jpg" },
  		{ name: "green lantern",   img: "green-lantern.jpg" },
  		{ name: "ironman",         img: "ironman.jpg" },
  		{ name: "spiderman",       img: "spiderman.jpg" },
  		{ name: "superman",        img: "superman.jpg" },
  		{ name: "the avengers",    img: "the-avengers.jpg" },
  		{ name: "thor",            img: "thor.jpg" },
  	];
    this.selectedCards = [];
    this.pairsClicked = 0;
    this.correctPairs = 0;
};

MemoryGame.prototype.shuffleCards = function () {
  var result = _.shuffle(this.cards);
  this.cards = result;
};
MemoryGame.prototype.selectCard = function (cards) {

};

MemoryGame.prototype.compareCards = function(){
  if (this.selectedCards[0] == this.selectedCards[1]){
    console.log('Pair Guessed!!');
    this.correctPairs +=1;
    this.pairsClicked +=1;
  } else {
    console.log('Try again');
    this.pairsClicked +=1;
  }
};

MemoryGame.prototype.cleanSelectedCards = function(){
  this.selectedCards = [];
};

MemoryGame.prototype.finished = function() {
  if(this.pairsClicked === 25) {
    alert("GAME OVER! RELOAD THE PAGE TO PLAY AGAIN");
  } else if (this.correctPairs === 12) {
    alert("YOU WIN!! RELOAD THE PAGE TO PLAY AGAIN");
	}
};

// //******************************************************************
// // HTML/CSS Interactions
// //******************************************************************

var memoryGame;
function printScore() {
	$("#pairs_clicked").html(memoryGame.pairsClicked);
	$("#pairs_guessed").html(memoryGame.correctPairs);
}

$(document).ready(function(){
  memoryGame = new MemoryGame();
  var html = '';
  memoryGame.shuffleCards();
  memoryGame.cards.forEach(function(pic, index) {
    var sanitizedName = pic.name.split(' ').join('_');

    html += '<div class= "card" id="card_' + sanitizedName + '">';
    html += '<div class="back"';
    html += '    name="img/' + pic.name + '"';
    html += '    id="'       + pic.img +  '">';
    html += '</div>';
    html += '<div class="front" ';
    html += 'style="background: url(img/' + pic.img + '") no-repeat"';
    html += '    id="'       + pic.img +  '">';
    html += '</div>';
    html += '</div>';
  });

  // Add all the divs to the HTML
  document.getElementById('memory_board').innerHTML = html;

  $('.card').click(function(){
    var cardName = $(this).attr('id');
    memoryGame.selectedCards.push(cardName);
    if (memoryGame.selectedCards.length == 2){
      console.log(memoryGame.selectedCards[0] + " - " + memoryGame.selectedCards[1]); // Este mamon se queda
      memoryGame.compareCards();
      memoryGame.cleanSelectedCards();
    }
    console.log(memoryGame.selectedCards);
    printScore();
    memoryGame.finished();
  });

  function turnCard(card) {
      $(card).children('div.back').css('display', 'none');
      $(card).children('div.front').addClass('back');
    }

    function turnCardRemove(card) {
      $(card).children('div.back').css('display', 'block');
      $(card).children('div.front').removeClass('back');
    }

    function removeFoundCard(card) {
      $(card).children('div.back').css('display', 'none');
      $(card).children('div.front').css('display', 'none');
    }


});
