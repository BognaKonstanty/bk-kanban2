

//zmienne do komunikacji z serwerem
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';//adres serwera, który wystawia nam endpointy z których będziemy korzystać przy komunikacji
var myHeaders = {//nagłówki , które będą używane w zapytaniach
  'X-Client-Id': 1302,
'X-Auth-Token': '438041a1b3d8465bea1b6dc850314969'
};


//funkcja, która dodaje nagłówki do zapytań bez konieczności umieszczania ich w każdym zapytaniu osobno
$.ajaxSetup({
	headers: myHeaders
});

//funkcja odpytująca serwer po zasób tablicy
$.ajax({
    url: baseUrl + '/board',
    method: 'GET',
    success: function(response) {//odebranie odpowiedzi
      setupColumns(response.columns);//tworzenie kolumn za pomocą funkcji setupColumns(response.columns)
    }
});

//funkcja, która tworzy tyle kolumn ile dostaliśmy w odpowiedzi z serwera, a następnie każdą z nich musi przypiąć do tablicy (tej, którą widzimy na stronie)
function setupColumns(columns) {
    columns.forEach(function (column) {
  		var col = new Column(column.id, column.name);
        board.createColumn(col);
        setupCards(col, column.cards);//funkcja, która ustawi karty w kolumnach
    });
}


//Do funkcji przekazujemy kolumnę do której mają zostać przyczepione karty i karty które należy stworzyć
function setupCards(col, cards) {
	cards.forEach(function (card) {
        var card = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
    	col.createCard(card);//dodanie karty do kolumny za pomocą metody createCard()
  	})
}

//X-Client-Id: 1302
//X-Auth-Token: 438041a1b3d8465bea1b6dc850314969