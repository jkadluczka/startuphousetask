import './styles/main.css';

const dateNow = new Date();
const dateThirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
let pageNumber = 1;
let section = 'all';
let searchValue = '';

export const getCorrectDateFormat = date => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const handleAddReadLater = item => {
  const list = localStorage.getItem('readLater');
  const newList = list ? JSON.parse(list) : [];

  if (newList.filter(element => element.id === item.id).length) return null;

  newList.push(item);

  localStorage.setItem('readLater', JSON.stringify(newList));
  handleRenderingReadLater();
};

const handleRemoveReadLater = item => {
  const localStorageList = localStorage.getItem('readLater');
  const list = localStorageList ? JSON.parse(localStorageList) : [];

  const newList = list.filter(element => element.id !== item.id);

  localStorage.setItem('readLater', JSON.stringify(newList));
  handleRenderingReadLater();
};

const getReadLaterWindow = element => {
  let rootLi = document.createElement('li');

  let title = document.createElement('h4');
  title.classList.add('readLaterItem-title');
  title.innerText = element.webTitle;

  let data = document.createElement('section');

  let link = document.createElement('a');
  link.classList.add('button');
  link.classList.add('button-clear');
  link.setAttribute('href', element.webUrl);
  link.innerText = 'Read';

  let button = document.createElement('button');
  button.classList.add('button');
  button.classList.add('button-clear');
  button.innerText = 'Remove';
  button.addEventListener('click', () => handleRemoveReadLater(element));

  data.appendChild(link);
  data.appendChild(button);

  rootLi.appendChild(title);
  rootLi.appendChild(data);

  return rootLi;
};

const handleRenderingReadLater = () => {
  const listToRender = localStorage.getItem('readLater');
  if (!listToRender) return null;

  const parsedList = JSON.parse(listToRender).map(element => {
    return getReadLaterWindow(element);
  });
  document.getElementById('readLaterList').innerHTML = '';

  parsedList.forEach(element => {
    document.getElementById('readLaterList').appendChild(element);
  });
};

const getNewsWindow = result => {
  let rootLi = document.createElement('li');

  let article = document.createElement('article');
  article.classList.add('news');

  let header = document.createElement('header');
  header.innerHTML = `<h3>${result.webTitle}</h3>`;

  let newsDetails = document.createElement('section');
  newsDetails.classList.add('newsDetails');
  newsDetails.innerHTML = `
    <ul>
      <li><strong>Section Name:</strong> ${result.sectionName}</li>
      <li><strong>Publication Date:</strong> ${getCorrectDateFormat(
        new Date(result.webPublicationDate)
      )}</li>
    </ul>`;

  let newsActions = document.createElement('section');
  newsActions.classList.add('newsActions');

  let link = document.createElement('a');
  link.setAttribute('href', result.webUrl);
  link.classList.add('button');
  link.innerText = 'Full Article';

  let button = document.createElement('button');
  button.classList.add('button');
  button.classList.add('button-outline');
  button.addEventListener('click', () => handleAddReadLater(result));
  button.innerText = 'Read Later';

  newsActions.appendChild(link);
  newsActions.appendChild(button);

  article.appendChild(header);
  article.appendChild(newsDetails);
  article.appendChild(newsActions);

  rootLi.appendChild(article);

  return rootLi;
};

const handleFetchingNews = () => {
  fetch(
    `https://content.guardianapis.com/search?${searchValue &&
      `q=${searchValue}&`}${
      section !== 'all' ? `section=${section}&` : ''
    }page=${pageNumber}&from-date=${getCorrectDateFormat(
      dateThirtyDaysAgo
    )}&to-date=${getCorrectDateFormat(
      dateNow
    )}&api-key=e32692ae-1062-474c-9148-9a96523c8a72`
  )
    .then(response => response.json())
    .then(({ response }) => {
      let children = response.results.map(result => {
        return getNewsWindow(result);
      });

      document.getElementById('newsList').innerHTML = '';
      children.forEach(element => {
        document.getElementById('newsList').appendChild(element);
      });
    });
};

document.getElementById('activePageSelect').onchange = e => {
  pageNumber = e.target.value;
  handleFetchingNews();
};

document.getElementById('sectionSelect').onchange = e => {
  section = e.target.value;
  handleFetchingNews();
};

document.getElementById('newsContentSearch').oninput = e => {
  searchValue = e.target.value;
  handleFetchingNews();
};

handleFetchingNews();
handleRenderingReadLater();
