document.addEventListener('DOMContentLoaded', () => {
  fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
      renderDestinations(data.countries, 'countries-container', true);
      renderDestinations(data.temples, 'temples-container');
      renderDestinations(data.beaches, 'beaches-container');
    })
    .catch(error => console.error('Error loading data:', error));
});
function renderDestinations(dataList, containerId, isCountry = false) {
  const container = document.getElementById(containerId);
  if (isCountry) {
    dataList.forEach(country => {
      country.cities.forEach(city => {
        container.appendChild(createCard(city));
      });
    });
  } else {
    dataList.forEach(item => {
      container.appendChild(createCard(item));
    });
  }
}
function createCard({ name, imageUrl, description }) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${imageUrl}" alt="${name}">
    <div class="card-body">
      <h3>${name}</h3>
      <p>${description}</p>
    </div>
  `;
  return card;
}
function handleSearch() {
  const keyword = document.getElementById('searchInput').value.toLowerCase();
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    if (text.includes(keyword)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}
function resetSearch() {
  document.getElementById('searchInput').value = '';
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.style.display = '');
}

function submitForm(event) {
  event.preventDefault(); // Prevent actual submission
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Simulasikan pengiriman
  document.getElementById("form-status").innerText = `Thank you, ${name}! We have received your message.`;
  
  // Reset form
  event.target.reset();
  return false;
}
