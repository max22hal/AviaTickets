class Favorite {
  constructor(){
    this.tickets = [];
  }

  setFavoriteTicket(ticket){
    this.tickets.push(ticket);
  }

  getFavoriteTickets(){
    return this.tickets;
  }

  updateFavorites(tickets){
    this.tickets = tickets;
  }
}

const favoriteTickets = new Favorite();
export default favoriteTickets;