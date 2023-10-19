import currencyUI from "./currency";

class FavoriteUI {
  constructor(currency){
    this.container = document.getElementById('dropdown1');
    this.getСurrencySymbol = currency.getСurrencySymbol.bind(currency);
  };

  renderFavoriteTicket(tickets) {
    //Чистим контейнер
    this.clearContainer();

    // console.log(this.container);
    // console.log(this.getСurrencySymbol);

    //Проверяем есть ли массив выбранных билетов
    if (!tickets.length) {
      this.showEmptyMsg();
      return;
    }

    //Создаем фрагмент и сеттим валюту
    let fragment = '';
    const currency = this.getСurrencySymbol();

    //console.log(tickets);
    //console.log(currency);

    //Рендерим карточку для каждого билета
    tickets.forEach(ticket => {
      const template = FavoriteUI.favoriteTemplate(ticket, currency);
      fragment += template;     
    });
    
    this.container.insertAdjacentHTML('afterbegin', fragment);
  }

  clearContainer(){
    this.container.innerHTML = "";
  }

  static favoriteTemplate(ticket, currency){
    return `<div id = "${ticket.ticket_id}" class="favorite-item  d-flex align-items-start">
              <img
                src="${ticket.airline_logo}"
                class="favorite-item-airline-img"
              />
              <div class="favorite-item-info d-flex flex-column">
              <div
                class="favorite-item-destination d-flex align-items-center">
                <div class="d-flex align-items-center mr-auto">
                  <span class="favorite-item-city">${ticket.origin_name}</span>
                  <i class="medium material-icons">flight_takeoff</i>
                </div>
                <div class="d-flex align-items-center">
                  <i class="medium material-icons">flight_land</i>
                  <span class="favorite-item-city">${ticket.destination_name}</span>
                </div>
              </div>
              <div class="ticket-time-price d-flex align-items-center">
                <span class="ticket-time-departure">${ticket.departure_at}</span>
                <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
              </div>
              <div class="ticket-additional-info">
                <span class="ticket-transfers">${ticket.transfers}</span>
                <span class="ticket-flight-number">${ticket.flight_number}</span>
              </div>
              <a class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto">Delete</a>
              </div>
            </div>`
  }
  
  removeFavoriteTicket(element, tickets){
    const ticketId = element.getAttribute('id');
    
    const arrayTicketId = tickets.findIndex(item => item.ticket_id === ticketId);
    
    //Удаляем элемент из разметки
    const parent = element.parentNode;
    parent.removeChild(element);

    //Удаляем элемент из массива
    tickets.splice(arrayTicketId, 1)

    //Возвращаем массив
    return tickets;

  }

  showEmptyMsg() {
    const template = FavoriteUI.emptyMsgTemplate();
    this.container.insertAdjacentHTML('afterbegin', template);
  }

  static emptyMsgTemplate() {
    return `<div class="tickets-empty-res-msg">
    Избранные билеты отсутствуют.
  </div>`
  }
}


export const favoritesUI = new FavoriteUI(currencyUI);

export default favoritesUI;

/*
Здесь должны быть объекты билетов
*/