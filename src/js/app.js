// Импортирую api
// import api from './services/apiService';

// Get запрос для получения массива стран
// api.countries().then(res => console.log(res));
// Get запрос для получения массива городов
// api.cities().then(res => console.log(res));

//*Загружаем стили
import '../css/style.css';
import './plugins';

//*Загружаем хранилища
import locations from "./store/locations";
import favoriteTickets from './store/favorites';

//*Импорт Ui
import formUI from './views/form';
import currencyUI from './views/currency';
import ticketsUI from './views/ticketsUI';
import favoritesUI from './views/favoritesUI';


//Единая точка для инициализации приложения и всех обработчиков

document.addEventListener('DOMContentLoaded', () => {
  initApp();
  const form = formUI.form;
  let fvrt = null;
  
  //Events
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    onFormSubmit();
  })
  //Handlers
  async function initApp(){
    await locations.init(); //ждем пока иницализируются локейшены
    formUI.setAutocompleteData(locations.shortCitiesList); //заполняем автокоплит данными

  }

  async function onFormSubmit() {
    //Обработчик на получение ивентов
    //Получаем данные из инпутов, собираем в объект и отправляем на сервер
    //*Данные из инпутов
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;

    //Отправляем в виде Code, Code, 2019-09, 2019-10
    //console.log(origin, destination, depart_date, return_date);

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    ticketsUI.renderTickets(locations.lastSearch);

    //*Функционал Add To Favorites
    //Добавляем в избранное из секции с билетами
    fvrt = ticketsUI.addToFavorites(locations.lastSearch);
    
    
  }
  //Отрисовка избранного
  const favorites = document.querySelector(".favorites");
  const favoriteBtn = document.querySelector('.favorite-dropdown');

  //console.log(favoriteBtn);

  //Init dropdown
  //M.Dropdown.init(favoriteBtn);
  const favoriteDropdown = M.Dropdown.init(favoriteBtn, {closeOnClick: false});
  
  //Удаление из избранного
  favorites.addEventListener('click', (e) =>{
    e.preventDefault;
    if (!e.target.classList.contains("delete-favorite")) return;
    const favoriteItem = e.target.parentElement.parentElement;
    const newFavoriteTickets = favoritesUI.removeFavoriteTicket(favoriteItem, fvrt.tickets);
    favoriteTickets.updateFavorites(newFavoriteTickets);
    //Если список favoriteTickets пуст, то закрываем дропдаун
    if (favoriteTickets.getFavoriteTickets().length === 0) favoriteDropdown.close();
  })


});
