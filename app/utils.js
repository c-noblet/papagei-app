import {
  Toasty
}
from '@triniwiz/nativescript-toasty';

export const getSharingIntent = (args) => {
  const intent = args.activity.getIntent();
  const text = intent.getStringExtra(android.content.Intent.EXTRA_TEXT);
  return text
}

export const toast = (str) => {
  const toast = new Toasty({
    text: str
  });
  toast.show();
}

export const fetchApi = (path) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (global.api) {
        const result = await fetch(`${global.api}${path}`);
        const data = await result.json();
        resolve(data);
      } else {
        alert('Veuillez définir l\'URL de l\'API');
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}
