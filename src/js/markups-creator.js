import picturesTpl from '../templates/pictures-tpl.hbs';

function createMarkup(arrOfPics) {
  const markup = picturesTpl(arrOfPics);
  return markup;
}
export default createMarkup;
