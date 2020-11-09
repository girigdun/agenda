export function testCPF(strCPF: string): boolean {
  let Soma;
  let Resto;
  Soma = 0;
  if (strCPF === null) {
    return false;
  }

  if (strCPF == '00000000000') {
    return false;
  }

  for (let i = 1; i <= 9; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(strCPF.substring(9, 10))) {
    return false;
  }

  Soma = 0;
  for (let i = 1; i <= 10; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(strCPF.substring(10, 11))) {
    return false;
  }
  return true;
}

export function testEmail(strEmail: string): boolean {
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(strEmail)) {
    return true;
  }
  return false;
}

export function testPhone(strPhone: string): boolean {
  const phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{4})$/;
  if (strPhone.match(phoneno)) {
    return true;
  }
  {
    return false;
  }
}
