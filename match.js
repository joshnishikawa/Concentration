var deck = [];
var backContent = [];
var backClass = [];

// THE ORDER OF MOST OF THESE ARRAYS IS IMPORTANT
var color = ['red','orange','yellow','green','blue','purple','black','pink',
             'gray','brown','gold','silver','violet',
             'lightBlue','lightGreen','lightBrown',
             'darkBlue','darkGreen','darkBrown','white'];

var letter = ['b','d','f','g','k','m','p','r','s','t',
              'c','h','j','l','n','q','v','w','y','z',
              'x','a','e','i','o','u']; // this row isn't actually used :(
              
var animal = ['bear', 'dog', 'fish', 'goat', 'kangaroo', 
              'monkey', 'pig', 'rabbit', 'snake', 'tiger', 
              'bat','duck','frog', 'gorilla', 'koala', 
              'mouse', 'penguin', 'rat', 'seal', 'turtle'];

var vocab = ['car','cat','hat','horse','jelly','juice',
             'lemon','lion','net','nail','question','quilt',
             'van','violin','watch','worm','yarn','yo-yo',
             'zebra','zipper'];

var shape = ['&#9724;','&#9733;','&#11047;','&#10084;','&#9646;','&#9650;','&#9679;','&#10142;'];
            //square    star      diamond    heart      rect      tri       circle    arrow

var weekday = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat',
               '<div class="spinit">&#127183;</div>'];
               // includes a joker because 16 cards is easier to layout than 14


function setDeck(d){
  deck = [];

  switch(d){
    case '1~4':
      deck = [1,2,3,4,1,2,3,4];
      break;

    case '5~10':
      deck = [5,6,7,8,9,10,5,6,7,8,9,10];
      break;

    case 'animals 1':
      for (let i = 0; i < 10; i++){
        deck.push(`<img class="img-flash mx-auto d-block" src="image/${animal[i]}.png">`);
        deck.push(`<img class="img-flash mx-auto d-block" src="image/${animal[i]}.png">`);
      }
      break;

    case 'animals 2':
      for (let i = 10; i < 20; i++){
        deck.push(`<img class="img-flash mx-auto d-block" src="image/${animal[i]}.png">`);
        deck.push(`<img class="img-flash mx-auto d-block" src="image/${animal[i]}.png">`);
      }
      break;

    case 'letters 1':
      for (let i = 0; i < 10; i++){
        deck.push(letter[i]);
        deck.push(letter[i]);
      }
      break;

    case 'letters 2':
      for (let i = 10; i < 20; i++){
        deck.push(letter[i]);
        deck.push(letter[i]);
      }
      break;

    case 'shapes':
      deck = shape.concat(shape);
      break;

    case 'weekdays':
      deck = weekday.concat(weekday);
  }

  // letters need to be shuffled in parallel with the objects they represent
  if (d != "letters 1" && d != "letters 2") deck = FisherYates(deck);

  var str = '';
  setBacks(d);
  var num_cols = deck.length / 4;

  for (var r = 0; r < 4; r++){
    str += '<div class="row">';
    for (var c = 0; c < num_cols; c++){
      var index = r * num_cols + c;
      str += '<div class="col p-0">'+
                '<div class="card bg-white border shadow m-3">'+
                  '<div class="card-body cardface text-center p-0" onclick="showHide('+ index +')">' +
                    deck[index] +
                  '</div>'+
                  '<div class="cardback rounded border border-primary text-center m-0 '+ backClass[index] +'" id="'+ index +'" onclick="showHide('+ index +')">';
                    if(backContent.length > 0){ str += backContent[index] }
      str +=     '</div>'+
                '</div>'+
              '</div>';
    }
    str += '</div>';
  }
  var target = document.getElementById("match-content");
  target.innerHTML = str;
}


function showHide(i) { // flip the cards
  document.getElementById(i).classList.toggle("hide");
}


function FisherYates(d) { // shuffle an array
  var i, j, k;
  for (i = d.length -1; i > 0; i--) {
    j = Math.floor(Math.random() * i)
    k = d[i]
    d[i] = d[j]
    d[j] = k
  }
  return d;
}


// apply the exact same shuffle to two arrays of the same length (in place)
function parallelShuffle(a, b){
  var i, j, k, l;
  for ( i = a.length -1; i > 0; i--) {
    j = Math.floor(Math.random() * i)

    k = a[i]
    a[i] = a[j]
    a[j] = k

    l = b[i]
    b[i] = b[j]
    b[j] = l
  }
}

function setBacks(d){ // SET BACKS FOR SELECTED DECK
  backContent = [];
  backClass = [];

  switch(d){
    case '1~4':
      backClass = FisherYates( color.slice(0, 8) );
      break;

    case '5~10':
      backClass = FisherYates( color.slice(0, 12) );
      break;

    case 'animals 1':
    case 'animals 2':
      // This shuffle is a bit confusing but ensures that the same number/color
      // combination is not repeated. Two arrays of the same 10 numbers are 
      // shuffled and concatenated so that each number only appears once in the 
      // first half of the array and once in the last half. For example...
      // backContent = [7,2,9,4,10,1,3,5,6,8,6,2,9,1,7,4,8,10,5,3]
      var nums1 = FisherYates( [1,2,3,4,5,6,7,8,9,10] );
      var nums2 = FisherYates( [1,2,3,4,5,6,7,8,9,10] );
      backContent = nums1.concat(nums2);

      // Then two of each color are added to a second array. For example...
      // backClass  = [red,red,orange,orange,yellow,yellow,green,green,blue...
      var colors = color.slice(0, 10);
      for (var i = 0; i < colors.length; i++){
        colors[i] += 'Text alert-primary'; // use .redText class instead of .red
        backClass.push(colors[i]);
        backClass.push(colors[i]);
      }

      // Finally both arrays are shuffled in parallel before 'dealing' the cards
      parallelShuffle(backClass, backContent);
      break;

    case 'letters 1':
      for (var i = 0; i < 10; i++){
        backContent.push('<img class="img-flash mx-auto d-block" \
                               src="image/' + animal[i] + '.png">');
        backContent.push('<img class="img-flash mx-auto d-block" \
                               src="image/' + animal[i + 10] + '.png">');
        backClass.push('alert-primary');
        backClass.push('alert-primary');
      }
      parallelShuffle(deck, backContent);
      break;

    case 'letters 2':
      for (var i = 0; i < vocab.length; i++){
        backContent.push('<img class="img-flash mx-auto d-block" \
                               src="image/' + vocab[i] + '.png">');
        backClass.push('alert-primary');
      }
      parallelShuffle(deck, backContent);
      break;

    case 'shapes':
      backClass = FisherYates( color.slice(0, 16) );
      break;

    case 'weekdays':
      // Uses the same shuffle as 'animals 1' and 'animals 2' (see above)
      var shapes1 = FisherYates(shape);
      var shapes2 = FisherYates(shape);
      backContent = shapes1.concat(shapes2);
    
      var colors = color.slice(0, 8);
      for (var i = 0; i < colors.length; i++){
        colors[i] += 'Text alert-primary'; // use .redText class instead of .red
        backClass.push(colors[i]);
        backClass.push(colors[i]);
      }

      parallelShuffle(backClass, backContent);
      break;
  }
}
