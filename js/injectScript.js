const findCoinRow = () => {
  const coinRow = document.getElementById('MUIDataTableBodyRow-7');

  const changeEl = (parentNode, newValue, { balance = false, total = false } = {}) => {
    parentNode.childNodes[0].style.display = 'none';

    if (total) {
      const curNewEl = parentNode.childNodes[2];
      if (curNewEl) {
        curNewEl.className = 'MuiTypography-root jss299 MuiTypography-h5';
        if (curNewEl.innerText !== newValue) {
          curNewEl.innerText = newValue;
        }
      } else {
        const newEl = document.createElement('div');
        newEl.className = 'MuiTypography-root jss299 MuiTypography-h5';
        parentNode.appendChild(newEl);
        newEl.innerText = newValue;
      }
      return;
    }

    const curNewEl = parentNode.childNodes[1];
    if (curNewEl) {
      if (curNewEl.innerText !== newValue) {
        curNewEl.innerText = newValue;
      }
    } else {
      if (balance) {
        const newEl = document.createElement('b');
        parentNode.appendChild(newEl);
        newEl.innerText = newValue;
      } else {
        const newEl = document.createElement('p');
        newEl.className = 'MuiTypography-root MuiTypography-body2';
        parentNode.appendChild(newEl);
        newEl.innerText = newValue;
      }
    }
  };

  try {
    let balanceUSD = 0;
    const usdFormat = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 });

    if (coinRow) {
      const times = 23.5;

      let balanceCoin = coinRow.childNodes[3].childNodes[0].innerText;
      balanceCoin = balanceCoin.replace(',', '');
      balanceCoin = parseFloat(balanceCoin) * times;

      const coinFormat = new Intl.NumberFormat('en-US', { minimumFractionDigits: 6 });

      changeEl(coinRow.childNodes[3], coinFormat.format(balanceCoin), { balance: true });
      changeEl(coinRow.childNodes[5], coinFormat.format(balanceCoin));

      balanceUSD = coinRow.childNodes[7].childNodes[0].innerText;

      balanceUSD = balanceUSD.replace('US$', '').replace(',', '');
      balanceUSD = parseFloat(balanceUSD) * times;

      changeEl(coinRow.childNodes[7], `US$${usdFormat.format(balanceUSD)}`);
    }

    let total = document.getElementsByClassName('jss299')[0];

    if (total) {
      total = total.parentNode;
      const linkStr = ' ≈ US$';
      let totalStrPre = total.childNodes[0].innerText.split(linkStr)[0];
      let totalStrNum = total.childNodes[0].innerText.split(linkStr)[1];
      totalStrNum = totalStrNum.replace(',', '');
      totalStrNum = parseFloat(totalStrNum) + balanceUSD;
      changeEl(total, `${totalStrPre}${linkStr}${usdFormat.format(totalStrNum)}`, { total: true });
    }
  } catch (error) {
    console.log(error);
  }

  setTimeout(() => {
    findCoinRow();
  }, 100);
};

findCoinRow();
