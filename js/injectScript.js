const findCoinRow = () => {
  const coinRow = document.getElementById('MUIDataTableBodyRow-6');

  const changeEl = (parentNode, newValue) => {
    parentNode.childNodes[0].style.display = 'none';

    const curNewEl = parentNode.childNodes[1];
    if (curNewEl) {
      if (curNewEl.innerText !== newValue) {
        curNewEl.innerText = newValue;
      }
    } else {
      const newEl = document.createElement('p');
      newEl.className = 'MuiTypography-root MuiTypography-body2';
      parentNode.appendChild(newEl);
      newEl.innerText = newValue;
    }
  };

  if (coinRow) {
    const times = 189;

    let balanceCoin = coinRow.childNodes[3].childNodes[0].innerText;
    balanceCoin = balanceCoin.replace(',', '');
    balanceCoin = parseFloat(balanceCoin) * times;

    const coinFormat = new Intl.NumberFormat('en-US', { minimumFractionDigits: 6 });

    changeEl(coinRow.childNodes[3], coinFormat.format(balanceCoin));
    changeEl(coinRow.childNodes[5], coinFormat.format(balanceCoin));

    let balanceUSD = coinRow.childNodes[7].childNodes[0].innerText;

    balanceUSD = balanceUSD.replace('US$', '');
    balanceUSD = parseFloat(balanceUSD) * times;

    const usdFormat = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 });

    changeEl(coinRow.childNodes[7], `US$${usdFormat.format(balanceUSD)}`);
  }

  setTimeout(() => {
    findCoinRow();
  }, 100);
};

findCoinRow();
