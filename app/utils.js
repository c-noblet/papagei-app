import { Toasty } from '@triniwiz/nativescript-toasty';
import { android as androidApplication } from '@nativescript/core/application';

// Decode the sharing intent into the intent value
export const getSharingIntent = (args) => {
  const intent = args.activity.getIntent();
  const text = intent.getStringExtra(android.content.Intent.EXTRA_TEXT);
  return text;
}

// Show a toast
export const toast = (str) => {
  const toast = new Toasty({
    text: str
  });
  toast.show();
}

// Read file value from a file uri
export const readTextFromUri = ( filePath) => {
  const stringBuilder = new java.lang.StringBuilder();
  const inputStream = androidApplication.context.getContentResolver().openInputStream(android.net.Uri.parse(filePath));
    const reader = new java.io.BufferedReader(new java.io.InputStreamReader(inputStream));
  let line;
  while ((line = reader.readLine()) != null) {
    stringBuilder.append(line);
  }
  return stringBuilder.toString();
}

// API fetcher
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
