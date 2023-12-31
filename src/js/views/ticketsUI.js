import currencyUI from "./currency";
import favoriteTickets from "../store/favorites"
import favoritesUI from "./favoritesUI";

class TicketsUI {
  constructor(currency) {
    this.container = document.querySelector('.tickets-sections .row');
    this.getСurrencySymbol = currency.getСurrencySymbol.bind(currency);
  }

  renderTickets(tickets) {
    this.clearContainer();
    
    if (!tickets.length) {
      this.showEmptyMsg();
      return;
    }

    let fragment = '';
    const currency = this.getСurrencySymbol();

    tickets.forEach(ticket => {

      const template = TicketsUI.ticketTemplate(ticket, currency);
      fragment += template;
    });

    this.container.insertAdjacentHTML('afterbegin', fragment);
  }

  clearContainer() {
    this.container.innerHTML = "";
  }

  showEmptyMsg() {
    const template = TicketsUI.emptyMsgTemplate();
    this.container.insertAdjacentHTML('afterbegin', template);
  }

  static emptyMsgTemplate() {
    return `<div class="tickets-empty-res-msg">
    По вашему запросу билетов не найдено.
  </div>`
  }

  static ticketTemplate(ticket, currency) {
    return `<div class="col s12 m6">
      <div class="card ticket-card">
        <div class="ticket-airline d-flex align-items-center">
          <img
            src="${ticket.airline_logo}"
            class="ticket-airline-img"
          />
          <span class="ticket-airline-name"
            >${ticket.airline_name}</span
          >
        </div>
        <div class="ticket-destination d-flex align-items-center">
          <div class="d-flex align-items-center mr-auto">
            <span class="ticket-city">${ticket.origin_name}</span>
            <i class="medium material-icons">flight_takeoff</i>
          </div>
          <div class="d-flex align-items-center">
            <i class="medium material-icons">flight_land</i>
            <span class="ticket-city">${ticket.destination_name}</span>
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
        <div id = "${ticket.ticket_id}" class="ticket-add-to-favorite">
            <a class="waves-effect 
                     waves-light 
                     btn-small 
                     green darken-1 
                     add-favorite 
                     ml-auto"
              >Add to favorites</a>
            
        </div>
        </div>
        </div>
        
      </div>
    </div>`
  }

  addToFavorites(tickets){
    //Ищем секцию с билетами
    const addToFavoritesBtn = document.querySelector('.tickets-sections');
  
    //Листнер на клик по кнопке "Add to favorites"
    addToFavoritesBtn.addEventListener('click', (e) => TicketsUI.onAddToFavoriteClick(e, tickets));

    return favoriteTickets;
  }

  static onAddToFavoriteClick(event, tickets){
    if (!event.target.classList.contains('add-favorite')) return;
    event.preventDefault;
      
    const ticketId = event.target.parentElement.getAttribute('id');
            
    TicketsUI.mapTicketToFavorite(ticketId, tickets);

        
    favoritesUI.renderFavoriteTicket(favoriteTickets.tickets);
  }

  static mapTicketToFavorite(ticketId,tickets){
    tickets.forEach(ticket => {
      if (ticketId === ticket.ticket_id) {
        //console.log(ticket);
        favoriteTickets.setFavoriteTicket(ticket);
      }
    })
  }
}

const ticketsUI = new TicketsUI(currencyUI);

export default ticketsUI;