document.addEventListener("DOMContentLoaded", function() {
  fetchNetworksData();
});

function fetchNetworksData() {
  fetch('https://api.geckoterminal.com/api/v2/networks')
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to fetch networks');
          }
          return response.json();
      })
      .then(data => {
          const networkList = document.querySelector('.network-list');
          data.data.forEach(network => {
              const networkItem = document.createElement('div');
              networkItem.textContent = network.attributes.name;
              networkItem.classList.add('network-item');
              networkItem.addEventListener('click', () => {
                  getNetworkInfo(network.id);
                  fetchTopPoolsForToken(network.id, '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'); // Sample token address
                  fetchTokenInfo(network.id, '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'); // Sample token address
              });
              networkList.appendChild(networkItem);
          });
      })
      .catch(error => console.error('Error fetching networks data:', error));
}

function searchPools() {
  const searchInput = document.getElementById('searchInput').value.trim();
  if (searchInput === '') {
      console.error('Please enter a search query');
      return;
  }
  const network = 'eth'; // You can replace 'eth' with the desired network ID
  const url = `https://api.geckoterminal.com/api/v2/search/pools?query=${searchInput}&network=${network}&include=base_token,quote_token&page=1`;

  fetch(url)
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to fetch search results');
          }
          return response.json();
      })
      .then(data => {
          const searchResults = document.getElementById('searchResults');
          searchResults.innerHTML = '<h2>Search Results:</h2>';
          data.data.forEach(pool => {
              searchResults.innerHTML += `
                  <div class="pool">
                      <p>Name: ${pool.attributes.name}</p>
                      <p>Address: ${pool.attributes.address}</p>
                      <p>Base Token Price USD: ${pool.attributes.base_token_price_usd}</p>
                      <p>Quote Token Price USD: ${pool.attributes.quote_token_price_usd}</p>
                  </div>
              `;
          });
      })
      .catch(error => console.error('Error fetching search results:', error));
}

function expandNav() {
  document.querySelector('.network-list').style.display = 'block';
}

function retractNav() {
  document.querySelector('.network-list').style.display = 'none';
}

function toggleSearchForm() {
  const searchForm = document.getElementById('searchForm');
  searchForm.classList.toggle('show');
}

function getNetworkInfo(networkId) {
  const url = `https://api.geckoterminal.com/api/v2/networks/${networkId}`;

  fetch(url)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network not found');
          }
          return response.json();
      })
      .then(data => {
          displayNetworkInfo(data);
      })
      .catch(error => {
          console.error('Error fetching network information:', error.message);
      });
}

function displayNetworkInfo(data) {
  const searchResults = document.getElementById('searchResults');
  searchResults.innerHTML = `
      <h2>Network Information:</h2>
      <p>Name: ${data.attributes.name}</p>
      <p>Address: ${data.attributes.address}</p>
      <p>Chain ID: ${data.attributes.chain_id}</p>
      <p>Explorer URL: ${data.attributes.explorer_url}<p/>
      <!-- Add more properties as needed -->
  `;
}

function fetchTopPoolsForToken(networkId, tokenAddress) {
  const url = `https://api.geckoterminal.com/api/v2/networks/${networkId}/tokens/${tokenAddress}/pools`;
  
  fetch(url)
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to fetch top pools for token');
          }
          return response.json();
      })
      .then(data => {
          displayTopPoolsForToken(data);
      })
      .catch(error => {
          console.error('Error fetching top pools for token:', error);
      });
}

function fetchTokenInfo(networkId, tokenAddress) {
  const url = `https://api.geckoterminal.com/api/v2/networks/${networkId}/tokens/${tokenAddress}`;
  
  fetch(url)
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to fetch token information');
          }
          return response.json();
      })
      .then(data => {
          displayTokenInfo(data);
      })
      .catch(error => {
          console.error('Error fetching token information:', error);
      });
}

function displayTopPoolsForToken(data) {
  const topPoolsList = document.getElementById('topPoolsList');
  topPoolsList.innerHTML = '<h2>Top Pools for Token:</h2>';
  data.data.forEach(pool => {
      topPoolsList.innerHTML += `
          <div class="pool">
              <p>Name: ${pool.attributes.name}</p>
              <p>Address: ${pool.attributes.address}</p>
              <p>Volume (USD): ${pool.attributes.volume_usd.value}</p>
              <!-- Add more properties as needed -->
          </div>
      `;
  });
}


function displayTokenInfo(data) {
  const tokenInfoContainer = document.getElementById('tokenInfoContainer');
  tokenInfoContainer.innerHTML = `
      <h2>Token Information:</h2>
      <p>Name: ${data.attributes.name}</p>
      <p>Symbol: ${data.attributes.symbol}</p>
      <p>Total Supply: ${data.attributes.total_supply}</p>
      <!-- Add more properties as needed -->
  `;
}
