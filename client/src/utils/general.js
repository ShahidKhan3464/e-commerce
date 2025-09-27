export const handlePriceChange = (setter) => (e) => {
  let value = e.target.value;

  if (value !== '' && Number(value) <= 0) {
    value = '';
  }

  setter(value);
};
